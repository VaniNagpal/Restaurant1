import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode'; // Correct import as jwtDecode

const SuccessRedirect = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const handleSuccess = async () => {
            const token = document.cookie
                .split('; ')
                .find(row => row.startsWith('AccessToken='))
                ?.split('=')[1];

            if (token) {
                const decodedToken = jwtDecode(token); // Use jwtDecode here
                const userId = decodedToken.userId; // Extract user ID from the decoded token
                
                console.log('User ID:', userId); // Output the user ID for debugging

                try {
                    // Send a request to the backend to clear the cart and update the order history
                    await axios.post('/checkout-success', { userId });

                    // Redirect to the order history page after success
                    navigate('/history');
                } catch (error) {
                    console.error('Error handling payment success:', error);
                }
            }
        };

        handleSuccess();
    }, []); // Add navigate to the dependency array

    return (
        <div>
            <h1>Processing your order...</h1>
        </div>
    );
};

export default SuccessRedirect;
