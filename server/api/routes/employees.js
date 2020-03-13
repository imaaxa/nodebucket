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

// Variables
const employeeRoute = '/api/employees/';

/**
 * Handles employee GET request
 */
router.get('/', (req, res, next) => {
  // Get all employees and log results/errors
  Employee.find()
    .select("_id empId firstName lastName position email")
    .exec()
    .then( docs => {
      // Respond to success
      const response = {
        count: docs.length,
        employees: docs.map(doc => {
          return {
            _id: doc._id,
            empId: doc.empId,
            firstName: doc.firstName,
            lastName: doc.lastName,
            position: doc.position,
            email: doc.email,
            request: {
              type: "GET",
              url: req.get('host') + employeeRoute + doc._id
            }
          };
        })
      };
      res.status(200).json(response);
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
      // Respond to success
      res.status(200).json({
        createdEmployee: {
          _id: results._id,
          empId: results.empId,
          firstName: results.firstName,
          lastName: results.lastName,
          position: results.position,
          email: results.email,
          request: {
            type: "GET",
            url: req.get('host') + employeeRoute + results._id
          }
        }
      });
    })
    .catch( err => {
      // Log and respond to any errors
      res.status(500).json({ error: err});
    });
});

/**
 * Handles employee/employeeId GET request (find-by-id)
 */
router.get('/:employeeId', (req, res, next) => {
  const employeeId = req.params.employeeId;

  // Get one employee by _id and log results/errors
  Employee.find({"empId": employeeId})
    .select("_id empId firstName lastName position email")
    .exec()
    .then(doc => {
      // Respond to success and send appropriate response for number of results
      if (doc) {
        res.status(200).json({
          product: doc,
          request: {
            type: "GET",
            description: 'Get all employees',
            url: req.get('host') + employeeRoute
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
  Employee.update({ empId: employeeId }, { $set: updateValues })
    .exec()
    .then(results => {
      // Respond to success
      res.status(200).json({
        message: 'Employee updated',
        request: {
          type: "GET",
          url: req.get('host') + employeeRoute + employeeId
        }
      });
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
  Employee.remove({ empId: taskId })
    .exec()
    .then(results => {
      // Respond to success
      res.status(200).json({
        message: 'Employee was deleted',
        request: {
          type: 'POST',
          url: req.get('host') + employeeRoute,
          body: {
            empId: 'Number',
            firstName: 'String',
            lastName: 'String',
            position: 'String',
            email: 'String'
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

module.exports = router;
