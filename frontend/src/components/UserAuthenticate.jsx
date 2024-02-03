import React, { useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const UserAuthenticate = () => {

  const emailRef = useRef(null);
  const otpRef = useRef(null);

  const navigate = useNavigate();

  const sendOTP = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/util/sendotp`, {
      method: 'POST',
      body: JSON.stringify({ email: emailRef.current.value }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log(res.status);
  }

  const verifyOTP = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/util/verifyotp/${emailRef.current.value}/${otpRef.current.value}`);
    console.log(res.status);
  }

  const addUser = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/tutor/add`, {
      method: 'POST',
      body: JSON.stringify({ email: emailRef.current.value }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log(res.status);
    if (res.status === 200) {
      navigate('/tutorprofile');
    }
  }

  return (
    <div>
      <div className='px-20 py-10'>
        <h4 className="text-center mt-4">Logo Here</h4>
        <h2 className='text-2xl font-semibold text-center mt-3'>Login In Or Sign Up</h2>

        <div className="mt-2">
          <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
            <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">  +91</span>
            <input
              type="text"
              ref={emailRef}
              className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
              placeholder="Enter mobile number or email address"
            />
          </div>
        </div>
        <div className="relative flex gap-x-3 mt-3">
          <div className="flex h-6 items-center">
            <input
              id="comments"
              name="comments"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
            />
          </div>
          <div className="text-sm leading-6">
            <label htmlFor="comments" className="font-medium text-gray-900">
              Remeber me
            </label>
          </div>
        </div>
        <button
        onClick={addUser}
          type="submit"
          className="mt-5 flex w-full justify-center rounded-3xl bg-indigo-600 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Continue
        </button>

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