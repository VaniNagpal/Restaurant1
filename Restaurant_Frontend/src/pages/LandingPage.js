import React from 'react';
import { NavLink } from 'react-router-dom';
import Crousel from '../components/Crousel';

const LandingPage = () => {
  return (
   

     <div>



      {/* <section className="bg-[url('https://images.indianexpress.com/2023/12/food.jpg')] text-white flex flex-col items-center justify-center text-center py-20">
        <h1 className="text-4xl font-bold mb-4">Welcome to <span className="text-yellow-400">BiteBurst!</span></h1>
        <p className="text-xl mb-8">Your favorite meals delivered right to your doorsteps.</p>
        <NavLink to="/signup" className="bg-yellow-500 text-gray-800 px-6 py-3 rounded-lg text-lg font-semibold hover:bg-yellow-600">
          Get Started
        </NavLink>
      </section> */}
      <Crousel/>
      
      <section className="py-16 bg-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">Why Choose <span className="text-yellow-400">BiteBurst?</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-200 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Fast Delivery</h3>
              <p>Get your meals delivered in record time with our speedy delivery service.</p>
            </div>
            <div className="bg-gray-200 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Wide Variety</h3>
              <p>Choose from a vast selection of restaurants and cuisines to satisfy your cravings.</p>
            </div>
            <div className="bg-gray-200 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Affordable Prices</h3>
              <p>Enjoy delicious meals without breaking the bank with our competitive pricing.</p>
            </div>
          </div>
        </div>
      </section>


      <section className="py-16 bg-gray-100">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">What Our Customers Say</h2>
          <div className="flex flex-col md:flex-row md:space-x-8">
            <div className="bg-white p-6 rounded-lg shadow-lg mb-6 md:mb-0">
              <p className="text-lg mb-4">“BiteBurst has been a lifesaver for my busy schedule. The delivery is always on time, and the food is fantastic!”</p>
              <p className="font-semibold">- Sarah T.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <p className="text-lg mb-4">“I love the variety of restaurants available on BiteBurst. It’s my go-to app for ordering food.”</p>
              <p className="font-semibold">- John D.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto text-center">
          <p>&copy; {new Date().getFullYear()} BiteBurst. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
