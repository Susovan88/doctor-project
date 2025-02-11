import { createContext,useContext, useState, useEffect} from "react";


const UserContext=createContext();

const UserContextProvider=({children})=>{

    const storedToken = localStorage.getItem("uToken") || "";
    const [uToken, setUToken] = useState(storedToken);

    const backendUrl=import.meta.env.VITE_BACKEND_URL;

    const value={
        uToken,setUToken,backendUrl,
    }

    useEffect(() => {
        if (uToken) {
          localStorage.setItem("uToken", uToken);
        } else {
          localStorage.removeItem("uToken");
        }
      }, [uToken]);

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}

const UseUserContext=()=>{
    return useContext(UserContext);
}

export default UserContextProvider;
export {UserContext,UseUserContext};