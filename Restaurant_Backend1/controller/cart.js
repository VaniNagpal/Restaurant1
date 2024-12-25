const User = require('../models/user');
const Restaurant = require("../models/restaurant");
const ErrorWrapper = require('../utils/ErrorWrapper');
const ErrorHandler = require('../utils/ErrorHandler');

// Fetch cart items for the logged-in user
const getCartItems = ErrorWrapper(async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id);

        if (!user) {
            throw new ErrorHandler(404, "User not found!");
        }
        res.status(200).json({
            message: "Cart items fetched successfully!",
            data: user.cart,
        });
    } catch (error) {
        next(new ErrorHandler(error.statusCode || 500, error.message));
    }
});

// Add food item to the cart
const getAddCart = ErrorWrapper(async (req, res, next) => {
    const { id } = req.params;
    const { restaurant_name, category, quantity = 1 } = req.query;

    try {
        const restaurant = await Restaurant.findOne({ name: restaurant_name });
        if (!restaurant) {
            throw new ErrorHandler(404, `Restaurant with name ${restaurant_name} does not exist!`);
        }

        const { foodItem } = await restaurant.getFoodItem(category, id);
        if (!foodItem) {
            throw new ErrorHandler(404, `Food item with id ${id} not found!`);
        }

        const user = await User.findById(req.user._id);
        if (!user) {
            throw new ErrorHandler(404, "User not found!");
        }

        const existingFoodIndex = user.cart.findIndex(item => item.food._id.toString() === foodItem._id.toString());
        const pricePerItem = foodItem.price;

        if (existingFoodIndex === -1) {
            user.cart.unshift({
                food: foodItem,
                quantity: +quantity,
                totalPrice: +quantity * pricePerItem
            });
        } else {
            user.cart[existingFoodIndex].quantity += +quantity;
            user.cart[existingFoodIndex].totalPrice = user.cart[existingFoodIndex].quantity * pricePerItem;
        }

        await user.save();

        res.status(200).json({
            message: 'Food item added to cart successfully!',
            data: { cart: user.cart },
        });
    } catch (error) {
        next(new ErrorHandler(error.statusCode || 500, error.message));
    }
});

// Increase quantity of a cart item
const getCartItemIncrease = ErrorWrapper(async (req, res, next) => {
    const { id } = req.params;

    try {
        const user = await User.findById(req.user._id);
        if (!user) {
            throw new ErrorHandler(404, "User not found!");
        }

        const existingCartIndex = user.cart.findIndex(item => item._id.toString() === id.toString());
        if (existingCartIndex === -1) {
            throw new ErrorHandler(404, `Food item with id ${id} is not in your cart!`);
        }

        user.cart[existingCartIndex].quantity++;
        user.cart[existingCartIndex].totalPrice = user.cart[existingCartIndex].quantity * user.cart[existingCartIndex].food.price;

        await user.save();

        res.status(200).json({
            message: "Cart item quantity increased successfully!",
            data: user.cart,
        });
    } catch (error) {
        next(new ErrorHandler(error.statusCode || 500, error.message));
    }
});

// Decrease quantity of a cart item
const getCartItemDecrease = ErrorWrapper(async (req, res, next) => {
    const { id } = req.params;

    try {
        const user = await User.findById(req.user._id);
        if (!user) {
            throw new ErrorHandler(404, "User not found!");
        }

        const existingCartIndex = user.cart.findIndex(item => item._id.toString() === id.toString());
        if (existingCartIndex === -1) {
            throw new ErrorHandler(404, `Food item with id ${id} is not in your cart!`);
        }

        user.cart[existingCartIndex].quantity--;
        if (user.cart[existingCartIndex].quantity < 1) {
            user.cart.splice(existingCartIndex, 1);
        } else {
            user.cart[existingCartIndex].totalPrice = user.cart[existingCartIndex].quantity * user.cart[existingCartIndex].food.price;
        }

        await user.save();

        res.status(200).json({
            message: 'Cart item quantity decreased successfully!',
            data: user.cart,
        });
    } catch (error) {
        next(new ErrorHandler(error.statusCode || 500, error.message));
    }
});

// Delete a cart item
const getCartItemDelete = ErrorWrapper(async (req, res, next) => {
    const { id } = req.params;

    try {
        const user = await User.findById(req.user._id);
        if (!user) {
            throw new ErrorHandler(404, "User not found!");
        }

        const existingCartIndex = user.cart.findIndex(item => item._id.toString() === id.toString());
        if (existingCartIndex === -1) {
            throw new ErrorHandler(404, `Cart item with id ${id} not found!`);
        }

        user.cart.splice(existingCartIndex, 1);
        await user.save();

        res.status(200).json({
            message: "Cart item deleted successfully!",
            data: user.cart,
        });
    } catch (error) {
        next(new ErrorHandler(error.statusCode || 500, error.message));
    }
});

module.exports = {
    getCartItems,
    getAddCart,
    getCartItemIncrease,
    getCartItemDecrease,
    getCartItemDelete
};
