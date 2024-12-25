import React, { useEffect, useState } from 'react';
import axios from '../utils/axios'; // Ensure this is pointing to your axios instance
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

import { loadStripe } from '@stripe/stripe-js';
import { Elements, useStripe, useElements } from '@stripe/react-stripe-js';

// Initialize Stripe outside of a component’s render to avoid recreating the `stripe` object on every render.
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const CartPage = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const stripe = useStripe(); // Access Stripe instance
    const elements = useElements(); // Access Elements instance 
    const navigate = useNavigate(); // For navigation
    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await axios.get('http://localhost:4001/restaurant/view-cart');
                setCartItems(response?.data?.data || []); // Adjust based on your response structure
                setLoading(false);
            } catch (error) {
                console.error('Error fetching cart items:', error);
                setLoading(false);
            }
        };

        fetchCartItems();
    }, []);

    const handleQuantityIncrease = async (itemId) => {
        try {
            await axios.get(`http://localhost:4001/restaurant/increase-cart/${itemId}`);
            // Refresh cart items
            const response = await axios.get('http://localhost:4001/restaurant/view-cart');
            setCartItems(response.data.data);
        } catch (error) {
            console.error('Error updating cart item quantity:', error);
        }
    };

    const handleQuantityDecrease = async (itemId) => {
        try {
            await axios.get(`http://localhost:4001/restaurant/decrease-cart/${itemId}`);
            // Refresh cart items
            const response = await axios.get('http://localhost:4001/restaurant/view-cart');
            setCartItems(response.data.data);
        } catch (error) {
            console.error('Error updating cart item quantity:', error);
        }
    };

    const handleRemoveItem = async (itemId) => {
        try {
            await axios.get(`http://localhost:4001/restaurant/delete-cart-item/${itemId}`);
            // Refresh cart items
            const response = await axios.get('http://localhost:4001/restaurant/view-cart');
            setCartItems(response.data.data);
        } catch (error) {
            console.error('Error removing cart item:', error);
        }
    };

    const calculateTotalBill = () => {
        return cartItems.reduce((total, item) => total + item.totalPrice, 0).toFixed(2);
    };
 // Replace with your Stripe public key
    
 const handleBuyNow = async () => {
    try {
        // const stripe = await stripePromise;

        // // Make a POST request to your backend to create a checkout session
        // const response = await axios.post('http://localhost:4001/create-checkout-session', {
        //     line_items: cartItems.map(item => ({
        //         price: item.food.stripePriceId, // Adjust this based on your backend structure
        //         quantity: item.quantity,
        //     })),
        // });

        // if (!response.data.sessionId) {
        //     throw new Error('Failed to create a checkout session');
        // }

        // Simulate successful purchase for demonstration
        Swal.fire({
            icon: 'success',
            title: 'Purchase Successful!',
            text: 'Thank you for your order.',
            showConfirmButton: true,
            confirmButtonText: 'Go to Home',
        }).then(() => {
            navigate('/app'); // Redirect to the home page
        });
    } catch (error) {
        console.error('Error during checkout:', error);
        Swal.fire({
            icon: 'error',
            title: 'Purchase Failed',
            text: 'There was an error processing your order. Please try again.',
        });
    }
};

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await axios.get('http://localhost:4001/restaurant/view-cart');
                setCartItems(response?.data?.data || []); // Adjust based on your response structure
                setLoading(false);
            } catch (error) {
                console.error('Error fetching cart items:', error);
                setLoading(false);
            }
        };

        fetchCartItems();
    }, []);

    
    if (loading) return <p>Loading...</p>;

    return (
        <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
        {cartItems.length === 0 ? (
            <p className="text-center text-gray-500">Your cart is empty.</p>
        ) : (
            <div>
                {cartItems.map((item) => (
                    item.food && (
                        <div key={item._id} className="flex items-center justify-between p-4 mb-4 border rounded-md shadow-md">
                            <img src={item.food.images[0]?.url} alt={item.food.name} className="w-20 h-20 object-cover rounded-md" />
                            <div className="flex-1 ml-4">
                                <h2 className="text-xl font-semibold">{item.food.name}</h2>
                                <p className="text-gray-600">{item.food.description}</p>
                                <p className="text-lg font-bold">Price: ${item.totalPrice}</p>
                                <div className="flex items-center mt-2">
                                    <button
                                        onClick={() => handleQuantityDecrease(item._id)}
                                        disabled={item.quantity <= 1}
                                        className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                                    >
                                        -
                                    </button>
                                    <span className="mx-2">{item.quantity}</span>
                                    <button
                                        onClick={() => handleQuantityIncrease(item._id)}
                                        className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                            <button
                                onClick={() => handleRemoveItem(item._id)}
                                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                            >
                                Remove
                            </button>
                        </div>
                    )
                ))}
                <div className="mt-4 flex justify-between items-center font-bold">
                    <span>Total Bill:</span>
                    <span>${calculateTotalBill()}</span>
                </div>
                <button
                    onClick={handleBuyNow}
                    className="mt-4 px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                    Buy Now
                </button>
            </div>
        )}
    </div>
    );
};

// Wrap CartPage with Elements to provide Stripe context
const WrappedCartPage = () => (
    <Elements stripe={stripePromise}>
        <CartPage />
    </Elements>
);

export default WrappedCartPage;
