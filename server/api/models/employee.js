/*============================================;
Title: Node Bucket
Author: Cory Gilliam
Date:  March 2020;
Modified By:
Description: Web 450 Capstone Project.
===========================================*/

/**
 * Requirements
 */
const mongoose = require('mongoose');

/**
 * employee schema w/ options
 */
const employeeSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  empId: {
    type: Number,
    required: true, unique: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  position: {
    type: String,
    default: 'authUser'
  },
  email: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('employee', employeeSchema);
