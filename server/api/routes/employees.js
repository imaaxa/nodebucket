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

// Require employee model
const Employee = require('../models/employee');

/**
 * Handles employee GET request
 */
router.get('/', (req, res, next) => {
  // Get all employees and log results/errors
  Employee.find()
    .exec()
    .then( docs => {
      // Log and respond to success
      console.log(docs);
      res.status(200).json(docs);
    })
    .catch( err => {
      // Log and respond to any errors
      console.log(err);
      res.status(500).json({ error: err});
    });
});

/**
 * Handles employee POST request
 */
router.post('/', (req, res, next) => {
  // Create a new task with the Employee schema
  const employee = new Employee({
    _id: new mongoose.Types.ObjectId(),
    empId:     req.body.empId,
    firstName: req.body.firstName,
    lastName:  req.body.lastName,
    position:  req.body.position,
    email:     req.body.email
  });

  // Save the new employee and log results/error
  employee
    .save()
    .then( results => {
      // Log and respond to success
      console.log(results);
      res.status(200).json({
        createEmployee: employee
      });
    })
    .catch( err => {
      // Log and respond to any errors
      console.log(err);
      res.status(500).json({ error: err});
    });
});

/**
 * Handles employee/employeeId GET request (find-by-id)
 */
router.get('/:employeeId', (req, res, next) => {
  const employeeId = req.params.employeeId;

  // Get one employee by _id and log results/errors
  Employee.findById(employeeId)
    .exec()
    .then(doc => {
      // Log and respond to success
      console.log('From database', doc);
      // Send appropriate response for number of results
      if (doc) {
        res.status(200).json(doc);
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
 * Handles employee/employeeId PATCH request
 */
router.patch('/:employeeId', (req, res, next) => {
  const employeeId = req.params.employeeId;

  /*
    Example body of a patch request:
    [{
      "propName": "position",
      "value": "authUser"
    }, {
      "propName": "empId",
      "value": "2095"
    }]
  */
  // Build new property object array
  const updateValues = {};
  for ( const item of req.body ) {
    updateValues[item.propName] = item.value;
  }

  // Update document with given employee ID
  Employee.update({ _id: employeeId }, { $set: updateValues })
    .exec()
    .then(results => {
      // Log and respond to success
      console.log(results);
      res.status(200).json(results);
    })
    .catch(err => {
      // Log and respond to any errors
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

/**
 * Handles employee/employeeId DELETE request
 */
router.delete('/:employeeId', (req, res, next) => {
  const taskId = req.params.employeeId;

  // Delete document with given employee ID
  Employee.remove({ _id: taskId })
    .exec()
    .then( results => {
      // Log and respond to success
      console.log(results);
      res.status(200).json(results);
    })
    .catch( err => {
      // Log and respond to any errors
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;
