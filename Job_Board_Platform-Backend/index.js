require('dotenv').config()
const express = require('express');
const cors = require('cors')
const app = express();
const cookieParser = require('cookie-parser');
const port = 3000;
const connectDB = require('./config/db');
connectDB();

const userRoute = require('./routes/userRoute');
const employerRoute = require('./routes/employerRoute');
const jobRout = require('./routes/jobRoute');
const applicationRoute = require('./routes/applicationRoute');
const userAuthRoute = require('./routes/userAuthRoute');
const employerAuthRoute = require('./routes/employerAuthRoute');
const companyRoute = require('./routes/companyRoute');
const saveJobRoute = require('./routes/saveJobRoute');
const multer = require('multer');

let allowedOrigins = [];
if (process.env.ENVIRONMENT === 'development') {
  allowedOrigins = [`http://localhost:5174`];
} else if (process.env.ENVIRONMENT === 'production') {
  allowedOrigins = [`https://job-portal-h322.vercel.app`];
}

app.use(cors({
  credentials: true,
  origin: allowedOrigins
}))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/users', userRoute);
app.use('/employers', employerRoute);
app.use('/jobs', jobRout);
app.use('/applications', applicationRoute);
app.use('/user/auth', userAuthRoute);
app.use('/employer/auth', employerAuthRoute);
app.use('/companies', companyRoute);
app.use('/saveJob', saveJobRoute);
app.use((err, req, res, next) => {
  console.log(err)
  const { code, message } = err
  res.status(code).json({
    success: false,
    message: message
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})

app.get('/', (req, res) => {
  res.send('Server started')
})