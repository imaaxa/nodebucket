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
    default: 'todo'
  },
  level: {
    type: String,
    default: 'normal'
  },
  created: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date,
    default: Date.now
  },
  completed: {
    type: Date
  },
  weight: {
    type: Number,
    default: "0",
    min: 0
  },
  createdBy: {
    type: String
  },
  assignmentHistory: {
    type: [Object]
  }
});

module.exports = mongoose.model('Task', taskSchema);
