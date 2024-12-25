import React, { useEffect, useState } from 'react';
import FoodImageCarousel from '../components/FoodImageCrousel';
import FoodItem from '../components/FoodItem';

const RestaurantPageItem = ({ restaurant }) => {
  const [cusineCategory, setCusineCategory] = useState('');
  const [cusineFood, setCusineFood] = useState([]);

  useEffect(() => {
    // Initialize cuisine category with the first category if available
    if (restaurant.cusines.length > 0) {
      const initialCategory = restaurant.cusines[0].category;
      setCusineCategory(initialCategory);
    }
  }, [restaurant.cusines]);

  useEffect(() => {
    const food = restaurant.cusines.filter(item => item.category === cusineCategory)[0];
    if (food) setCusineFood(food.food);
  }, [cusineCategory, restaurant.cusines]);

  const cusineCategoryHandler = (category) => {
    setCusineCategory(category);
  }

  return (
    <div className="container mx-auto p-4">
      {/* Carousel Component */}
      <FoodImageCarousel
        address={restaurant.address}
        imageUrl={restaurant.coverImage}
        name={restaurant.name}
        contact={restaurant.contact}
      />

      {/* Cuisine Selection Section */}
      <div className="mt-6">
        <h4 className="text-xl font-semibold text-center mb-4">Select Your Delicious Cuisine</h4>
        <div className="flex flex-col md:flex-row justify-center items-center md:items-start gap-6">
          {/* Cuisine Category List */}
          <div className="flex flex-wrap gap-2 justify-center md:flex-col md:w-1/4">
            {restaurant.cusines.map((item, indx) => (
              <div
                key={indx}
                className={`cursor-pointer p-2 rounded-md border border-gray-300 text-center 
                ${item.category === cusineCategory ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'}`}
                onClick={() => cusineCategoryHandler(item.category)}
              >
                {item.category}
              </div>
            ))}
          </div>

          {/* Cuisine Food Items */}
          <div className="md:w-3/4 flex flex-wrap gap-4 justify-center">
            {cusineFood.length > 0 ? (
              cusineFood.map((item, indx) => (
                <div className="w-full sm:w-1/2 lg:w-1/3 p-2" key={indx}>
                  <FoodItem
                    food={item}
                    category={cusineCategory}
                    restaurantName={restaurant.name}
                  />
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500">No Food under this category</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RestaurantPageItem;
