import React, { useEffect, useState } from 'react'
import {useParams,useNavigate} from 'react-router-dom'
import { useAppContext } from '../context/AppContext';

function Doctors() {
  const [filterDoctors,setFilterDoctors]=useState([]);
  const [showFilter,setShowFilter]=useState(false);
  const navigate=useNavigate();
  const {speciality}=useParams();
  const {doctors}=useAppContext();

  const applyFilter=()=>{
    if(speciality) {
      setFilterDoctors([...doctors.filter((doc)=>doc.speciality===speciality)])
    }else{
      setFilterDoctors([...doctors]);
    }
  }

  const haldleSpeciality=(newSpeciality)=>{
    if(newSpeciality==='All Doctors') navigate('/doctors');
     else navigate(`/doctors/${newSpeciality}`);
  }
  
  useEffect(()=>{
    applyFilter();
  },[doctors,speciality]);

  return (
    <div>
      <p className='text-gray-600 text-left text-lg text-2xl font-extrabold'>Browse through the specialist doctors:</p>
      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
        <button className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${showFilter? "bg-primary text-white" : ""}`} onClick={()=>setShowFilter(prev=>!prev)}>Filters</button>
        <div className={` flex-col gap-4 textsm text-gary-600 ${showFilter? "flex" : "hidden sm:flex" }`}>
        <p onClick={()=>{haldleSpeciality('All Doctors')}} className={`w-[94vw] sm:w-auto pl-3 pr-16 py-1.5 border border-gray-300 rounded transition-all cursor-pointer ${ !speciality ? 'bg-indigo-100' : ''}`}>All Doctors</p>
          <p onClick={()=>{haldleSpeciality('General Physician')}} className={`w-[94vw] sm:w-auto pl-3 pr-16 py-1.5 border border-gray-300 rounded transition-all cursor-pointer ${speciality==='General Physician'? 'bg-indigo-100' : ''} `}>General physician</p>
          <p onClick={()=>{haldleSpeciality('Gynecologist')}} className={`w-[94vw] sm:w-auto pl-3 pr-16 py-1.5 border border-gray-300 rounded transition-all cursor-pointer ${speciality==='Gynecologist'? 'bg-indigo-100' : ''}`}>Gynecologist</p>
          <p onClick={()=>{haldleSpeciality('Dermatologist')}} className={`w-[94vw] sm:w-auto pl-3 pr-16 py-1.5 border border-gray-300 rounded transition-all cursor-pointer ${speciality==='Dermatologist'? 'bg-indigo-100' : ''}`}>Dermatologist</p>
          <p onClick={()=>{haldleSpeciality('Pediatricians')}} className={`w-[94vw] sm:w-auto pl-3 pr-16 py-1.5 border border-gray-300 rounded transition-all cursor-pointer ${speciality==='Pediatricians'? 'bg-indigo-100' : ''}`}>Pediatricians</p>
          <p onClick={()=>{haldleSpeciality('Neurology')}} className={`w-[94vw] sm:w-auto pl-3 pr-16 py-1.5 border border-gray-300 rounded transition-all cursor-pointer ${speciality==='Neurology'? 'bg-indigo-100' : ''}`}>Neurology</p>
          <p onClick={()=>{haldleSpeciality('Gastroenterologist')}} className={`w-[94vw] sm:w-auto pl-3 pr-16 py-1.5 border border-gray-300 rounded transition-all cursor-pointer ${speciality==='Gastroenterologist'? 'bg-indigo-100' : ''}`}>Gastroenterologist</p>
        </div>
        <div className='w-full grid grid-cols-auto gap-4 gap-y-6'>
          {
            filterDoctors.map(
              (doctor,index)=>(
                <div onClick={()=>navigate(`/appointment/${doctor._id}`)} key={index} className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500 '>
                    <img className='bg-blue-50' src={doctor.image} alt="" />
                    <div className='p-4 '>
                        <div className='flex items-center gap-2 text-sm text-center text-green-500'>
                            <p className='w-2 h-2 bg-green-500 rounded-full'></p><p>Available</p>
                        </div>
                        <p className='text-gray-900 text-lg font-medium'>{doctor.name}</p>
                        <p className='text-gray-600 text-sm '>{doctor.speciality}</p>
                    </div>
                </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Doctors