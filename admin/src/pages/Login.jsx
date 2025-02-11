import React, { useState } from 'react'
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {assets} from '../assets/assets_admin/assets.js'
import { UseAdminContext } from '../context/AdminContext.jsx';
import { toast } from 'react-toastify';

function Login() {

  const [state,setState]=useState("Admin");
  const [email,setEmail]=useState('');
  const [password,setpassword]=useState('');

  const navigate=useNavigate();
  const {setAToken,backendUrl}=UseAdminContext();

  const onSumitHandler=async(ev)=>{
    ev.preventDefault();
    try{
      const {data}=await axios.post(backendUrl+'/api/admin/login',{email,password});
      if(data.success===true){
        localStorage.setItem('aToken',data.token);// stored in local 
        setAToken(data.token);
        
      }else{
        toast.error(data.message);
      }
    }catch(err){
      console.log("error: ",err.message);
    }
  }

  return (
    <form onSubmit={onSumitHandler} className='min-h-[80vh] flex item-center'>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zine-600 text-sm shadow-lg'>
        <p className='text-2xl font-semicold'>{state==="Admin" ? "Admin Login" : "Doctor Login"}</p>
        {/* <p>Please {state==="Sign Up" ? "Sign Up" : "Login"} to book appointment</p> */}

        <div className='w-full'>
          <p>Email </p>
          <input type="email" className='border border-zinc-300 rounded w-full p-2 mt-1' onChange={(e)=>setEmail(e.target.value)} value={email} required/>
        </div>
        <div className='w-full'>
          <p> Password </p>
          <input type="password" className='border border-zinc-300 rounded w-full p-2 mt-1' onChange={(e)=>setpassword(e.target.value)} value={password} required/>
        </div>
        <button className='bg-[#5f6FFF] text-white w-full py-2 rounded-md text-base'>Login</button>
        {
          state==='Admin'
          ? <p>Doctor Login? <span className='text-[#5f6FFF] underline cursor-pointer' onClick={()=>setState('Doctor')}>Click here</span> </p>
          : <p>Admin Login? <span className='text-[#5f6FFF] underline cursor-pointer' onClick={()=>setState('Admin')}>Click here</span> </p>
        }
      </div>
    </form>
  )
}

export default Login