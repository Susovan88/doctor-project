import React from 'react'
import Login from './pages/Login'
import { ToastContainer, toast } from 'react-toastify';
import { UseAdminContext } from './context/AdminContext.jsx';
import Navbar from './components/Navbar.jsx';
import Sidebar from './components/Sidebar.jsx';
import { Route, Routes } from 'react-router-dom';
import DoctorList from './pages/Admin/DoctorList.jsx';
import AddDoctor from './pages/Admin/AddDoctor.jsx';
import Dashboard from "./pages/Admin/Dashboard.jsx";
import AllApointment from './pages/Admin/AllApointment.jsx'
import AddMedicine from './pages/Admin/AddMedicine.jsx';
import AllOrders from './pages/Admin/AllOrders.jsx';
import {UseDoctorContext} from "./context/DoctorContext.jsx"
import DocAllAppointment from './pages/Doctor/DocAllAppointment.jsx';


function App() {

  const {aToken}=UseAdminContext();
  const {dToken}=UseDoctorContext();
  console.log(aToken);

  return aToken || dToken ? (
    <div className='bg-[#F8F9FD]'>
      <ToastContainer/>
      <Navbar/>
      <div className='flex item-start'>
        <Sidebar/>
        {
          aToken && 
          <Routes>
          <Route path='/' element={<></>}/>
          <Route path='/admin-dashboard' element={<Dashboard/>}/>
          <Route path='/all-appointments' element={<AllApointment/>}/>
          <Route path='/add-doctor' element={<AddDoctor/>}/>
          <Route path='/doctor-list' element={<DoctorList/>}/>
          <Route path='/add-medicine' element={<AddMedicine/>}/>
          <Route path='/all-orders' element={<AllOrders/>}/>
        </Routes>
        }
        {
          dToken &&
          <Routes>
          <Route path='/' element={<></>}/>
          <Route path='/admin-dashboard' element={<Dashboard/>}/>
          <Route path='/doc-appointments' element={<DocAllAppointment/>}/>
        </Routes>
        }
      </div>
    </div>
  ) : (
    <div>
      <Login/>
      <ToastContainer/>
    </div>
  )
}

export default App