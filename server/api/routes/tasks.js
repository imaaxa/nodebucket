/*============================================;
Title: Node Bucket
Author: Cory Gilliam
Date:  March 2020;
Modified By:
Description: Web 450 Capstone Project.
===========================================*/

// Requires
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Task = require('../models/tasks');

/**
  * Handles task GET request
  */
router.get('/', (req, res, next) => {
  Task.find()
    .exec()
    .then( docs => {
      console.log(docs);
      res.status(200).json(docs);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

/**
  * Handles task POST request
  */
router.post('/', (req, res, next) => {
  /* ToDo: use the employee schema for
    createdBy, assignmentHistory entries */

  // Create a new task with the Task schema
  const task = new Task({
    _id: new mongoose.Types.ObjectId(),
    title:     req.body.title,
    content:   req.body.content,
    status:    req.body.status,
    level:     req.body.level,
    created:   req.body.created,
    updated:   req.body.updated,
    completed: req.body.completed,
    weight:    req.body.weight,
    createdBy: req.body.createdBy,
    assignmentHistory: req.body.assignmentHistory
  });

  // Save the new task and log results/error
  task
    .save()
    .then( result => {
      // log the results
      console.log(result);

      // Send status code and message
      res.status(201).json({
        message: 'Handling POST requests to tasks.',
        createTask: task
      });
    })
    .catch( err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

/**
  * Handles task/taskId GET request (find-by-id)
  */
router.get('/:taskId', (req, res, next) => {
  const taskId = req.params.taskId;

  Task.findById(taskId)
    .exec()
    .then(doc => {
      console.log('From database', doc);
      if (doc) {
        res.status(200).json(doc);
      } else {
        res.status(404).json({
          message: 'No valid entry found using provided ID'
        });
      }

    })
    .catch(error => {
      console.log(error);
      res.status(500).json({error: error});
    });
});

/**
  * Handles task/taskId PATCH request
  */
router.patch('/:taskId', (req, res, next) => {
  const taskId = req.params.taskId;

  /*
    Example body of a patch request:
      [{
        "propName": "level",
        "value": "low"
      }, {
        "propName": "weight",
        "value": "5"
      }]
  */
  // Build new property object array
  const updateValues = {};
  for ( const item of req.body ) {
    updateValues[item.propName] = item.value;
  }

  // Update document with given task ID
  Task.update({ _id: taskId }, { $set: updateValues })
    .exec()
    .then( result => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch( err => {
      console.log(err);
      res.status(500).json({
        error: err
      })
    });
});

/**
  * Handles task/taskId DELETE request (find-by-id)
  */
router.delete('/:taskId', (req, res, next) => {
  const taskId = req.params.taskId;

  // Delete document with given task ID
  Task.remove({ _id: taskId })
    .exec()
    .then( result => {
      res.status(200).json( result );
    })
    .catch( err => {
      console.log(err);
      res.status(500).json({
        error: err
      })
    });
});

// Export the router
module.exports = router;
