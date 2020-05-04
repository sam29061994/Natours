// Express frame work to maintain request response cycle
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

// Importing the router from router module
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');

const app = express();

//Set security HTTP headers
app.use(helmet());

//Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//Limit requests from same api
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour'
});
app.use('/api', limiter);

// Body parser, reading data from body into req.body with 10kb limit
app.use(express.json({ limit: '10kb' }));

//Data sanitization agains NOSQL query injection
app.use(mongoSanitize());

//Data sanitization against XSS / melacious HTML/JS code
//Mongoose has pretty good protection against XSS cross site scripting
app.use(xss());

//Prevent parameter pollution removes duplicate parameters
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'maxGroupSize',
      'difficulty',
      'price'
    ]
  })
);

//Serving static files
app.use(express.static(`${__dirname}/public`));

//Custom test middle ware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// Add routs to the app
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);

app.all('*', (req, res, next) => {
  // const err = new Error(`Can not find ${req.originalUrl} on this server`);
  // err.status = 'not Found';
  // err.statusCode = 404;
  next(new AppError(`Can not find ${req.originalUrl} on this server`, 404));
});

//Error handling middleware
app.use(globalErrorHandler);

//Export the app instance to server
module.exports = app;
