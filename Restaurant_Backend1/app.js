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

module.exports=app;
