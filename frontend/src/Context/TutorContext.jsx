import React, { createContext, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const TutorContext = createContext();

export const TutorProvider = ({children}) => {
    
    const navigate = useNavigate();

    const [currentTutor, setCurrentTutor] = useState(JSON.parse(sessionStorage.getItem('tutor')));

    const [tutorLoggedIn, setTutorLoggedIn] = useState(currentTutor !== null);

    const tutorLogout = () => {
        sessionStorage.removeItem('tutor');
        setCurrentTutor(null);
        setTutorLoggedIn(false);
        navigate('/');
    }

    return (
        <TutorContext.Provider value={{
            currentTutor,
            setCurrentTutor,
            tutorLoggedIn,
            setTutorLoggedIn,
            tutorLogout
        }}>
            {children}
        </TutorContext.Provider>
    );

}

const useTutorContext = () => useContext(TutorContext);
export default useTutorContext;