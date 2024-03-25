import React, { createContext, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const UserContext = createContext();

export const UserProvider = ({children}) => {
  
    const navigate = useNavigate();

    const [currentUser, setCurrentUser] = useState(JSON.parse(sessionStorage.getItem('user')));

    const [loggedIn, setLoggedIn] = useState(currentUser !== null);

    const logout = () => {
        sessionStorage.removeItem('user');
        setCurrentUser(null);
        setLoggedIn(false);
        navigate('/');
    }

    return (
        <UserContext.Provider value={{
            currentUser,
            setCurrentUser,
            loggedIn,
            setLoggedIn,
            logout
        }}>
            {children}
        </UserContext.Provider>
    );

}

const useUserContext = () => useContext(UserContext);
export default useUserContext;