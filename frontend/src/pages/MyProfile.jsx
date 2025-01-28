import React, { useReducer } from 'react'
import { assets } from '../assets/assets_frontend/assets';
import { useState } from 'react';

function MyProfile() {
  const [userData,setUserdata]=useState({
    name:'Susova Paul',
    image:assets.profile_pic,
    email:"palsusovan88@gmail.com",
    phone:'+91 89107 60697',
    address:{
      line1:"Deulpur, Howrah",
      line2:"Kolkata Garia"
    },
    gender:'Male',
    dob:'2004-04-24'
  });

  const [isEdit,setIsEdit]=useState(false);
  return (
    <div className='max-w-lg flex flex-col gap-2 text-sm'>
      <img src={userData.image} className='w-36 rounded' />
      {
        isEdit
        ? <input className='bg-gray-100 text-3xl font-medium max-w-60 mt-4' type="text" onChange={(e)=>setUserdata(prev=>({...prev,name:e.target.value}))} value={userData.name} /> 
        : <p className='font-medium text-3xl text-neutral-800 mt-4'>{userData.name}</p>
      }
      <hr className='bg-zinc-400 h-[1px] border-none'/>
      <div>
        <p className='text-neutral-500 underline mt-3 '>CONTACT INFORMATION</p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
          <p className='font-medium'>Email id:</p>
          <p className='text-blue-500'>{userData.email}</p>
          <p className='font-medium'>Phone:</p>
          {
            isEdit
            ? <input className='bg-gray-100 max-w-52 ' type="text" onChange={(e)=>setUserdata(prev=>({...prev,phone:e.target.value}))} value={userData.phone} /> 
            : <p className='text-blue-400'>{userData.phone}</p>
          }
          <p className='font-medium'>Address:</p>
          {
            !isEdit 
            ? <p className='text-gray-500'>
              {userData.address.line1}
            <br />
              {userData.address.line2}
            </p>
            : <p>
              <input className='bg-gray-100' type="text" value={userData.address.line1} onChange={(e)=>setUserdata((prev)=> ({...prev,address:{...prev.address,line1:e.target.value}}))}/>
              <br />
              <input className='bg-gray-100 ' type="text" value={userData.address.line2} onChange={(e)=>setUserdata((prev)=> ({...prev,address:{...prev.address,line2:e.target.value}}))} />
              </p>
          }
        </div>
      </div>
      <div>
      <p className='text-neutral-500 underline mt-3'>BASIC INFORMATIONS:</p>
      <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
        <p className='font-medium'>Gender:</p>
        {isEdit ? (
          <select className='max-w-20 bg-gray-100'
            value={userData.gender}
            onChange={(e) =>
              setUserdata((prev) => ({ ...prev, gender: e.target.value }))
            }
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        ) : (
          <p className='text-gray-500'>{userData.gender}</p>
        )}
        <p className='font-medium'>Birthday:</p>
        {isEdit ? (
          <input className='max-w-28 bg-gray-100'
            type="date"
            value={userData.dob}
            onChange={(e) =>
              setUserdata((prev) => ({ ...prev, dob: e.target.value }))
            }
          />
        ) : (
          <p className='text-gray-500'>{userData.dob}</p>
        )}
      </div>
    </div>
    <div className='mt-10'>
      {
        isEdit
        ? <button className='border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition' onClick={() => setIsEdit(!isEdit)}>Save Information</button>
        : <button className='border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition' onClick={() => setIsEdit(!isEdit)}>Edit</button>
      }
    </div>
    </div>
  )
}

export default MyProfile