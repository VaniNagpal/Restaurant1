
import { useDispatch } from 'react-redux';
import axios from '../utils/axios';
import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginHandler = async () => {
    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value.trim();

    // Validation
    if (!email) return alert('Please enter your email');
    if (!password) return alert('Please enter your password');

    try {
      // API Call to Login Endpoint
      const { data } = await axios.post('http://localhost:4001/user/login', { email, password });

      console.log('Login Response:', data);

      // Update Redux State
      dispatch({ type: 'SET_USER', payload: data.user });
      dispatch({ type: 'LOG_IN', isLoggedIn: true });

      // Navigate to the Home Page
      navigate('/app');
    } catch (error) {
      console.error('Error during login:', error);

      // Handle Errors
      if (error.response) {
        // Server responded with a status code outside 2xx
        alert(error.response.data?.message || 'Invalid login credentials');
      } else if (error.request) {
        // Request was made but no response received
        alert('No response received from the server. Please try again later.');
      } else {
        // Other errors, such as network issues
        alert(`An error occurred: ${error.message}`);
      }
    }
  };



  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <input
          className="border-2 border-gray-300 p-2 rounded w-full mb-4"
          type="text"
          ref={emailRef}
          placeholder="Enter email or username"
        />
        <input
          className="border-2 border-gray-300 p-2 rounded w-full mb-4"
          type="password"
          ref={passwordRef}
          placeholder="Enter password"
        />
        <button
          onClick={loginHandler}
          className="bg-gray-700 text-white px-4 py-2 rounded w-full hover:bg-blue-600"
        >
          Login
        </button>
        <div className="text-center mt-4">
          <p>Don't have an account? <a href="/signup" className="text-blue-500 hover:underline">Sign up</a></p>
        </div>
      </div>
    </div>
  );
};


export default Login
