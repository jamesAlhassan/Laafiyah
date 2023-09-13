require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();

// extra packages
app.use(express.json());

// connect DB
const mongoose = require('mongoose');

// routers
const patientRouter = require('./routes/patient.route');
const doctorRouter = require('./routes/doctor.route');

// error handler
const notFoundMiddleWare = require('./middleware/notFound.middleware');
const errorHandlerMiddleware = require('./middleware/errorHandler.middleware');

// routes
app.use('/api/v1/patient', patientRouter)
app.use('/api/v1/doctor', doctorRouter)
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