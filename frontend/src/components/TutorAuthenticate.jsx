import React, { useState } from 'react'
import TutorLogin from './TutorLogin'
import TutorRegister from './TutorRegister'
import { Paper, SegmentedControl, Title } from '@mantine/core';

const TutorAuthenticate = ({closeModal}) => {
  const [selForm, setSelForm] = useState('Login');
  return (
    <Paper radius={0} p={30}>
      <Title order={2} ta="center" mt="md" mb={50}>
        Welcome back to GeekSquad!
      </Title>
      <SegmentedControl fullWidth mb={'lg'} onChange={v => { setSelForm(v) }} color="violet" value={selForm} data={['Create Account', 'Login']} />
      {
        selForm === 'Login' ? <TutorLogin closeModal={closeModal} /> : <TutorRegister setPage={setSelForm} />
      }
    </Paper>
  )
}

export default TutorAuthenticate;