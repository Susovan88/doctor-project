import React, { useState, useEffect } from 'react';
import { UseDoctorContext } from '../../context/DoctorContext';
import { UseAdminContext } from '../../context/AdminContext';
import { toast } from 'react-toastify';
import axios from 'axios';

function DocAllAppointment() {
  const [appointments, setAppointments] = useState([]);
  const { backendUrl } = UseAdminContext();
  const { dToken } = UseDoctorContext();

  useEffect(() => {
    const fetchDoctorAppointments = async () => {
      try {
        const { data } = await axios.get(`${backendUrl}/api/doctor/doc-appointments`, { headers: {dToken:dToken}} );
        if (data.success) {
          setAppointments(data.appointments);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        console.error('Error fetching doctor appointments:', error);
        toast.error('Failed to fetch appointments');
      }
    };
    fetchDoctorAppointments();
  }, [backendUrl, dToken]);

  const handleCancel = async (id) => {
    // Logic to cancel appointment
    console.log('Cancel appointment:', id);
  };

  const handleComplete = async (id) => {
    // Logic to complete appointment
    console.log('Complete appointment:', id);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="pb-4 mb-6 text-2xl font-semibold text-gray-800 border-b">All Appointments (Doctor)</h2>
      <div className="space-y-6">
        {appointments.map((appointment) => (
          <div className="flex flex-col sm:flex-row items-center bg-white shadow-md rounded-lg p-4 border" key={appointment._id}>
            <img className="w-32 h-32 object-cover rounded-lg bg-indigo-50" src={appointment.patientId.image} alt={appointment.patientId.name} />
            <div className="flex-1 ml-4 text-sm text-gray-700">
              <p className="text-lg font-semibold text-gray-900">{appointment.patientId.name}</p>
              <p className="text-gray-600 mb-2">Phone: {appointment.patientId.phone}</p>
              <p className="text-gray-600 font-medium mt-2">Date & Time: {new Date(appointment.slotTime).toLocaleString()}</p>
              <p className="text-gray-600 font-medium mt-2">Prescription: {appointment.prescription || 'No prescription available'}</p>
            </div>
            <div className="ml-auto space-x-2">
              <button onClick={() => handleCancel(appointment._id)} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">Cancel Appointment</button>
              <button onClick={() => handleComplete(appointment._id)} className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">Complete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DocAllAppointment;