const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    image: {
        type: String, // cloudinary url
        required: true
    },
    orderHistory: [
        {
            date: {
                type: Date,
                default: Date.now
            },
            items: [
                {
                    name: String,
                    price: Number,
                    quantity: Number,
                    id: {
                        type: Schema.Types.ObjectId,
                        ref: "Food"
                    }
                }
            ],
            totalPrice: Number
        }
    ],
    password: {
        type: String,
        required: true
    },
    cart: [
        {
            food: Object,
            quantity: Number,
            totalPrice: Number
        }
    ],
    refreshToken: {
        type: String
    }
}, {
    timestamps: true
});

userSchema.pre('save', function (next) {
    // If password hasn't changed or the document is new, skip hashing
    if (!this.isModified("password") && !this.isNew) return next();

    // Hash password if it has changed
    const user = this;
    bcrypt.hash(user.password, 10, (err, hash) => {
        if (err) {
            return next(err);  // If there is an error during hashing, pass the error to next()
        }
        user.password = hash;  // Set the hashed password on the user document
        next();  // Proceed to the next middleware or save operation
    });
});


userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
}


userSchema.methods.generateAuthToken= function(){
    const token= jwt.sign({_id:this.id},process.env.JWT_SECRET);
    return token;
}

const User = mongoose.model("User", userSchema);
module.exports = User;
