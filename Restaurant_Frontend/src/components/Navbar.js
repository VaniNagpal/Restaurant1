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
      await axios.post('/logout', {}, { withCredentials: true });
      
      // Clear cookies
      document.cookie = "AccessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = "RefreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

      // Reset the user state in Redux
      dispatch({ type: 'LOG_OUT' });

      // Navigate to the login page
      navigate('/login');
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">
          BiteBurst
        </div>
        <div className="flex space-x-8">
          {!UserData.isLoggedIn ? (
            <>
              <NavLink to="/login" className="text-white text-xl font-bold">Login</NavLink>
              <NavLink to="/signup" className="text-white text-xl font-bold">Signup</NavLink>
            </>
          ) : (
            <>
              <NavLink to="/app" className="text-white text-xl font-bold">Home</NavLink>
              <NavLink to="/cart" className="text-white text-xl font-bold">Cart
                {/* <span className="ml-2 bg-white text-blue-800 rounded-full px-1.5 py-1 text-sm text-center font-semibold">
                  {UserData.cart ? UserData.cart.length : 0}
                </span> */}
              </NavLink>
              <NavLink to="/history" className="text-white text-xl font-bold">History</NavLink>
              <ProfileImage imageUrl={UserData.image} />
              <NavLink onClick={handleLogout} className="text-white text-xl font-bold">Logout</NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
