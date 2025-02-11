import { createContext,useContext } from "react";

const AppContext=createContext();

const AppContextProvider=(props)=>{
    const value={

    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

const UseAppContext=()=>{
     return useContext(AppContext);
}

export default AppContextProvider;
export {AppContext,UseAppContext};