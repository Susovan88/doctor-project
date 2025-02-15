import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { UseUserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const MyMedicationReminder = () => {
  const [medications, setMedications] = useState([]);
  const [formData, setFormData] = useState({ medicationName: '', reminderTime: '', isActive: true });

  const { uToken, backendUrl } = UseUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    fetchMedications();
  }, []);

  const fetchMedications = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/medications`, { headers: { uToken } });
      if (data.success) {
        setMedications(data.medications);
      }
    } catch (error) {
      console.error('Error fetching medications:', error);
      navigate('/');
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(`${backendUrl}/api/user/medications/${id}`, { headers: { uToken } });
      if (data.success) {
        toast.success('Medication deleted successfully!');
        fetchMedications();
      }
    } catch (error) {
      console.log('Failed to delete medication:', error);
      toast.error('Failed to delete medication');
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${backendUrl}/api/user/medications`, formData, { headers: { uToken } });
      if (data.success) {
        toast.success('Medication added successfully!');
        fetchMedications();
        setFormData({ medicationName: '', reminderTime: '', isActive: true });
      }
    } catch (error) {
      console.error('Failed to add medication:', error);
      toast.error('Failed to add medication');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Medication Reminder</h1>
      <form onSubmit={handleSubmit} className="mb-6 grid grid-cols-1 gap-4">
        <input
          type="text"
          name="medicationName"
          placeholder="Medication Name"
          value={formData.medicationName}
          onChange={handleChange}
          className="bg-gray-100 p-2 border rounded"
          required
        />
        <input
          type="time"
          name="reminderTime"
          value={formData.reminderTime}
          onChange={handleChange}
          className="bg-gray-100 p-2 border rounded"
          required
        />
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isActive"
            checked={formData.isActive}
            onChange={handleChange}
          />
          Active
        </label>
        <button type="submit" className="p-2 bg-primary text-white rounded hover:bg-blue-600">Add Medication</button>
      </form>

      <h2 className=" text-xl font-semibold mb-2">Medication List</h2>
      <div className="grid gap-4">
        {medications.map((med) => (
          <div key={med._id} className="bg-gray-100 p-4 border rounded shadow flex justify-between items-center">
          <div>
            <p><strong>Name:</strong> {med.medicationName}</p>
            <p><strong>Time:</strong> {med.reminderTime}</p>
            <p><strong>Status:</strong> {med.isActive ? 'Active' : 'Inactive'}</p>
          </div>
            <button onClick={() => handleDelete(med._id)} className="p-2 bg-red-500 text-white rounded hover:bg-red-600">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyMedicationReminder;
