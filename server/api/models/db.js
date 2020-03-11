/*============================================;
Title: Node Bucket
Author: Simon Holmes, Clive Harber
(Getting Man with Mongo, Express, Angular, and Node 2nd p.127)
Date:  March 2020;
Modified By: Cory Gilliam
Description: Web 450 Capstone Project.
===========================================*/

/**
 * Requirements
 */
const mongoose = require('mongoose');

// Database connection variables
const dbProt = 'mongodb+srv://';
const dbUser = 'nodeBucketApp';
const dbPass = process.env.MONGO_ATLAS_PW;
const dbAddr = 'buwebdev-cluster-1-3umfh.mongodb.net';
const dbName = 'nodebucket';
const dbPara = '?retryWrites=true&w=majority';

//const dbURI = dbProt + dbUser + ':' + dbPass + '@' + dbAddr + '/' + dbName + dbPara
const dbURI = "mongodb+srv://nodeBucketApp:Zzxcvbnm@buwebdev-cluster-1-3umfh.mongodb.net/test?retryWrites=true&w=majority";

// Connect to the DB
mongoose.connect(dbURI, {useNewUrlParser: true});

// Log db connection success
mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to ${dbURI}');
});

// Log db connection error
mongoose.connection.on('error', err => {
  console.log('Mongoose connection error: ${err}');
});

// Log db disconnection success
mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

/**
 * gracefulShutdown - used to terminate db connections
 * @param {Message to use with the log} msg
 * @param {db connection to shut down} callback
 */
const gracefulShutdown = (msg, callback) => {
  mongoose.connection.close( () => {
    console.log('Mongoose disconnected through ${msg}');
    callback();
  });
};

// For nodemon restarts
process.once('SIGUSR2',() => {
  gracefulShutdown('nodemon restart', () => {
    process.kill(process.pid, 'SIGISR2');
  });
});

// For app termination
process.on('SIGINT', () => {
  gracefulShutdown('app termination', () => {
    process.exit(0);
  });
});

// For Heroku app termination
process.on('SIGTERM', () => {
  gracefulShutdown('Heroku app shutdown', () => {
    process.exit(0);
  });
});
