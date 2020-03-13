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
 * task schema w/ options
 */
const taskSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  }
});

/**
 * employee schema w/ options
 */
const employeeSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  empId: {
    type: Number,
    required: true,
    unique: true
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
    type: String
  },
  todo: [taskSchema],
  done: [taskSchema],
  doing: [taskSchema]
});

module.exports = mongoose.model('employee', employeeSchema);
