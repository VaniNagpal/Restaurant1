import React, { useState } from 'react';
import axios from 'axios'; // Import axios for API requests
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        password: '',
        email: '',
        profileImage: null, // Initialize profileImage as null
    });

    const navigate = useNavigate(); // React Router hook to navigate after signup

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle profile image upload
    const handleFileChange = (e) => {
        setFormData({ ...formData, profileImage: e.target.files[0] });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Create a new FormData object to handle file uploads
        const data = new FormData();
        data.append('name', formData.name);
        data.append('username', formData.username);
        data.append('password', formData.password);
        data.append('email', formData.email);
        if (formData.profileImage) {
            data.append('image', formData.profileImage); // Only append if an image is selected
        }

        try {
            // Send a POST request to the signup endpoint
            const response = await axios.post('http://localhost:4001/user/signup', data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            if (response.data.success) {
                alert('Signup successful!');
                navigate('/login'); // Redirect to login page after successful signup
            }
        } catch (error) {
            alert(error.response?.data?.message || 'Error occurred during signup');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-[400px]">
                <h2 className="text-2xl font-bold mb-4 text-center">Signup</h2>

                <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="border border-gray-300 p-2 w-full mb-4 rounded"
                    required
                />

                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="border border-gray-300 p-2 w-full mb-4 rounded"
                    required
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="border border-gray-300 p-2 w-full mb-4 rounded"
                    required
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="border border-gray-300 p-2 w-full mb-4 rounded"
                    required
                />

                <input
                    type="file"
                    name="profileImage"
                    onChange={handleFileChange}
                    className="border border-gray-300 p-2 w-full mb-4 rounded"
                />

                <button
                    type="submit"
                    className="bg-gray-700 text-white px-4 py-2 rounded w-full hover:bg-blue-600"
                >
                    Signup
                </button>
                <div className="text-center mt-4">
              <p>Already have an account? <a href="/login" className="text-blue-500 hover:underline">Login</a></p>
            </div>
            </form>
        </div>
    );
};

export default Signup;
