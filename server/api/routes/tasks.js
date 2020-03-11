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

// Require task model
const Task = require('../models/tasks');

/**
  * Handles task GET request
  */
router.get('/', (req, res, next) => {
  // Get all tasks and log results/errors
  Task.find()
    .select("_id title content status level weight created updated completed createdBy assignmentHistory")
    .exec()
    .then( docs => {
      // Respond to success
      const response = {
        count: docs.length,
        tasks: docs.map(doc => {
          return {
            _id: doc._id,
            title: doc.title,
            content: doc.content,
            status: doc.status,
            level: doc.level,
            weight: 0,
            created: doc.created,
            updated: doc.updated,
            completed: doc.completed,
            createdBy: doc.createdBy,
            assignmentHistory: doc.assignmentHistory,
            request: {
              type: "GET",
              url: req.get('host') + '/api/tasks/' + doc._id
            }
          };
        })
      };
      res.status(200).json(response);
    })
    .catch( err => {
      // Log and respond to any errors
      console.log(err);
      res.status(500).json({ error: err });
    });
});

/**
  * Handles task POST request
  */
router.post('/', (req, res, next) => {
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
    .then( results => {
      // Respond to success
      res.status(201).json({
        createdTask: {
          _id: results._id,
          title: results.title,
          content: results.content,
          status: results.status,
          level: results.level,
          created: results.created,
          updated: results.updated,
          completed: results.completed,
          weight: results.weight,
          createdBy: results.createdBy,
          assignmentHistory: results.assignmentHistory,
          request: {
            type: "GET",
            url: req.get('host') + '/api/tasks/' + results._id
          }
        }
      });
    })
    .catch( err => {
      // Log and respond to any errors
      console.log(err);
      res.status(500).json({ error: err });
    });
});

/**
  * Handles task/taskId GET request (find-by-id)
  */
router.get('/:taskId', (req, res, next) => {
  const taskId = req.params.taskId;

  // Get one task by _id and log results/errors
  Task.findById(taskId)
    .select("_id title content status level weight created updated completed createdBy assignmentHistory")
    .exec()
    .then(doc => {
      // Respond to success and send appropriate response for number of results
      if (doc) {
        res.status(200).json({
          product: doc,
          request: {
            type: "GET",
            description: 'Get all tasks',
            url: req.get('host') + '/api/tasks/'
          }
        });
      } else {
        res.status(404).json({
          message: 'No valid entry found using provided ID'
        });
      }

    })
    .catch(err => {
      // Log and respond to any errors
      console.log(err);
      res.status(500).json({error: err});
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
    .then( results => {
      // Respond to success
      res.status(200).json({
        message: 'Task updates',
        request: {
          type: "GET",
          url: req.get('host') + '/api/tasks/' + taskId
        }
      });
    })
    .catch( err => {
      // Log and respond to any errors
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

/**
  * Handles task/taskId DELETE request
  */
router.delete('/:taskId', (req, res, next) => {
  const taskId = req.params.taskId;

  // Delete document with given task ID
  Task.remove({ _id: taskId })
    .exec()
    .then( results => {
      // Respond to success
      res.status(200).json({
        message: 'Task was deleted',
        request: {
          type: 'POST',
          url: req.get('host') + '/api/tasks/',
          body: {
            title: 'String',
            content: 'String',
            status: 'String',
            level: 'String',
            weight: 'Number',
            created: 'Date',
            updated: 'Date',
            completed: 'Date',
            createdBy: 'Object',
            assignmentHistory: '[Object]'
          }
        }
      });
    })
    .catch( err => {
      // Log and respond to any errors
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

// Export the router
module.exports = router;
