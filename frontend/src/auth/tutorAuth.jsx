import { enqueueSnackbar } from 'notistack';
import React, { useEffect, useRef, useState } from 'react'
import { Navigate } from 'react-router-dom';

const TutorAuthoriser = ({ children }) => {
  const hasRun = useRef(false);

  const [currentUser, setCurrentUser] = useState(JSON.parse(sessionStorage.getItem('tutor')));

  useEffect(() => {
    if (currentUser === null && !hasRun.current) {
      // console.log('ok');
      enqueueSnackbar('Login as Tutor to Continue', { variant: 'error' });
      hasRun.current = true;
    } else if (currentUser !== null) {
      hasRun.current = false;
    }
  }, [currentUser]);



  if (currentUser !== null) {
    return children;
  }

  return <Navigate to="/home" />
}

export default TutorAuthoriser