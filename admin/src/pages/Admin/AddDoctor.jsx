import React from 'react'
import { useState } from 'react';
import {assets} from '../../assets/assets_admin/assets'
import {UseAdminContext} from "../../context/AdminContext"
import {toast} from "react-toastify";
import axios from "axios"

function AddDoctor() {

  

  const [docImg, setDocImg] = useState(false);
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [degree, setDegree] = useState("");
const [fees, setFees] = useState("");
const [experience, setExperience] = useState("1 Year");
const [about, setAbout] = useState("");
const [speciality, setSpeciality] = useState("General Physician");
const [address1, setAddress1] = useState("");
const [address2, setAddress2] = useState("");

  const {backendUrl,aToken}=UseAdminContext();

  const handleOnSubmit=async(e)=>{
    e.preventDefault();
    try{
      if(!docImg){
        return toast.error("Image Not Selected !!!");
      }
      const formData=new FormData();
      formData.append("image",docImg);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("degree", degree);
      formData.append("fees", Number(fees));
      formData.append("speciality", speciality);
      formData.append("experience", experience);
      formData.append("about", about);
      formData.append("address", JSON.stringify({ line1: address1, line2: address2 }));

      formData.forEach((value,key)=> console.log(key , " ", value)); // console data

      const {data}=await axios.post(backendUrl+'/api/admin/add-doctor',formData ,{headers:{aToken}});
      if(data.success){
        toast.success(data.message);

        setDocImg(false);
        setName("");
        setEmail("");
        setPassword("");
        setDegree("");
        setFees("");
        setExperience("1 Year");
        setAbout("");
        setSpeciality("General Physician");
        setAddress1("");
        setAddress2("");
        
      }else{
        toast.error(data.message);
      }
    
    }catch(err){  
      toast.error("Something went wrong! Please try again.");
    }
  }

  return (
    <form onSubmit={handleOnSubmit} className='m-5 w-full'>
      <p className='mb-3 text-lg font-medium'>Add Doctor</p>

      <div className='bg-white px-8 py-8 border w-full max-w-4xl max-h-[80vh] overflow-y-scroll'>
        <div className='flex items-center gap-4 mb-8 text-gray-500'>
          <label htmlFor="doc-img">
            <img className='w-16 bg-gray-100 rounded-full cursor-pointer ' src={docImg ? URL.createObjectURL(docImg) :assets.upload_area} alt="" />
          </label>
          <input onChange={(e)=>setDocImg(e.target.files[0])} type="file" id="doc-img" hidden/>
          <p>Uploade Docter<br/> picture</p>
        </div>
        <div className='flex flex-col lg:flex-row items-start gap-10 text-gray-600'>

          <div className='w-full lg:flex-1 flex flex-col gap-4'>

            <div className='flex-1 flex flex-col gap-1'>
              <p>Doctor name</p>
              <input onChange={(e)=> setName(e.target.value)} value={name} className='border rounded px-3 py-2' type="text" placeholder='Name' />
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <p>Doctor email</p>
              <input  onChange={(e)=> setEmail(e.target.value)} value={email} className='border rounded px-3 py-2' type="text" placeholder='Email' />
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <p>Doctor password</p>
              <input  onChange={(e)=> setPassword(e.target.value)} value={password} className='border rounded px-3 py-2' type="text" placeholder='Password' />
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <p>Expreience</p>
              <select onChange={(e)=> setExperience(e.target.value)} value={experience} className='border rounded px-3 py-2' name="" id="">
                <option value="1 Year"> 1 Year</option>
                <option value="2 Year"> 2 Year</option>
                <option value="3 Year"> 3 Year</option>
                <option value="4 Year"> 4 Year</option>
                <option value="5 Year"> 5 Year</option>
                <option value="6 Year"> 6 Year</option>
                <option value="7 Year"> 7 Year</option>
                <option value="8 Year"> 8 Year</option>
                <option value="9 Year"> 9 Year</option>
                <option value="10 Year">10 Year</option>
              </select>
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <p>Doctor Fees</p>
              <input onChange={(e)=> setFees(e.target.value)} value={fees} className='border rounded px-3 py-2' type="number" placeholder='fees' />
            </div>

          </div>

          <div>
          <div className='flex-1 flex flex-col gap-4'>
            <p>Specialty</p>
            <select onChange={(e)=> setSpeciality(e.target.value)} value={speciality} className='border rounded px-3 py-2' id="specialty" name="specialty">
              <option value="General Physician">General Physician</option>
              <option value="Dermatology">Dermatologist</option>
              <option value="Neurology">Neurologist</option>
              <option value="Pediatricians">Pediatricians</option>
              <option value="Gynecologist">Gynecologist</option> 
              <option value="Gastroenterologist">Gastroenterologist</option> 
            </select>
          </div>

          <div className='flex-1 flex flex-col gap-1'>
              <p>Education</p>
              <input onChange={(e)=> setDegree(e.target.value)} value={degree} className='border rounded px-3 py-2' type="text" placeholder='Education' />
          </div>

          <div className='flex-1 flex flex-col gap-1'>
              <p>Address</p>
              <input onChange={(e)=> setAddress1(e.target.value)} value={address1} className='border rounded px-3 py-2' type="text" placeholder='Address 1' />
              <input onChange={(e)=> setAddress2(e.target.value)} value={address2} className='border rounded px-3 py-2' type="text" placeholder='Address 2' />
          </div>
          </div>

        </div>
        <div>
          <p className='mt-4 mb-2'>About Doctor</p>
          <textarea onChange={(e)=> setAbout(e.target.value)} value={about} className='w-full px-4 pt-2 border rounded' type="text" placeholder='Write About Doctor ' required></textarea>
        </div>
        <button type='submit' className='bg-[#5f6FFF] px-10 py-3 mt-4 text-white rounded-full'>Add Doctor</button>
      </div>
    </form>
  )
}

export default AddDoctor;