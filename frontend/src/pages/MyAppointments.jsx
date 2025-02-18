
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UseUserContext } from '../context/UserContext';
import { toast } from "react-toastify";

function MyAppointments() {
  const [appointments, setAppointments] = useState([]);
  const { uToken, backendUrl } = UseUserContext();

  const navigate=useNavigate();

  const handleCancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.delete(`${backendUrl}/api/user/book-appointment/${appointmentId}`, {
        headers: { uToken: uToken }
      });
      if (data.success) {
        setAppointments((prev) => prev.filter(appointment => appointment._id !== appointmentId));
        toast.success('Appointment cancelled successfully.');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Error cancelling appointment:', error);
      toast.error('Failed to cancel appointment.');
    }
  };

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const { data } = await axios.get(backendUrl + '/api/user/book-appointment', { headers: { uToken: uToken } });
        if (data.success) {
          setAppointments(data.appointments);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <div>
      <p className='pb-3 mt-12 font-medium text-zinc-700 border-b'>My Appointments:</p>
      <div>
        {appointments.map((appointment, index) => (
          <div className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b' key={index}>
            <div>
              <img className='w-32 bg-indigo-50' src={appointment.doctorId.image} alt="" />
            </div>
            <div className='flex-1 text-sm text-zinc-600'>
              <p className='text-neutral-800 font-semibold'>{appointment.doctorId.name}</p>
              <p>{appointment.doctorId.specialization}</p>
              <p className='text-zinc-700 font-medium mt-1'>Address:</p>
              <p className='text-xs'>{appointment.doctorId.address?.line1}</p>
              <p className='text-xs'>{appointment.doctorId.address?.line2}</p>
              <p className='text-sm mt-1'><span className='text-sm text-neutral-700 font-medium'>Date & Time: </span>{new Date(appointment.slotTime).toLocaleString()}</p>
              <p className='text-sm mt-1'><span className='text-sm text-neutral-700 font-medium'>Meeting ID: </span>{appointment.meetingDetails.meetingId}</p>
              <p className='text-sm mt-1'><span className='text-sm text-neutral-700 font-medium'>Password: </span>{appointment.meetingDetails.meetingPassword}</p>
            </div>
            <div></div>
            <div className='flex flex-col gap-2 justify-end'>
              <button onClick={()=>navigate(`/online-meeting/${appointment.meetingDetails.meetingId}`)} className='text-sm bg-primary text-white text-center sm:min-w-48 py-2 border rounded hover:text-primary hover:bg-white hover: border-primary transition-all duration-300'>Enter Room</button>
              <button className='text-sm text-red-700 text-center sm:min-w-48 py-2 border border-red-700 rounded hover:text-white hover:bg-red-600 transition-all duration-300' onClick={() => handleCancelAppointment(appointment._id)}>Cancel Appointment</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyAppointments;
