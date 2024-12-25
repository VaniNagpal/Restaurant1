 import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        // Fetch order history from the backend
        const response = await axios.get('/getorderhistory', {
          withCredentials: true // Ensure cookies are sent with the request
        });
        setOrders(response.data.user.orderHistory);
      } catch (err) {
        console.error('Error fetching order history:', err);
        setError('Failed to load order history');
      } finally {
        setLoading(false);
      }
    };

    fetchOrderHistory();
  }, []);

  if (loading) return <div className="text-center py-6">Loading...</div>;

  if (error) return <div className="text-center py-6 text-red-600">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">Your Order History</h1>
      {orders.length === 0 ? (
        <p className="text-center">No orders found.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order._id} className="bg-white shadow-lg rounded-lg p-4 mb-4">
              <h2 className="text-xl font-semibold mb-2">
                Order Date: {new Date(order.date).toLocaleDateString()}
              </h2>
              <ul className="divide-y divide-gray-200">
                {order.items.map((item) => (
                  <li key={item._id} className="py-2 flex justify-between items-center">
                    <span>{item.name}</span>
                    <span>{item.quantity} x ${item.price.toFixed(2)}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 text-lg font-semibold">
                Total Price: ${order.items.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
