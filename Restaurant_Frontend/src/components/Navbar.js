import React, { useEffect } from "react";
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from '../utils/axios.js';
import ProfileImage from "./ProfileImage.js";

// Function to get a specific cookie value by name
const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
};

console.log(getCookie('token'));

const Navbar = () => {
    const UserData = useSelector(state => state.userReducer);
       
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {


    const checkLoginStatus = async () => {
      const token = getCookie('token');
      if (token) {
        try {
        
         
          // Update Redux state if token is valid
          dispatch({ type: 'LOG_IN'});
        } catch (err) {
          // If token is invalid or verification fails
          dispatch({ type: 'LOG_OUT' });
          navigate('/login');
        }
      } else {
        dispatch({ type: 'LOG_OUT' });
        // navigate('/login');
      }
    };

    checkLoginStatus();
  }, [dispatch,navigate]);

  // Logout function
  const handleLogout = async () => {
    try {
      // Send a request to the backend to log out the user
      await axios.post('http://localhost:4001/user/logout', {}, { withCredentials: true });
      
      // Reset the user state in Redux
      dispatch({ type: 'LOG_OUT' });

      // Navigate to the login page
      navigate('/login');
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <nav className="bg-gray-800 p-4 shadow-md">
    <div className="container mx-auto flex justify-between items-center">
      {/* Brand Logo or Title */}
      <div className="text-white text-2xl font-bold tracking-wide">
        BiteBurst
      </div>
  
      {/* Navigation Links */}
      <div className="flex items-center space-x-6">
        {!UserData.isLoggedIn ? (
          <>
            <NavLink
              to="/login"
              className="text-white text-lg font-medium hover:text-gray-300 transition"
            >
              Login
            </NavLink>
            <NavLink
              to="/signup"
              className="text-white text-lg font-medium hover:text-gray-300 transition"
            >
              Signup
            </NavLink>
          </>
        ) : (
          <>
            <NavLink
              to="/app"
              className="text-white text-lg font-medium hover:text-gray-300 transition"
            >
              Home
            </NavLink>
            <NavLink
              to="/cart"
              className="text-white text-lg font-medium hover:text-gray-300 transition relative"
            >
              Cart
              {/* Cart badge */}
              {UserData.cart && UserData.cart.length > 0 && (
                <span className="absolute top-0 right-0 -mt-1 -mr-2 bg-red-500 text-white rounded-full px-2 py-0.5 text-sm font-semibold">
                  {UserData.cart.length}
                </span>
              )}
            </NavLink>
            {/* Profile Image */}
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <img
                src={UserData.image || "https://via.placeholder.com/40"}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <button
              onClick={handleLogout}
              className="text-white text-lg font-medium hover:text-gray-300 transition"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  </nav>
  
  );
};

export default Navbar;
