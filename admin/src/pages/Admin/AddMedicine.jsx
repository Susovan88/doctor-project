import React, { useState } from 'react';
import { assets } from '../../assets/assets_admin/assets';
import { UseAdminContext } from '../../context/AdminContext';
import { toast } from 'react-toastify';
import axios from 'axios';

function AddMedicine() {
  const [medicineImg, setMedicineImg] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [manufacturer, setManufacturer] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [category, setCategory] = useState('Tablet');
  const [expiry, setExpiry] = useState('');
  const { backendUrl, aToken } = UseAdminContext();

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (!medicineImg) return toast.error('Please upload a medicine image.');

    const formData = new FormData();
    formData.append('image', medicineImg);
    formData.append('name', name);
    formData.append('description', description);
    formData.append('manufacturer', manufacturer);
    formData.append('price', Number(price));
    formData.append('stock', Number(stock));
    formData.append('category', category);
    formData.append('expiry', expiry);

    try {
      const { data } = await axios.post(`${backendUrl}/api/admin/add-medicine`, formData, { headers: { aToken } });
      if (data.success) {
        toast.success(data.message);
        setMedicineImg(null);
        setName('');
        setDescription('');
        setManufacturer('');
        setPrice('');
        setStock('');
        setCategory('Tablet');
        setExpiry('');
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error('Something went wrong. Please try again.');
    }
  };

  return (
    <form onSubmit={handleOnSubmit} className='m-5 w-full'>
      <p className='mb-3 text-lg font-medium'>Add Medicine</p>
      <div className='bg-white px-8 py-8 border w-full max-w-4xl max-h-[80vh] overflow-y-scroll'>
        <div className='flex items-center gap-4 mb-8 text-gray-500'>
          <label htmlFor='medicine-img'>
            <img className='w-16 bg-gray-100 rounded-full cursor-pointer' src={medicineImg ? URL.createObjectURL(medicineImg) : assets.upload_area} alt='' />
          </label>
          <input onChange={(e) => setMedicineImg(e.target.files[0])} type='file' id='medicine-img' hidden />
          <p>Upload Medicine Image</p>
        </div>
        <div className='flex flex-col gap-4 text-gray-600'>
          <input onChange={(e) => setName(e.target.value)} value={name} className='border rounded px-3 py-2' type='text' placeholder='Medicine Name' required />
          <textarea onChange={(e) => setDescription(e.target.value)} value={description} className='border rounded px-3 py-2' placeholder='Description' required></textarea>
          <input onChange={(e) => setManufacturer(e.target.value)} value={manufacturer} className='border rounded px-3 py-2' type='text' placeholder='Manufacturer' required />
          <input onChange={(e) => setPrice(e.target.value)} value={price} className='border rounded px-3 py-2' type='number' placeholder='Price' required />
          <input onChange={(e) => setStock(e.target.value)} value={stock} className='border rounded px-3 py-2' type='number' placeholder='Stock' required />
          <input onChange={(e) => setExpiry(e.target.value)} value={expiry} className='border rounded px-3 py-2' type='date' required />
          <select onChange={(e) => setCategory(e.target.value)} value={category} className='border rounded px-3 py-2'>
            <option value='Tablet'>Tablet</option>
            <option value='Syrup'>Syrup</option>
            <option value='Injection'>Injection</option>
            <option value='Ointment'>Ointment</option>
            <option value='Other'>Other</option>
          </select>
          <button type='submit' className='bg-[#5f6FFF] px-10 py-3 mt-4 text-white rounded-full'>Add Medicine</button>
        </div>
      </div>
    </form>
  );
}

export default AddMedicine;
