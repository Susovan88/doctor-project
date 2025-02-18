import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { UseAdminContext } from '../../context/AdminContext';
import { toast } from 'react-toastify';

function AllOrders() {
  const [orders, setOrders] = useState([]);
  const { aToken, backendUrl } = UseAdminContext();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get(`${backendUrl}/api/admin/orders`, {
          headers: { aToken }
        });
        if (data.success) {
          setOrders(data.orders);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
    fetchOrders();
  }, [backendUrl, aToken]);

  const handleStatusChange = async (orderId,status) => {
    try {
      const { data } = await axios.put(`${backendUrl}/api/admin/orders/${orderId}`, { status:status }, { headers: { aToken } });
      if (data.success) {
        setOrders(orders.map(order => order._id === orderId ? { ...order, status: status } : order));
        toast.success('Order is Accepted for delivery.');
        toast.success(data.message);
      }
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  return (
    <div className='p-5'>
      <h1 className='text-xl font-semibold mb-4'>All Orders</h1>
      {orders.length > 0 ? (
        <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 gap-y-6'>
          {orders.map((order) => (
            <div key={order._id} className='bg-gray-100 border border-blue-200 rounded-xl overflow-hidden hover:translate-y-[-5px] transition-all duration-500'>
              <div className='p-4'>
                <p className='text-gray-900 text-lg font-medium mb-1'>{order.medicines.map(item => `${item.medicineId.name} - Quantity: ${item.quantity}`).join(', ')}</p>
                <p className='text-green-500 text-sm'>Total Price: ${order.totalPrice}</p>
                <p className='text-gray-700 text-sm'>Address: {order.address}</p>
                <p className='text-gray-700 text-sm'>Payment Method: {order.paymentMethod}</p>
                <p className='text-gray-700 text-sm'>User ph no: {order.phone}</p>
              </div>
              {
                order.status=="Pending" ?
                <div className='flex justify-between items-center p-4'>
                  <button onClick={() => handleStatusChange(order._id,"Accepted")} className='text-sm font-semibold text-white bg-green-500 rounded px-2 py-1'>Accept</button>
                  <button onClick={() => handleStatusChange(order._id,"Not Accepted")} className='py-1 px-3 bg-red-500 text-white rounded text-sm hover:bg-red-700 transition-all'>Cancel</button>
                </div>
                : <div className='flex justify-between items-center p-4'>
                  <p className='text-green-500 text-md'>{order.status}</p>
                </div>
              }
            </div>
          ))}
        </div>
      ) : (
        <p className='text-gray-500'>No orders found.</p>
      )}
    </div>
  );
}

export default AllOrders;
