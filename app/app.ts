import express from 'express';
import cors from 'cors';
import userRouter from './modules/users/Routes';
import ApiError from './utils/Error-Handler/ApiError';
import httpStatus from 'http-status';
import errorHandler from './utils/Error-Handler/error-handler';

const app = express();

app.disable("x-powered-by"); // For security
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true, limit: '5mb' }));

app.use('/api/user', userRouter);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

app.use(errorHandler);


export default app;
