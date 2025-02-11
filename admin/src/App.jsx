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

function App() {

  const {aToken}=UseAdminContext();
  console.log(aToken);

  return aToken ? (
    <div className='bg-[#F8F9FD]'>
      <ToastContainer/>
      <Navbar/>
      <div className='flex item-start'>
        <Sidebar/>
        <Routes>
          <Route path='/' element={<></>}/>
          <Route path='/admin-dashboard' element={<Dashboard/>}/>
          <Route path='/all-appointments' element={<AllApointment/>}/>
          <Route path='/add-doctor' element={<AddDoctor/>}/>
          <Route path='/doctor-list' element={<DoctorList/>}/>
        </Routes>
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