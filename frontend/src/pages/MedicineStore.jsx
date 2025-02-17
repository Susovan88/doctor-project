import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from "react-toastify";
import { UseUserContext } from '../context/UserContext';
import {useParams,useNavigate} from 'react-router-dom'

function MedicineStore() {
  const [medicines, setMedicines] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState(1);

  const { setUToken, uToken, backendUrl } = UseUserContext();

  const navigate=useNavigate();

  useEffect(() => {
    const getMedicines = async () => {
      try {
        const { data } = await axios.get(`${backendUrl}/api/user/medicines`);
        if (data.success) {
          setMedicines(data.medicines);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getMedicines();
  }, [backendUrl]);

  const filterByCategory = (cat) => setCategory(cat);

  const handleOrderBtn = async (medicineId, price) => {
    try {
      const totalPrice = price * quantity;
      const { data } = await axios.post(`${backendUrl}/api/user/orders`, 
        { medicineId, quantity, totalPrice },
        { headers: { uToken: uToken } }
      );
      if (data.success) {
        toast.success(data.message);
      } else {
        navigate('/login');
        console.log(data.error);
        toast.error("Server Error.");
      }
    } catch (error) {
      console.log(error.message);
      
      toast.error("Server Error.");
    }
  };

  const filteredMedicines = category ? medicines.filter(m => m.category === category) : medicines;
  const categories = ['Tablet', 'Syrup', 'Injection', 'Ointment', 'Other'];

  return (
    <div>
     <p className='text-gray-600 text-left text-lg text-2xl font-extrabold'>Browse through the available medicines:</p>

      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
        <button className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${showFilter ? "bg-primary text-white" : ""}`} onClick={() => setShowFilter(prev => !prev)}>Filters</button>
        
        <div className={`flex-col gap-4 text-sm text-gray-600 ${showFilter ? "flex" : "hidden sm:flex"}`}>
          {['All Medicines', ...categories].map((cat, index) => (
            <p key={index} onClick={() => filterByCategory(cat === 'All Medicines' ? '' : cat)} className={`w-[94vw] sm:w-auto pl-3 pr-16 py-1.5 border border-gray-300 rounded transition-all cursor-pointer ${category === cat || (cat === 'All Medicines' && !category) ? 'bg-indigo-100' : ''}`}>
              {cat}
            </p>
          ))}
        </div>

        <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 gap-y-6'>
          {filteredMedicines.map((medicine, index) => (
            <div key={index} className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-5px] transition-all duration-500'>
              <img className='bg-blue-50 w-full h-48 object-cover' src={medicine.image} alt={medicine.name} />
              <div className='p-4'>
                <p className='text-gray-900 text-lg font-medium'>{medicine.name}</p>
                <p className='text-gray-600 text-sm'>{medicine.category}</p>
                <p className='text-green-500 text-sm'>Price: ${medicine.price}</p>
              </div>
              <div className='flex items-center py-1 px-3 gap-4 mt-2 mb-2'>
                <select 
                  className='border border-gray-300 rounded px-2 py-1 text-sm' 
                  value={quantity} 
                  onChange={(e) => setQuantity(Number(e.target.value))}>
                  {[1, 2, 3, 4, 5].map(qty => <option key={qty} value={qty}>{qty}</option>)}
                </select>
                <button 
                  onClick={() => handleOrderBtn(medicine._id, medicine.price)} 
                  className='py-1 px-3 bg-[#5f6FFF] text-white rounded text-sm hover:bg-primary-dark transition-all'>
                  Order
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MedicineStore;
