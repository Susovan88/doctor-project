import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { UseUserContext } from '../context/UserContext';
import { toast } from "react-toastify";

function MyOrderList() {
  const [orders, setOrders] = useState([]);
  const { uToken, backendUrl } = UseUserContext();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get(`${backendUrl}/api/user/orders`, {
          headers: { uToken }
        });
        if (data.success) {
          setOrders(data.orders);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, [backendUrl, uToken]);

  const handleCancelOrder = async (orderId) => {
    try {
      const { data } = await axios.delete(`${backendUrl}/api/user/orders/${orderId}`, {
        headers: { uToken }
      });
      if (data.success) {
        setOrders(orders.filter(order => order._id !== orderId));
        toast.success(data.message);
      }
    } catch (error) {
      console.log('Error cancelling order:', error);
      toast.error(data.message);
    }
  };

  return (
    <div className='p-5'>
      <h1 className='text-xl font-semibold mb-4'>Your Orders</h1>
      {orders.length > 0 ? (
        <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 gap-y-6'>
          {orders.map((order) => (
            <div key={order._id} className='bg-gray-200 border border-blue-200 rounded-xl overflow-hidden hover:translate-y-[-5px] transition-all duration-500'>
              <div className='p-4'>
                <p className='text-gray-900 text-lg font-medium mb-1'>{order.medicines.map(item => `${item.medicineId.name} - Quantity: ${item.quantity}`).join(', ')}</p>
                <p className='text-green-500 text-sm'>Total Price: ${order.totalPrice}</p>
                <p className='text-gray-700 text-sm'>Address: {order.address}</p>
                <p className='text-gray-800 text-sm'>Payment Method: {order.paymentMethod}</p>
                <p className='text-gray-800 text-sm'>Delebari Boy: +91 8910760697 </p>
              </div>
              <div className='flex justify-between items-center p-4'>
                <p className='text-sm font-semibold text-white bg-green-500 rounded px-2 py-1'>{order.status}</p>
                <button 
                  onClick={() => handleCancelOrder(order._id)} 
                  className='py-1 px-3 bg-red-500 text-white rounded text-sm hover:bg-red-700 transition-all'>
                  Cancel Order
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className='text-gray-500'>No orders found.</p>
      )}
    </div>
  );
}

export default MyOrderList;
