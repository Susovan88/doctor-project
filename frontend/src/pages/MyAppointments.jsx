import React from 'react'
import { useAppContext } from '../context/AppContext'

function MyAppointments() {
  const {doctors}=useAppContext();
  return (
    <div>
      <p className='pb-3 mt-12 font-medium text-zinc-700 border-b'>My Appointments:</p>
      <div >
        {
          doctors.slice(0,2).map((doc,index)=>
          (
            <div className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b' key={index}>
              <div>
                <img className='w-32 bg-indigo-50' src={doc.image} alt="" />
              </div>
              <div className='flex-1 text-sm text-zinc-600'>
                <p className='text-neutral-800 font-semibold'>{doc.name}</p>
                <p>{doc.speciality}</p>
                <p className='text-zinc-700 font-medium mt-1'>Address:</p>
                <p className='text-xs'>{doc.address.line1}</p>
                <p className='text-xs'>{doc.address.line2}</p>
                <p className='text-sm mt-1'><span className='text-sm text-neutral-700 font-medium'>Date & Time: </span> 24, April, 2025 || 6:30 PM</p>
              </div>
              <div></div>
              <div className='flex flex-col gap-2 justify-end'>
                <button className='text-sm bg-primary text-white text-center sm:min-w-48 py-2 border rounded hover:text-primary hover:bg-white hover: border-primary transition-all duration-300'>Pay Online</button>
                <button className='text-sm text-red-700 text-center sm:min-w-48 py-2 border border-red-700 rounded hover:text-white hover:bg-red-600 transition-all duration-300'>Cancle Appointment</button>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default MyAppointments