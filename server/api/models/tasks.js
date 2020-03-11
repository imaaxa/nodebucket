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
const taskSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: [true, 'todo']
  },
  level: {
    type: String,
    required: [true, 'normal']
  },
  created: {
    type: Date,
    required: [true, Date.now]
  },
  updated: {
    type: Date,
    required: [true, Date.now]
  },
  completed: {
    type: Date,
    required: [true, Date.now]
  },
  weight: {
    type: Number,
    required: [true, 0],
    min: 0
  },
  createdBy: {
    Object
  },
  assignmentHistory: {
    type: [Object]
  }
});

module.exports = mongoose.model('Task', taskSchema);
