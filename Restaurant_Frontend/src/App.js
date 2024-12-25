

import React from 'react'
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import LandingPage from './pages/LandingPage';

import RestaurantPage from './pages/RestaurantPage';
import SignupPage from './pages/SignupPage';
import Home from './pages/Home';

import CartPage from './pages/CartPage';
import SuccessRedirect from './components/SuccessRedirect';
import History from './pages/History.js';
const App = () => {
  return (
    <div>
<Routes>
<Route path="/" element={<LandingPage />} />
        <Route path='/login' element={<Login />} />
       <Route path='/signup' element={<SignupPage />} />
       <Route path='/cart' element={<CartPage />} />
       < Route path='/success' element={<SuccessRedirect />} />
       < Route path='/history' element={<History />} />
      
         <Route path='/app' element={<Home />} />
        <Route path='app/:restaurant_id' element={<RestaurantPage />} /> 
      </Routes>
    </div>
  )
}

export default App
