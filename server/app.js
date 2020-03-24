/*============================================;
Title: Node Bucket
Author: Cory Gilliam
Date:  March 2020;
Modified By:
Description: Web 450 Capstone Project.
===========================================*/

/**
 * Require statements
 */
const express     = require('express');
const http        = require('http');
const morgan      = require('morgan');
const bodyParser  = require('body-parser');
const path        = require('path');
const mongoose    = require('mongoose');
const jwt         = require('jsonwebtoken');

// Require configuration variables
const options = require('./options');

/**
 * App configurations
 */
let app = express();

// Set header parameters (C.O.R.S. error handling)
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Content-Security-Policy", "img-src 'self'");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended': true}));
app.use(morgan('dev'));

if (!options.storageConfig.serv.DEV) {
  app.use(express.static(path.join(__dirname, '../dist/nodebucket')));
  app.use('/', express.static(path.join(__dirname, '../dist/nodebucket')));
}

/**
 * Variables
 */
const port = 3000; // server port
const dbURI = "mongodb+srv://" +
  options.storageConfig.env.MONGO_ATLAS_NAME +
  ":" +
  options.storageConfig.env.MONGO_ATLAS_PW +
  "@buwebdev-cluster-1-3umfh.mongodb.net/" +
  options.storageConfig.env.MONGO_ATLAS_TABLE +
  "?retryWrites=true&w=majority";// Database connection string

/**
 * Database connection
 */
mongoose.connect(dbURI, {
    promiseLibrary: require('bluebird'),
    useUnifiedTopology: true,
    useNewUrlParser: true
  }).then(() => {
    console.debug(`Connection to the database instance was successful`);
  }).catch(err => {
    console.log(`MongoDB FN Error: ${err.message}`);
}); // end mongoose connection

/**
 * API(s)
 */
const employeeRoutes = require('./api/routes/employees');

app.use('/api/employees', employeeRoutes);

// Set an error if no path is found
app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

// Respond to all errors
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

/**
 * Create and start server
 */
http.createServer(app).listen(port, function() {
  console.log(`Application started and listening on port: ${port}`);
}); // end http create server function
