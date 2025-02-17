import React, { useState, useEffect } from 'react';
import { UseAdminContext } from '../../context/AdminContext';
import { toast } from 'react-toastify';
import axios from 'axios';

function AllApointment() {
  const [appointments, setAppointments] = useState([]);
  const { backendUrl, aToken } = UseAdminContext();

  useEffect(() => {
    const fetchAllAppointments = async () => {
      try {
        const { data } = await axios.get(`${backendUrl}/api/admin/all-appointments`, { headers: { aToken } });
        if (data.success) {
          setAppointments(data.appointments);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        console.error('Error fetching all appointments:', error);
        toast.error('Failed to fetch appointments.');
      }
    };
    fetchAllAppointments();
  }, [backendUrl, aToken]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="pb-4 mb-6 text-2xl font-semibold text-gray-800 border-b">All Appointments (Admin)</h2>
      <div className="space-y-6">
        {appointments.map((appointment) => (
          <div className="flex flex-col sm:flex-row items-center bg-white shadow-md rounded-lg p-4 border" key={appointment._id}>
            <img className="w-32 h-32 object-cover rounded-lg bg-indigo-50" src={appointment.doctorId.image} alt={appointment.doctorId.name} />
            <div className="flex-1 ml-4 text-sm text-gray-700">
              <p className="text-lg font-semibold text-gray-900">{appointment.doctorId.name}</p>
              <p className="text-gray-600 mb-2">Specialization: {appointment.doctorId.speciality}</p>
              <p className="text-gray-800 font-medium mt-2">Patient: {appointment.patientId.name}</p>
              <p className="text-gray-600">Contact: {appointment.patientId.email} | {appointment.patientId.phone}</p>
              <p className="text-gray-600 font-medium mt-2">Date & Time: {new Date(appointment.slotTime).toLocaleString()}</p>
              <p className="text-gray-600 font-medium mt-2">Prescription: {appointment.prescription || 'No prescription available'}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllApointment;
