const express = require("express");
const cors = require("cors");
require("dotenv").config();

const userRouter = require("./routers/userRouter");
const tutorRouter = require("./routers/tutorRouter");
const feedbackRouter = require("./routers/feedbackRouter");
const reviewRouter = require("./routers/reviewRouter");
const utilRouter = require("./routers/util");


const app = express();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// middlewares
app.use(
  cors({
    origin: ["http://localhost:5173"],
  })
);

app.use(express.json());

app.use("/user", userRouter);
app.use("/util", utilRouter);
app.use("/tutor", tutorRouter);
app.use("/feedback", feedbackRouter);
app.use("/review", reviewRouter);
app.use(express.static('./static/uploads'));

app.get("/", (req, res) => {
  res.send("API Response");
});

app.post('/create-payment-intent', async (req, res) => {
  const { amount } = req.body;
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount * 100,
    currency: 'inr'
  });
  res.json({
    clientSecret: paymentIntent.client_secret
  });
});

app.listen(process.env.PORT, () => {
  console.info("Server Started>>");
});