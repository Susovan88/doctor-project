import { createContext,useContext, useState} from "react";

const DoctorContext=createContext();

const DoctorContextProvider=(props)=>{
    const [dToken,setDToken]=useState(localStorage.getItem('dToken')? localStorage.getItem('dToken') : "");
    const value={
        dToken,setDToken
    }

    return (
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    )
}

const UseDoctorContext=()=>{
    return useContext(DoctorContext);
}

export default DoctorContextProvider;
export {DoctorContext,UseDoctorContext};