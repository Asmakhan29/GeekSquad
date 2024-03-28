import React, { useState } from 'react'

const PaymentHistory = () => {

    const [currentUser, setCurrentUser] = useState(JSON.parse(sessionStorage.getItem('user')));

    const [paymentData, setPaymentData] = useState([]);

    const fetchPaymentHistory = async () => {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/util/paymenthistory/${currentUser._id}`);
        const data = await response.json();
        console.log(data);
        setPaymentData(data);
    }

    const displayPaymentHistory = () => {
        
    }

  return (
    <div>PaymentHistory</div>
  )
}

export default PaymentHistory