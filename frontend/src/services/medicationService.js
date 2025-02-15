import axios from 'axios';
import {toast} from "react-toastify"

export const getMedications = async () => {
<<<<<<< HEAD
  const backendUrl=import.meta.env.VITE_BACKEND_URL;
  const uToken = localStorage.getItem("uToken");
  const API_URL = backendUrl+'/api/user/medications';
  try {
    const {data} = await axios.get(`API_URL`,{headers:{uToken:uToken}});
    console.log(data.message);
    if(data.success)return data.medications;
    else {
        toast.error(data.message);
        console.log(data.message);
=======
  const backendUr=import.meta.env.VITE_BACKEND_URL;
  const uToken = localStorage.getItem("uToken");
  const API_URL = backendUr+'/api/user/medications';
  try {
    const {data} = await axios.get(`${API_URL}`,{headers:{uToken:uToken}});
    console.log(data.medications);
    if(data.success)return data.medications;
    else {
        toast.error(data.message);
        console.log(error);
>>>>>>> 0f73b4d42e5632a82a8c31680e071155c2e48962
    }

  } catch (error) {
    console.error('Error fetching medications:', error);
  }
};