import axios from 'axios';
import {toast} from "react-toastify"

export const getMedications = async () => {
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
    }

  } catch (error) {
    console.error('Error fetching medications:', error);
  }
};