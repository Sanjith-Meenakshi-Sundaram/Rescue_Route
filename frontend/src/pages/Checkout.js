import React, { useEffect } from 'react';

const Checkout = () => {
  // Function to load the Razorpay script
  const loadRazorpay = () => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => initiatePayment();  // Initiate payment after script loads
    document.body.appendChild(script);
  };

  // Function to initiate the Razorpay payment
  const initiatePayment = () => {
    const options = {
      key: "YOUR_RAZORPAY_KEY", // Replace with your Razorpay key
      amount: 50000, // Amount in paise (50000 paise = 500 INR)
      currency: 'INR',
      name: 'Test Payment',
      description: 'Test Transaction',
      image: 'https://example.com/logo.png',
      handler: function (response) {
        alert("Payment Successful");
        console.log(response);
      },
      prefill: {
        name: "John Doe",
        email: "john.doe@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#F37254",
      },
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  // Load Razorpay script on component mount
  useEffect(() => {
    loadRazorpay();
  }, []);

  return (
    <div>
      <button onClick={initiatePayment}>Pay Now</button>
    </div>
  );
};

export default Checkout;
