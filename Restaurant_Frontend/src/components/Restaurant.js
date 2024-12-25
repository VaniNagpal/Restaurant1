import React from 'react';
import { Link } from 'react-router-dom';

const Restaurant = ({ restaurant }) => {
  return (
    <div className="max-w-sm mx-auto bg-white shadow-md rounded-lg overflow-hidden">
      {/* Image Section */}
      <img
        src={restaurant.coverImage}
        alt={restaurant.name}
        className="w-full h-48 object-cover"
      />
      
      {/* Content Section */}
      <div className="p-4 text-center">
        {/* Restaurant Name */}
        <h3 className="text-xl font-semibold mb-2 capitalize">{restaurant.name}</h3>
        <hr className="my-2" />

        {/* Cuisine Section */}
        <div className="text-gray-700">
          <span className="block font-medium">Cuisines Available</span>
          <div className="flex flex-wrap justify-center">
            {restaurant.cusines.map((c, index) => (
              <span key={index} className="capitalize m-1 text-sm">{c.category}</span>
            ))}
          </div>
        </div>
        <hr className="my-2" />

        {/* Details Button */}
        <Link
          to={restaurant._id}
          className="inline-block bg-blue-500 text-white px-4 py-2 rounded-md mt-2 hover:bg-blue-600 transition"
        >
          Details
        </Link>
      </div>
    </div>
  );
};

export default Restaurant;
