import React from 'react'
import { UseAdminContext } from '../context/AdminContext'
import { UseDoctorContext } from '../context/DoctorContext.jsx'
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets_admin/assets.js';

function Sidebar() {

  const {aToken}=UseAdminContext();
  const {dToken}=UseDoctorContext();

  return (
    <div className='min-h-screen bg-white border-r'>
      {
        aToken && <ul className='text-[#515151] mt-5' >
          <NavLink className={({isActive})=>`flex items-center gap-3 py-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-[#5f6FFF]' : ''}`} to={'/admin-dashboard'}>
            <img src={assets.home_icon} alt="" /><p>Dashboard</p>
          </NavLink>
          <NavLink className={({isActive})=>`flex items-center gap-3 py-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-[#5f6FFF]' : ''}`} to={'/all-appointments'}>
            <img src={assets.appointment_icon} alt="" /><p>Appointment</p>
          </NavLink >
          <NavLink className={({isActive})=>`flex items-center gap-3 py-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-[#5f6FFF]' : ''}`} to={'/add-doctor'}>
            <img src={assets.add_icon} alt="" /><p>Add Doctor</p>
          </NavLink>
          <NavLink className={({isActive})=>`flex items-center gap-3 py-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-[#5f6FFF]' : ''}`} to={'/doctor-list'}>
            <img src={assets.people_icon} alt="" /><p>Doctors List</p>
          </NavLink>
          <NavLink className={({isActive})=>`flex items-center gap-3 py-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-[#5f6FFF]' : ''}`} to={'/add-medicine'}>
            <img src={assets.people_icon} alt="" /><p>Add Medicine</p>
          </NavLink>
          <NavLink className={({isActive})=>`flex items-center gap-3 py-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-[#5f6FFF]' : ''}`} to={'/all-orders'}>
            <img src={assets.people_icon} alt="" /><p>All Orders</p>
          </NavLink>
        </ul>
      }
      {
        dToken &&  <ul className='text-[#515151] mt-5' >
        <NavLink className={({isActive})=>`flex items-center gap-3 py-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-[#5f6FFF]' : ''}`} to={'/admin-dashboard'}>
          <img src={assets.home_icon} alt="" /><p>Dashboard</p>
        </NavLink>
        <NavLink className={({isActive})=>`flex items-center gap-3 py-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-[#5f6FFF]' : ''}`} to={'/doc-appointments'}>
          <img src={assets.appointment_icon} alt="" /><p>All Appointment</p>
        </NavLink >
      </ul>
      }
    </div>
  )
}

export default Sidebar