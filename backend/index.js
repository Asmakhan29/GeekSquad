const express = require("express");
const cors = require("cors");

const userRouter = require("./routers/userRouter");
const tutorRouter = require("./routers/tutorRouter");
const utilRouter = require("./routers/util");
const app = express();


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
app.use(express.static('./static/uploads'));

app.get("/", (req, res) => {
  res.send("API Response");
});

app.listen(process.env.PORT, () => {
  console.info("Server Started>>");
});