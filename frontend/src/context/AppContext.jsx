import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
export const AppContext=createContext();
// import { doctors } from '../assets/assets_frontend/assets';

function AppContextProvider(props) {
  const [doctors,setDoctors]=useState([]);

  const currencySymbol='$';

    const fetchDoctors = async () => {
      try {
        const {data} = await axios.get('http://localhost:8000/api/doctor'); // Adjust your backend URL
        setDoctors(data.doctors);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };
  
    useEffect(() => {
      fetchDoctors();
    }, []);

  return (
    <AppContext.Provider value={{doctors,currencySymbol,fetchDoctors}}>
        {props.children}
    </AppContext.Provider>
  )
}
export default AppContextProvider;

export function useAppContext(){ // custom hook
    return useContext(AppContext);
}