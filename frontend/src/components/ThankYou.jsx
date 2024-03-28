import { Button, Container, Flex, Text, Title } from '@mantine/core'
import { IconCircleCheck } from '@tabler/icons-react'
import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'

const ThankYou = () => {

  const hasRun = useRef();

  const [currentUser, setCurrentUser] = useState(JSON.parse(sessionStorage.getItem('user')));
  const { tutorid } = useParams();
  const location = useLocation();
  let params = new URLSearchParams(location.search);
  console.log();
  console.log(params.get('redirect_status'));

  const savePayment = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/payment/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user: currentUser._id,
        tutor: tutorid,
        amount: tutorDetails.pricing * selHrs,
        hours: selHrs
      })
    });
    const data = await response.json();
    console.log(data);
  }

  const retrivePaymentIntent = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/payment/retrive/${params.get('payment_intent')}`);
    const data = await response.json();
    console.log(data);
  }

  useEffect(() => {
    if (!hasRun.current) {
      hasRun.current = true;
      if(params.get('redirect_status') === 'succeeded'){
        // savePayment(); 
        // retrivePaymentIntent();
      }
    }
  }, [])
  

  return (
    <div>
      <Container size={'md'}>

        <Flex justify={'center'} align={'center'} style={{ height: '50vh' }} direction={'column'}>
          <IconCircleCheck size={100} color={'green'} />
          <Title order={1}>Payment Succeeded</Title>
          <Text size='xl' mt={20}>Your Payment has been completed successfully</Text>
          <Button color='blue' mt={20} component={Link} to="/">Go to Home</Button>
        </Flex>
      </Container>
    </div>
  )
}

export default ThankYou