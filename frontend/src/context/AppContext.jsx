import React, { createContext, useContext } from 'react'
export const AppContext=createContext();
import { doctors } from '../assets/assets_frontend/assets';

function AppContextProvider(props) {

  const currencySymbol='$';

  return (
    <AppContext.Provider value={{doctors,currencySymbol}}>
        {props.children}
    </AppContext.Provider>
  )
}
export default AppContextProvider;

export function useAppContext(){ // custom hook
    return useContext(AppContext);
}