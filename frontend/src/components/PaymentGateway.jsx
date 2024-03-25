import React from 'react';
import { ElementsConsumer, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { Button, Title } from '@mantine/core';

const PaymentGateway = () => {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        // We don't want to let default form submission happen here,
        // which would refresh the page.
        event.preventDefault();



        if (!stripe || !elements) {
            console.log('stripe not loaded');
            // Stripe.js hasn't yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        const result = await stripe.confirmPayment({
            //`Elements` instance that was used to create the Payment Element
            elements,
            confirmParams: {
                return_url: "http://localhost:3000/thankyou",
            },
        });

        if (result.error) {
            // Show error to your customer (for example, payment details incomplete)
            console.log(result.error.message);
        } else {
            // Your customer will be redirected to your `return_url`. For some payment
            // methods like iDEAL, your customer will be redirected to an intermediate
            // site first to authorize the payment, then redirected to the `return_url`.
        }
    };

    return (
        <div>

            <form onSubmit={handleSubmit}>
                <Title order={3} my={30} mx="auto">Payment Gateway</Title>
                <PaymentElement />
                <Button disabled={!stripe} type="submit" variant='filled' mt={20}>Submit</Button>
            </form>
        </div>
    )
}

export default PaymentGateway