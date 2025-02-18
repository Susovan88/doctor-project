import React from 'react'
import { assets } from '../assets/assets_admin/assets.js'
import { UseAdminContext } from '../context/AdminContext';
import { UseDoctorContext } from '../context/DoctorContext.jsx';
import { useNavigate } from 'react-router-dom';

function Navbar() {

    const navigate=useNavigate();
    const {aToken,setAToken}=UseAdminContext();
    const{dToken,setDToken}=UseDoctorContext();

    const handleLogout=()=>{
        aToken && setAToken('');
        aToken && localStorage.removeItem(aToken);

        dToken && setDToken('');
        dToken && localStorage.removeItem(dToken);
        
        console.log("logout!!");
        navigate('/');
    }

  return (
    <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white'>
        <div className='flex items-center gap-2 text-xs'>
            {/* <img className='w-36 sm:w-40 cursor-pointer' src={assets.admin_logo} alt="" /> */}
            <p className='border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600'>{aToken ? 'Admin' : "Doctor"} </p>
        </div>
        <button onClick={handleLogout} className='bg-[#5f6FFF] text-white text-sm px-10 py-2 rounded-full'>Logout</button>
    </div>
  )
}

export default Navbar;