import { createContext,useContext } from "react";

const DoctorContext=createContext();

const DoctorContextProvider=(props)=>{
    const value={

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