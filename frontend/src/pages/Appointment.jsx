import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAppContext } from '../context/AppContext';
import axios from 'axios';
import { assets } from '../assets/assets_frontend/assets';
import RelatedDoctors from '../components/RelatedDoctors';
import {toast} from "react-toastify";
import { UseUserContext } from '../context/UserContext';


function Appointment() {

  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const [docInfo,setDocInfo]=useState(null);
  const [docSlots,setDocSlots]=useState([]);
  const [slotIndex,setSlotIndex]=useState(0);
  const [slotTime,setSlotTime]=useState('');

  const {docId}=useParams();
  const {doctors,currencySymbol}=useAppContext();
  const { setUToken, uToken, backendUrl } = UseUserContext();

  const fetchDocInfo=async ()=>{
    const docinfo=doctors.find(doc=> doc._id===docId);
    setDocInfo(docinfo);
    console.log(docinfo);
  }

  // function to create doctor Slots...
  const getAvailableSlots= async()=>{
    setDocSlots([]);

    // getting current date
    let today=new Date();
    for (let i=0; i<7; i++){
      //getting dates with index
      let currentDate= new Date(today);
      currentDate.setDate(today.getDate()+i)
      // setting end time of the date with index 
      let endTime=new Date();
      endTime.setDate(today.getDate()+i);
      endTime.setHours(21,0,0,0)

      //setting hours...
      if(today.getDate()===currentDate.getDate()){
        currentDate.setHours(currentDate.getHours()>10 ? currentDate.getHours()+1 : 10);
        currentDate.setMinutes(currentDate.getMinutes()>30 ? 30 : 0)
      }
      else{
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots=[];

      while(currentDate<endTime){
        let formattedTime=currentDate.toLocaleDateString([],{hour:'2-digit',minute:'2-digit'});
        timeSlots.push({
          datetime:new Date(currentDate),
          time:formattedTime
        })

        currentDate.setMinutes(currentDate.getMinutes()+30)
      }
    
      setDocSlots((prev)=> ([...prev,timeSlots]))
    }
  }
  

  const handleBookAppointment = async (mode, paymentMode) => { 
    if (!docSlots[slotIndex]) {
      toast.error("No slots available for the selected index.");
      return;
    }
  
    const selectedSlot = docSlots[slotIndex].find(item => item.time === slotTime);
    if (!selectedSlot) {
      toast.error("No slot time selected.");
      return;
    }
  
    const time = selectedSlot.datetime;
    console.log(time);
  
    try {
      const {data} = await axios.post(backendUrl+'/api/user/book-appointment', {
        doctorId: docId,
        slotTime: time,
        mode,
        paymentMode,
      },{headers:{uToken:uToken}});
  
      if (data.success) {
        toast.success('Appointment booked successfully!');
      }
      else{
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Error booking appointment:');
      toast.error('Failed to book appointment');
    }
  };


  useEffect(()=>{
    fetchDocInfo();
  },[docId,doctors]);

  useEffect(()=>{
    getAvailableSlots();
  },[docInfo]);

  useEffect(()=>{
    console.log(docSlots);
  },[docSlots]);

  return docInfo && (
    <div>
      <div className='flex flex-col sm:flex-row gap-4'>
        <div>
          <img className='bg-primary w-full sm:max-w-72 rounded-lg' src={docInfo.image} alt="" />
        </div>

        <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
          <p className='flex items-center gap-2 text-2xl font-medium text-gary-900'>
            {docInfo.name} 
            <img className='w-5' src={assets.verified_icon} alt="" />
          </p>
          <div className='flex items-center gap-2 text-sm mt-1 text-gary-600 '>
            <p>{docInfo.degree} - {docInfo.speciality}</p>
            <button className='py-0.5 px-2 border text-xs rounded-full'>{docInfo.experience}</button>
          </div>
          <div>
            <p className='flex items-center gap-1 text-sm font-medium text-gray-900 mt-3'>  About <img src={assets.info_icon} alt="" /></p>
            <p className='text-sm text-gray-500 max-w-[700px] mt-1'>
              {docInfo.about}
            </p>
          </div>
          <p className='text-gray-500 font-medium mt-4'>
          Appointment fee: <span> {docInfo.fees}{currencySymbol} </span>
          </p>
        </div>

      </div>

      {/* {booking slots} */}

      <div className='sm:ml-72 sm:p1-4 mt-4 font-medium text-gray-700'>
        <p>Booking Slots :</p>
        <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
          {docSlots.length && docSlots.map((item,index)=>(
            <div onClick={()=> setSlotIndex(index)} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex===index ? `bg-primary text-white`: `border border-gray-200` } `} key={index}>
              <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
              <p>{item[0] && item[0].datetime.getDate()}</p>
            </div>
          ))}
        </div>
        <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
          {
            docSlots.length && docSlots[slotIndex].map((item,index)=>(
              <p onClick={()=>setSlotTime(item.time)} className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time===slotTime? `text-white bg-primary`:`text-gray-400 border border-gray-300`}`} key={index}>{item.time.split(",")[1]?.trim().toLowerCase()}</p>
            ))
          }
        </div>
        <button onClick={()=>{handleBookAppointment("Offline","Cash")}} className='bg-primary text-white text-sm font-light px-14 py-3 mr-6 rounded-full my-6'>Book offline appointment</button>
        <button onClick={()=>{handleBookAppointment("Online","Online Payament")}} className='bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6'>Book online appointment</button>
      </div>

      {/* listing related Doctors  */}
      <RelatedDoctors docId={docId} speciality={docInfo.speciality}></RelatedDoctors>
    </div>
  )
}

export default Appointment