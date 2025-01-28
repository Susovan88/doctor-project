import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Login() {
  const [state,setState]=useState('Log In');
  const [email,setEmail]=useState('');
  const [password,setpassword]=useState('');
  const [name,setName]=useState(''); 

  const navigate=useNavigate()

  const onSumitHandler=async(ev)=>{
    ev.preventDefalut();
  }

  return (
    <form className='min-h-[80vh] flex item-center'>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zine-600 text-sm shadow-lg'>
        <p className='text-2xl font-semicold'>{state==="Sign Up" ? "Create Account" : "Login"}</p>
        <p>Please {state==="Sign Up" ? "Sign Up" : "Login"} to book appointment</p>
        {
          state==='Sign Up' &&
          <div className='w-full'>
          <p>Full Name </p>
          <input type="text" className='border border-zinc-300 rounded w-full p-2 mt-1' onChange={(e)=>setName(e.target.value)} value={name} required/>
          </div>
        }
        <div className='w-full'>
          <p>Email </p>
          <input type="email" className='border border-zinc-300 rounded w-full p-2 mt-1' onChange={(e)=>setEmail(e.target.value)} value={email} required/>
        </div>
        <div className='w-full'>
          <p> Password </p>
          <input type="password" className='border border-zinc-300 rounded w-full p-2 mt-1' onChange={(e)=>setpassword(e.target.value)} value={password} required/>
        </div>
        <button className='bg-primary text-white w-full py-2 rounded-md text-base'>{state==="Sign Up" ? "Create Account" : "Login"}</button>
        {
          state==='Sign Up'
          ? <p>Already have an account? <span className='text-primary underline cursor-pointer' onClick={()=>setState('Log In')}>Login here</span> </p>
          : <p>Create an new account? <span className='text-primary underline cursor-pointer' onClick={()=>setState('Sign Up')}>SignUp here</span> </p>
        }
      </div>
    </form>
  )
}

export default Login