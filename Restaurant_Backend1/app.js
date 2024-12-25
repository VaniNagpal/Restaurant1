const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const dotenv= require('dotenv');
dotenv.config();
const app= express();
const connectToDb= require('./db/db');
connectToDb();
// Import routes
const UserRouter = require('./routes/auth');
const RestaurantRouter = require('./routes/restaurant');
// const UserRoutes = require('./routes/user');

// Middleware
const authMiddleware = require('./middleware/auth.middleware');
const ErrorHandler = require('./utils/ErrorHandler');





// Middleware setup
app.use(cookieParser());
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    methods: ['GET', 'POST'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.static('public'));

// Routes
app.use('/user', UserRouter);
app.use('/restaurant', authMiddleware.authUser, RestaurantRouter);
// app.use('/user-data', UserRoutes);

// Error handling middleware
app.use(ErrorHandler);
app.get('/',(req,res)=>{
    res.send('Hello World')
})


app.post('/create-checkout-session', async (req, res) => {
    try {
        const { line_items } = req.body;

        console.log(line_items);

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items,
            mode: 'payment',
            success_url: `${process.env.CLIENT_DOMAIN}/success?session_id={CHECKOUT_SESSION_ID}`, // Replace with your client success URL
            cancel_url: `${process.env.CLIENT_DOMAIN}/cancel`, // Replace with your client cancel URL
        });

        res.status(200).json({ sessionId: session.id });
    } catch (error) {
        console.error('Error creating checkout session:', error);
        res.status(500).json({ error: 'Failed to create checkout session' });
    }
});

module.exports=app;
