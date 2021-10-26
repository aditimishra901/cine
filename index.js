require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const userRoute = require("./routes/user");
const adminRoute = require("./routes/admin");
const questionRoute = require("./routes/question");
const allRoute = require("./routes/getAllQuestions");
const SubmitQuestion = require('./routes/submitQuestion');
const loginRoute = require("./routes/login");
const jwt = require('jsonwebtoken');
const {verifyToken} = require("./routes/verifytoken");
const app = express();

mongoose
  .connect(process.env.MONGO_URL, {})
  .then(() => {
    console.log(`connection successful`);
  })
  .catch((e) => {
    console.log(e);
  });

//Middleware
app.use(express.json());
app.use("/api/users", userRoute);
app.use("/api/questions",  questionRoute);
app.use("/api/admin", adminRoute);
app.use("/api/candidate", allRoute);
app.use("/api/submit",SubmitQuestion);
app.use("/api/login",loginRoute);


// app.get("/testing", verifyToken, (req,res) => {
//   res.json("authenticated");
// })

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8800;
}
app.listen(port, () => {
  console.log("Backend Server is running at 8800");
});
