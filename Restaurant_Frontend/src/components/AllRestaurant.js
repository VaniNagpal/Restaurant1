
import React from 'react';
import { useSelector } from 'react-redux';
import Restaurant from './Restaurant';

const AllRestaurants = () => {
    const restaurantsData = useSelector(state => state.restaurantReducer);

    if (!Array.isArray(restaurantsData)) {
        return <p>No restaurants available</p>;
    }

    return (
        <div className='flex flex-wrap gap-4 p-4'>
            {restaurantsData.map((restaurant, index) => (
                <Restaurant key={index} restaurant={restaurant} />
            ))}
        </div>
    );
};

export default AllRestaurants;
