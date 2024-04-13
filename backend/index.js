const express = require("express");
const cors = require("cors");
const { createServer } = require("http");
const { Server } = require("socket.io");

const connectedUsers = {};

require("dotenv").config();

const userRouter = require("./routers/userRouter");
const tutorRouter = require("./routers/tutorRouter");
const feedbackRouter = require("./routers/feedbackRouter");
const reviewRouter = require("./routers/reviewRouter");
const paymentRouter = require("./routers/paymentRouter");
const utilRouter = require("./routers/util");


const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});
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
app.use("/payment", paymentRouter);
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

app.post('/retrieve-payment-intent', async (req, res) => {
  const { paymentIntentId } = req.body;
  const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
  res.json(paymentIntent);
});

io.on("connection", (socket) => {
  console.log("User Connected", socket.id);


  socket.on("connect-user", (id) => {
    connectedUsers[id] = socket.id;
    console.log(connectedUsers);
  })

  socket.on("send-message", ({ senderData, message }) => {
    console.log({ senderData, message });
    socket.broadcast.emit("rec-message", {senderData, message});
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

httpServer.listen(process.env.PORT, () => {
  console.info("Server Started>>");
});