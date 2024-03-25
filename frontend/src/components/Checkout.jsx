import { loadStripe } from '@stripe/stripe-js';
import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import PaymentGateway from './PaymentGateway';
import { Elements } from '@stripe/react-stripe-js';
import { Box, Container } from '@mantine/core';

const appearance = {
    theme: 'night'
};

const Checkout = () => {

    const hasRun = useRef(false);
    const stripePromise = loadStripe('pk_test_Vmvhpm2TASsGcgF4RcyQfkF000KwucQJR1');
    console.log(stripePromise);
    const [clientSecret, setClientSecret] = useState('');
    // const [ stripePromise, setStripePromise ] = useState(null);

    const getPaymentIntent = async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/create-payment-intent`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ amount: 747.68 })
        });
        const data = await res.json();
        console.log(data);
        setClientSecret(data.clientSecret);
    }

    useEffect(() => {
        if (!hasRun.current) {
            getPaymentIntent();
            hasRun.current = true;
        } else {
            hasRun.current = false;
        }
    }, [])

    return (
        <Box>
            <Container size={'lg'}>
                {
                    clientSecret && (
                        <Elements stripe={stripePromise} options={{
                            clientSecret,
                            appearance
                        }}>
                            <PaymentGateway />
                        </Elements>
                    )
                }
            </Container>
        </Box>
    )
}

export default Checkout