/*============================================;
Title: Node Bucket
Author: Cory Gilliam
Date:  March 2020;
Modified By:
Description: Employee API responce handlers.
===========================================*/

// Requires
const checkAuth = require('../../check-auth');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

// Require employee model
const Employee = require('../models/employee');

// Variables
const employeeRoute = '/api/employees/';

/**************************************************
 * Employee Requests
 **************************************************/

/**
 * Handles GET request: employees
 */
router.get('/', (req, res, next) => {
  // Get all employees and log results/errors
  Employee.find()
    .select('empId firstName lastName todo done')
    .exec()
    .then(employee => {
      if (employee !== null) {
        // Handle employee data being returned
        res.status(200).json(employee);
      } else {
        // Handle no employee data returned
        res.status(404).json('No employees were found.');
      }
    })
    .catch(err => {
      // Log and respond to DB errors
      res.status(500).json(err);
    });
});

/**
 * Handles GET request: employees / employeeId
 */
router.get('/:employeeId', (req, res, next) => {
  const employeeId = req.params.employeeId;

  // Get one employee by _id and log results/errors
  Employee.findOne({empId: employeeId}, 'empId firstName lastName todo done', function(err, employee) {
    if (err) {
      res.status(500).json(err);
    } else {
      if (employee !== null) {
        // Handle employee data being returned
        res.status(200).json(employee);
      } else {
        // Handle no employee data returned
        res.status(404).json('No employee with that ID.');
      }
    }
  });
});

/**
 * Handles POST request: employees
 */
router.post('/', checkAuth, (req, res, next) => {
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
  employee.save(function(err, employee) {
    if (err) {
      // Log and respond to DB errors
      res.status(500).json({ error: err});
    } else {
      if (employee !== null) {
        // Handle employee data being returned
        res.status(200).json(employee);
      } else {
        // Log and respond to DB errors
        res.status(404).json('No data was saved.');
      }
    }
  });
});

/**
 * Handles PATCH request: employees / employeeId
 */
router.patch('/:employeeId', checkAuth, (req, res, next) => {
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
  for( const item of req.body) {
    updateValues[item.propName] = item.value;
  }

  // Update document with given employee ID
  Employee.update({empId: employeeId}, {$set: updateValues})
    .exec()
    .then(results => {
      // Respond to success
      res.status(200).json(results);
    })
    .catch(err => {
      // Log and respond to DB errors
      res.status(500).json(err);
    });
});

/**
 * Handles DELETE request: employees / employeeId
 */
router.delete('/:employeeId', checkAuth, (req, res, next) => {
  const employeeId = req.params.employeeId;

  // Get employee data for employeeId given
  Employee.findOne({empId: employeeId}, '_id', function(err, employee) {
    if (err) {
      // Log and respond to DB errors
      return next(err);
    } else {
      // Check if employee data was returned
      if (employee !== null) {
        // Handle employee data being returned
        employee.remove(function (err, employee) {
          if (err) {
            // Log and respond to DB errors
            return next(err);
          } else {
            // Log and respond to success
            res.status(200).json('Employee record has been deleted.');
          }
        });
      } else {
        // Handle no employee data returned
        res.status(200).json('Employee could not be found. Employee not removed');
      }
    }
  });
});

/**************************************************
 * Task Authentication
 **************************************************/

/**
 * Handles GET request: employees / login / employeeId
 */
router.get('/login/:employeeId/', (req, res, next) => {
  const employeeId = req.params.employeeId;

  // Find employee by empId
  Employee.findOne({empId: employeeId}, '_id', function(err, employee) {
    if (err) {
      // Log and respond to DB errors
      res.status(500).json(err);
    } else {
      if (employee != null) {
        // Handle employee data being returned
        // Create jwt and return token
        let payload = {subject: employee._id};
        let token = jwt.sign(payload, options.storageConfig.env.JWT_KEY);
        res.status(200).json({token});
      } else {
        // Handle no employee data returned
        res.status(404).json('There was no employee returned.');
      }
    }
  });
});

/**************************************************
 * Task Requests
 **************************************************/

/**
 * Handles GET request: All tasks for employee: checkAuth,
 */
router.get('/:employeeId/tasks', checkAuth, function (req, res, next) {
  const employeeId = req.params.employeeId;

  Employee.findOne({empId: employeeId}, 'todo done', function(err, employee) {
    if (err) {
      // Log and respond to DB errors
      return next(err);
    } else {
      if (employee !== null) {
        // Handle employee data being returned
        res.status(200).json(employee);
      } else {
        // Handle no employee data returned
        res.status(404).json('No employee with that ID.');
      }
    }
  });
});

/**
 * Handles POST request: Single tasks for employee
 */
router.post('/:employeeId/tasks', checkAuth, function (req, res, next) {
  const employeeId = req.params.employeeId;

  Employee.findOne({empId: employeeId}, 'todo done', function(err, employee) {
    if (err) {
      return next(err);
    } else {
      // Handle employee data being returned
      if (employee !== null) {
        // Build task object
        const item = {
          title: req.body.title,
          text: req.body.text
        };

        // Add new task object to todo array
        employee.todo.push(item);
        // Save array to DB and return 201 created response
        employee.save(function(err, employee) {
          if (err) {
            return next(err);
          } else {
            res.status(201).json(employee);
          }
        });
      } else {
        // Handle no employee data returned
        res.status(404).json('No employee with that ID. Task not saved.');
      }
    }
  });
});

/**
 * Handles PUT request of tasks for employee
 */
router.put('/:employeeId/tasks', checkAuth, function (req, res, next) {
  // Variable passed through request
  const employeeId = req.params.employeeId;
  const newTodo = req.body.todo;
  const newDone = req.body.done;

  // Get employee data for the employeeId given
  Employee.findOne({empId: employeeId}, 'todo done', function (err, employee) {
    if (err) {
      return next(err);
    } else {
      if (employee !== null) {
        // Replace current todo/done arrays with arrays sent in request
        employee.set({
          todo: newTodo,
          done: newDone
        });

        // Save employee with new todo/done arrays
        employee.save(function (err, employee) {
          if (err) {
            return next(err);
          } else {
            res.status(200).json(employee);
          }
        });
      } else {
        res.status(404).json('No employee with that ID. Task not saved.');
      }
    }
  });
});

/**
 * Handles DELETE request: Single tasks for employee
 */
router.delete('/:employeeId/tasks/:taskId', checkAuth, function (req, res, next) {
  const employeeId = req.params.employeeId;
  const taskId = req.params.taskId;

  // Get employee data for employeeId given
  Employee.findOne({empId: employeeId}, 'todo done', function (err, employee) {
    // Handle any DB errors
    if (err) {
      return next(err);
    } else {
      if (employee !== null) {
        const todoItem = employee.todo.find(
          item => item._id.toString() === taskId
        );
        const doneItem = employee.done.find(
          item => item._id.toString() === taskId
        );

        // Remove task from the array that has it
        if (todoItem) {
          // Remove the task from the todo array
          employee.todo.id(todoItem._id).remove();
          employee.save(function(err, employeeTodo) {
            if (err) {
              return next(err);
            } else {
              res.status(200).json(employeeTodo);
            }
          });
        } else if (doneItem) {
            employee.done.id(doneItem._id).remove();
            employee.save(function (err, employeeDone) {
              if (err) {
                return next(err);
              } else {
                res.status(200).json(employeeDone);
              }
            });
          }
      } else {
        res.status(404).json('No employee with that ID. Task not deleted.');
      }
    }
  });
});

module.exports = router;
