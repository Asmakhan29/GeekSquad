import { Button, TextInput, Title } from '@mantine/core';
import { enqueueSnackbar } from 'notistack';
import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const UserAuthenticate = ({closeModal}) => {

  const emailRef = useRef(null);
  const otpRef = useRef(null);

  const [otpSent, setOtpSent] = useState(false);

  const navigate = useNavigate();

  const sendOTP = async () => {
    // loginUser();
    // return;
    const res = await fetch(`${import.meta.env.VITE_API_URL}/util/sendotp`, {
      method: 'POST',
      body: JSON.stringify({ email: emailRef.current.value }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log(res.status);
    if (res.status === 201) {
      setOtpSent(true);
    }
  }

  const verifyOTP = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/util/verifyotp/${emailRef.current.value}/${otpRef.current.value}`);
    console.log(res.status);
    if(res.status === 200){
      authenticateUser();
    }
  }

  const authenticateUser = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/user/getbyemail/${emailRef.current.value}`);
    console.log(res.status);
    if (res.status === 200) {
      // perform login
      const data = await res.json();
      sessionStorage.setItem('user', JSON.stringify(data));
      enqueueSnackbar('Logged In Successfully', { variant: 'success' });
      navigate('/browse');
      closeModal();

    } else if (res.status === 404) {
      // perform signup
      addUser();
    }
  }

  const addUser = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/user/add`, {
      method: 'POST',
      body: JSON.stringify({ email: emailRef.current.value }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log(res.status);
    if (res.status === 200) {
      const data = await res.json();
      sessionStorage.setItem('user', JSON.stringify(data));
      enqueueSnackbar('Registered Successfully', { variant: 'success' });
      navigate('/browse');
      closeModal();
    }
  }

  return (
    <div>
      <div className='px-20 py-10'>
        <Title order={2} align="center" mb={20}>Welcome to GeekSquad!</Title>
        <Title order={3} align="center" mb={20}>Login In Or Sign Up</Title>

        <TextInput label="Email address" placeholder="user@mail.com" mt="md" size="md" ref={emailRef} />
        <Button
          fullWidth
          mt={20}
          onClick={sendOTP}
          type="submit"
        >
          Send OTP
        </Button>
        {
          otpSent &&
          (
            <>
              <TextInput label="Enter OTP recieved on your mail" placeholder="XXXXXX" mt="md" size="md" ref={otpRef} />
              <Button
                fullWidth
                mt={20}
                onClick={verifyOTP}
                type="submit"
              >
                Continue
              </Button>
            </>
          )
        }



        <p className='text-center mt-5'>
          To continue, you must be 18 or older. You agree to the TakeLessons <Link to="/">Terms of Use</Link> and acknowledge our
          <Link to="/">Privacy Policy</Link>
          . Note that you may receive SMS related to your activities on your phone.
          This site is protected by hCaptcha and its
          <Link to="/">Privacy Policy</Link>
          and
          <Link to="/">Terms of Service</Link>
          apply.
        </p>

      </div>
    </div>
  )
}

export default UserAuthenticate;