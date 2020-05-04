const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', err => {
  console.log(`uncaught Exception`);
  console.log(`${err.name} ${err.message}`);
  process.exit(1);
});

//Config file for env variables
dotenv.config({ path: './config.env' });
const app = require('./app');
// console.log(process.env);
const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => console.log(`Connection is successful`));

//Start Server
const server = app.listen(process.env.PORT, () => {
  console.log(`Server listening on port: ${process.env.PORT}`);
});

process.on('unhandledRejection', err => {
  console.log(`Unhandled Rejection`);
  console.log(err);
  server.close(() => process.exit(1));
});
