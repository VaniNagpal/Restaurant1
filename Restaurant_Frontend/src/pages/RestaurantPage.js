import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from '../utils/axios';
import RestaurantPageItem from './RestaurantPageItem';


const RestaurantPage = () => {
    const { restaurant_id } = useParams();
    const [isRestaurantFetched, setIsRestaurantFetched] = useState(false);
    const [restaurant, setRestaurant] = useState([]);

    
    useEffect(() => {
        try {
            const getRestaurant = async () => {
                const { data } = await axios.get(`http://localhost:4001/restaurant/${restaurant_id}`);
                setRestaurant(data.restaurant[0]);
                console.log(data.restaurant[0])
                setIsRestaurantFetched(true);
            }
            getRestaurant();
        } catch (error) {
            alert(error);
        }
    }, [restaurant_id]);

    return (
        <>
            {isRestaurantFetched && <RestaurantPageItem restaurant={restaurant} />}
          
        </>
    )
}

export default RestaurantPage;