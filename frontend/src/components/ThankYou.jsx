import { Button, Container, Flex, Text, Title } from '@mantine/core'
import { IconCircleCheck, IconCircleX } from '@tabler/icons-react'
import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'

const ThankYou = () => {

  const hasRun = useRef();

  const [currentUser, setCurrentUser] = useState(JSON.parse(sessionStorage.getItem('user')));
  const { tutorid } = useParams();
  const location = useLocation();
  let params = new URLSearchParams(location.search);
  // console.log();
  // console.log(params.get('redirect_status'));
  // const navigate = useNavigate();

  const savePayment = async () => {
    const paymentDetails = await retrievePaymentIntent();
    const response = await fetch(`${import.meta.env.VITE_API_URL}/payment/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user: currentUser._id,
        tutor: tutorid,
        details: paymentDetails,
        intentId: params.get('payment_intent'),
        // hours: selHrs
      })
    });
    console.log(response.status);
    // const data = await response.json();
    // console.log(data);
  }

  const retrievePaymentIntent = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/retrieve-payment-intent`, {
      method: 'POST',
      body: JSON.stringify({ paymentIntentId: params.get('payment_intent') }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log(response.status);
    const data = await response.json();
    // console.log(data);
    return data;
  }

  useEffect(() => {
    if (!hasRun.current) {
      hasRun.current = true;
      if (params.get('redirect_status') === 'succeeded') {
        savePayment();
      }
    }
  }, [])


  return (
    <div>
      <Container size={'md'}>

        <Flex justify={'center'} align={'center'} style={{ height: '50vh' }} direction={'column'}>
          {
            params.get('redirect_status') === 'succeeded' ?
              <>
                <IconCircleCheck size={100} color={'green'} />
                <Title order={1}>Payment Succeeded</Title>
                <Text size='xl' mt={20}>Your Payment has been completed successfully</Text>
                <Button color='blue' mt={20} component={Link} to="/">Go to Home</Button>
              </>
              :
              <>
                <IconCircleX size={100} color={'red'} />
                <Title order={1}>Payment Failed</Title>
                <Text size='xl' mt={20}>Your Payment has failed</Text>
                <Button color='blue' mt={20} component={Link} to="/">Go to Home</Button>
              </>
          }
        </Flex>
      </Container>
    </div>
  )
}

export default ThankYou