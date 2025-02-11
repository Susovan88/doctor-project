import { createContext,useContext, useState } from "react";

const AdminContext=createContext();

const AdminContextProvider=({children})=>{
    const [aToken,setAToken]=useState(localStorage.getItem('aToken')? localStorage.getItem('aToken') : "");

    const backendUrl=import.meta.env.VITE_BACKEND_URL;

    const value={
        aToken,setAToken,backendUrl,
    }

    return (
        <AdminContext.Provider value={value}>
            {children}
        </AdminContext.Provider>
    )
}

const UseAdminContext=()=>{
    return useContext(AdminContext);
}

export default AdminContextProvider;
export {AdminContext,UseAdminContext};