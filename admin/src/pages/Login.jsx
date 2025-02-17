import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { assets } from '../assets/assets_admin/assets.js';
import { UseAdminContext } from '../context/AdminContext.jsx';
import { toast } from 'react-toastify';
import {UseDoctorContext} from "../context/DoctorContext.jsx"

function Login() {
  const [state, setState] = useState("Admin");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const { setAToken, backendUrl } = UseAdminContext();
  const { dToken,setDToken}=UseDoctorContext();

  const onSubmitHandler = async (ev) => {
    ev.preventDefault();
    try {
      const endpoint = state === 'Admin' ? '/api/admin/login' : '/api/doctor/login';
      const { data } = await axios.post(`${backendUrl}${endpoint}`, { email, password });

      if (data.success) {
        if(state=="Admin"){ 
          localStorage.setItem('aToken', data.token);
          setAToken(data.token);

          localStorage.removeItem('dToken');
          setDToken("");
        }
        else {
          localStorage.setItem('dToken', data.token);
          setDToken(data.token);

          localStorage.removeItem("aToken");
          setAToken("");
        }
        toast.success(`${state} login successful`);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.error("Error: ", err.message);
      toast.error('Login failed!');
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg'>
        <p className='text-2xl font-semibold'>{state === "Admin" ? "Admin Login" : "Doctor Login"}</p>
        <div className='w-full'>
          <p>Email</p>
          <input type="email" className='border border-zinc-300 rounded w-full p-2 mt-1' onChange={(e) => setEmail(e.target.value)} value={email} required />
        </div>
        <div className='w-full'>
          <p>Password</p>
          <input type="password" className='border border-zinc-300 rounded w-full p-2 mt-1' onChange={(e) => setPassword(e.target.value)} value={password} required />
        </div>
        <button className='bg-[#5f6FFF] text-white w-full py-2 rounded-md text-base'>Login</button>
        {state === 'Admin' ? (
          <p>Doctor Login? <span className='text-[#5f6FFF] underline cursor-pointer' onClick={() => setState('Doctor')}>Click here</span></p>
        ) : (
          <p>Admin Login? <span className='text-[#5f6FFF] underline cursor-pointer' onClick={() => setState('Admin')}>Click here</span></p>
        )}
      </div>
    </form>
  );
}

export default Login;
