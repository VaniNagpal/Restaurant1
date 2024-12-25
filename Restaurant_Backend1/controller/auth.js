const User = require("../models/user");
const ErrorHandler = require("../utils/ErrorHandler");
const ErrorWrapper = require("../utils/ErrorWrapper");
const uploadOnCloudinary = require("../utils/uploadOnCloudinary");
const blackListTokenModel = require('../models/blacklistToken.model');
// Post Signup Function
const postSignup = ErrorWrapper(async function (req, res, next) {
    const { username, password, email, name } = req.body;
    const incomingFields = Object.keys(req.body);

    // Identify missing fields
    const requiredFields = ["username", "password", "email", "name"];
    const missingFields = requiredFields.filter((field) => !incomingFields.includes(field));

    if (missingFields.length > 0) {
        throw new ErrorHandler(401, `Provide missing fields ${missingFields.join(',')} to signup`);
    }

    // Check if the user already exists
    let existingUser = await User.findOne({
        $or: [{ username }, { email }]
    });

    if (existingUser) {
        throw new ErrorHandler(401, `User with username ${username} or email ${email} already exists`);
    }

    let cloudinaryResponse = null;
    const defaultImageUrl = "https://res.cloudinary.com/dgtvhph77/image/upload/v1725860689/jedxve2yibjeeaaj0ysv.jpg";

    // Handle file upload to Cloudinary
    try {
        if (req.file && req.file.path) {
            cloudinaryResponse = await uploadOnCloudinary(req.file.path);
        }
    } catch (error) {
        throw new ErrorHandler(500, `Error while uploading image ${error.message}`);
    }

    const userImage = cloudinaryResponse ? cloudinaryResponse.secure_url : defaultImageUrl;

    try {
        // Hash the password before creating the user
        const hashedPassword = await User.hashPassword(password);

        // Create the new user
        const user = await User.create({
            username,
            password: hashedPassword,  // Store the hashed password
            email,
            name,
            image: userImage
        });

        // Get the user data (without the password)
        let newUser = await User.findOne({ _id: user._id }).select("-password");

        // Generate JWT token
        const token = user.generateAuthToken();

        res.status(201).json({
            success: true,
            user: newUser,
            token
        });

    } catch (error) {
        throw new ErrorHandler(500, `Error while creating new user: ${error.message}`);
    }
});

// Post Login Function
const postLogin = ErrorWrapper(async function (req, res, next) {
    const { username, email, password } = req.body;

    if (!username && !email) {
        throw new ErrorHandler(400, "Please enter either username or email");
    }
    if (!password) {
        throw new ErrorHandler(400, "Please enter password");
    }

    // Find the user by username or email
    let user = await User.findOne({
        $or: [{ email }]
    });

    if (!user) {
        throw new ErrorHandler(400, "Invalid username or email");
    }

    // Check if password is correct
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Get the user data (without the password)
    user = await User.findOne({
        $or: [{ username }, { email }]
    }).select("-password");

    // Generate JWT token
    const token = user.generateAuthToken();

    // Set the token in cookies
    res.cookie('token', token, { httpOnly: true });

    res.status(200).json({ token, user });
});

// Logout User Function
const logoutUser = async (req, res, next) => {
    res.clearCookie('token');  // Clear the cookie

    const token = req.cookies.token || req.headers.authorization.split(' ')[1];

    // Blacklist the token
    await blackListTokenModel.create({ token });

    res.status(200).json({ message: 'Logged out successfully' });
};

// Get User Profile Function
// const getUserProfile =async (req, res, next) => {
    
   
//     res.status(200).json(req.user);
// };

module.exports = {
    postSignup,
    postLogin,
    logoutUser,
    // getUserProfile
};
