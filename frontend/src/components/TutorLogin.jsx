import { Anchor, Button, PasswordInput, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { enqueueSnackbar } from 'notistack';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import useTutorContext from '../Context/TutorContext';

const TutorLogin = ({closeModal}) => {

  const navigate = useNavigate();
  const { setTutorLoggedIn, setCurrentTutor } = useTutorContext();

  const form = useForm({
    initialValues: {
      email: '',
      password: ''
    },
    validate: {
      email: (value) => !/^\S+@\S+$/.test(value),
      password: (value) => value.length < 3
    },
  });

  const submitForm = async (values) => {
    console.log(values);
    const res = await fetch('http://localhost:5000/tutor/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    })

    if (res.status === 200) {
      enqueueSnackbar('Loggedin successfully', { variant: 'success' });

      const data = await res.json();
      console.log(data);
      sessionStorage.setItem('tutor', JSON.stringify(data));
      setTutorLoggedIn(true);
      setCurrentTutor(data);
      navigate('/tutorprofile');
      closeModal();
    } else {
      enqueueSnackbar('Error registering', { variant: 'error' });
    }

  }

  return (
    <>
      <form onSubmit={form.onSubmit(submitForm)}>
        <TextInput label="Email address" type='email' placeholder="hello@gmail.com" mt="md" size="md" {...form.getInputProps('email')} />
        <PasswordInput
          size="md"
          placeholder="Your password"
          label="Password"
          type='password'
          {...form.getInputProps('password')}
        />

        <Button type='submit' fullWidth mt="xl" size="md">
          Login
        </Button>
      </form>

      <Text ta="center" mt="md">
        Don&apos;t have an account?{' '}
        <Anchor href="#" fw={700} onClick={(event) => event.preventDefault()}>
          Register
        </Anchor>
      </Text>
    </>
  )
}

export default TutorLogin;