import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Doctors from './pages/Doctors';
import Login from './pages/Login';
import About from './pages/About';
import Contact from './pages/Contact';
import MyProfile from './pages/MyProfile';
import Appointment from './pages/Appointment';
import MyAppointments from './pages/MyAppointments';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import {ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import MySymptoms from './pages/MySymptoms';
import MedicationReminder from './pages/MedicationReminder';
import MyMedictionReminder from './pages/MyMedictionReminder';
import MedicineStore from './pages/MedicineStore';
import MyOrderList from './pages/MyOrderList';
import VideoCall from './pages/VideoCall';

const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%]'>
      <MedicationReminder/>
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/doctors' element={<Doctors/>} />
        <Route path='/doctors/:speciality' element={<Doctors/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/my-profile' element={<MyProfile/>} />
        <Route path='/medicine-store' element={<MedicineStore/>} />
        <Route path='/my-symptoms' element={<MySymptoms/>}/>
        <Route path='/my-order-list' element={<MyOrderList/>}/>
        <Route path='/mediction-reminder' element={<MyMedictionReminder/>}/>
        <Route path='/my-appointments' element={<MyAppointments/>} />
        <Route path='/online-meeting/:id' element={<VideoCall/>} />
        <Route path='/appointment/:docId' element={<Appointment/>} />
      </Routes>
      <Footer/>
    </div>
  )
}

export default App