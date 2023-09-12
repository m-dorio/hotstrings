import { useEffect, useContext } from 'react';
import { Navigate } from "react-router-dom";
import UserContext from '../UserContext';

export default function Logout(){

    const { unsetUser, setUser } = useContext(UserContext);
    // localStorage.clear();

    unsetUser();

    useEffect(() => {
        //Set the user state back to it's original value
        setUser({
            id:null,
            isAdmin: null
        });
    },[])//<--Added

    return(
        <>
          <Navigate to="/users/login" />
    
        </>
      
    )
}