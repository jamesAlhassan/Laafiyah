require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');

// extra packages
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cookieParser());

// connect DB
const mongoose = require('mongoose');

// routers and auth
const authRouter = require('./routes/auth.route');
const patientRouter = require('./routes/patient.route');
const doctorRouter = require('./routes/doctor.route');
const appointmentRouter = require('./routes/appointment.route');
const reviewRouter = require('./routes/review.route');

// middlewares 
const notFoundMiddleWare = require('./middleware/not-found.middleware');
const errorHandlerMiddleware = require('./middleware/error-handler.middleware');
const authMiddleware = require('./middleware/auth.middleware');

// routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/patient', authMiddleware, patientRouter)
app.use('/api/v1/doctor', authMiddleware, doctorRouter)
app.use('/api/v1/appointment', authMiddleware, appointmentRouter)
app.use('/api/v1/review', authMiddleware, reviewRouter);
app.use(notFoundMiddleWare);
app.use(errorHandlerMiddleware);

// start mongo and listen on the server
const port = process.env.PORT || 3000;
const start = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true }).then(console.log('CONNECTED TO MONGO DB'));
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}...`);
        });
    } catch (error) {
        console.log(error);
    }
};

start();