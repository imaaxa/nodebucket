/*============================================;
Title: Node Bucket
Author: Cory Gilliam
Date:  March 2020;
Modified By:
Description: Web 450 Capstone Project.
===========================================*/
/* jshint expr: true */
// Requires
const options = require('../../options');
const checkAuth = require('../../check-auth');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

// Require employee model
const Employee = require('../models/employee');

// Variables
const employeeRoute = '/api/employees/';
const dev = options.storageConfig.serv.DEV;

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
        dev ? console.log(employee) : '';
        res.status(200).json(employee);
      } else {
        // Handle no employee data returned
        dev ? console.log('No employees were found.') : '';
        res.status(200).json('No employees were found.');
      }
    })
    .catch(err => {
      // Log and respond to DB errors
      dev ? console.log(`Error: ${err}`) : '';
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
      // Log and respond to DB errors
      dev ? console.log(err) : '';
      res.status(500).json(err);
    } else {
      if (employee !== null) {
        // Handle employee data being returned
        dev ? console.log(employee) : '';
        res.status(200).json(employee);
      } else {
        // Handle no employee data returned
        dev ? console.log('No employee with that ID.') : '';
        res.status(200).json('No employee with that ID.');
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
      dev ? console.log(err) : '';
      res.status(500).json({ error: err});
    } else {
      if (employee !== null) {
        // Handle employee data being returned
        dev ? console.log(employee) : '';
        res.status(200).json(employee);
      } else {
        // Log and respond to DB errors
        dev ? console.log('No data was saved.') : '';
        res.status(200).json('No data was saved.');
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
      dev ? console.log(err) : '';
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
      dev ? console.log(err) : '';
      return next(err);
    } else {
      // Check if employee data was returned
      if (employee !== null) {
        // Handle employee data being returned

        dev ? console.log(employee) : '';
        employee.remove(function (err, employee) {
          if (err) {
            // Log and respond to DB errors
            dev ? console.log(err) : '';
            return next(err);
          } else {
            // Log and respond to success
            dev ? console.log('Employee record has been deleted.') : '';
            res.status(200).json('Employee record has been deleted.');
          }
        });
      } else {
        // Handle no employee data returned
        dev ? console.log('Employee could not be found. Employee not removed') : '';
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
      dev ? console.log(err) : '';
      res.status(500).json(err);
    } else {
      dev ? console.log(employee) : '';
      if (employee != null) {
        // Handle employee data being returned

        // Create jwt and return token
        let payload = {subject: employee._id};
        let token = jwt.sign(payload, options.storageConfig.env.JWT_KEY);
        res.status(200).json({token});
      } else {
        // Handle no employee data returned
        dev ? console.log('There was no employee returned.') : '';
        res.status(200).json('There was no employee returned.');
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
      dev ? console.log(err) : '';
      return next(err);
    } else {
      if (employee !== null) {
        // Handle employee data being returned
        dev ? console.log(employee) : '';
        res.status(200).json(employee);
      } else {
        // Handle no employee data returned
        dev ? console.log('No employee with that ID.') : '';
        res.status(200).json('No employee with that ID.');
      }
    }
  });
});

/**
 * Handles POST request: Single tasks for employee
 */
router.post('/:employeeId/tasks', checkAuth, function (req, res, next) {
  const employeeId = req.params.employeeId;
  console.log(req.body);

  Employee.findOne({empId: employeeId}, 'todo done', function(err, employee) {
    if (err) {
      dev ? console.log(err) : '';
      return next(err);
    } else {
      if (employee !== null) {
        // Handle employee data being returned
        dev ? console.log(employee) : '';
        const item = {title: req.body.title, text: req.body.text};

        employee.todo.push(item);
        employee.save(function(err, employee) {

          if (err) {
            dev ? console.log(err) : '';
            return next(err);
          } else {
            dev ? console.log(employee) : '';
            res.status(201).json(employee);
          }

        });
      } else {
        // Handle no employee data returned
        dev ? console.log('No employee with that ID. Task not saved.') : '';
        res.status(200).json('No employee with that ID. Task not saved.');
      }
    }
  });
});

/**
 * Handles PUT request of tasks for employee
 */
router.put('/:employeeId/tasks', checkAuth, function (req, res, next) {
  const employeeId = req.params.employeeId;
  const todo = req.body.todo;
  const done = req.body.done;

  console.log(todo);
  console.log(done);

  // Get employee data for the employeeId given
  Employee.findOne({empId: employeeId}, 'todo done', function (err, employee) {
    if (err) { // Handle any DB errors
      return next(err);
    } else { // Handle DB return data
      if (employee !== null) { // Handle employee data returned
        // Replace current todo/done arrays with arrays sent in request
        employee.set({
          todo: this.todo,
          done: this.done
        });

        // Save employee with new todo/done arrays
        employee.save(function (err, employee) {
          if (err) { // Handle any DB errors
            return next(err);
          } else { // Return new employee data
            res.status(200).json(employee);
          }
        });
      } else { // Handle no employee data returned
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
      dev ? console.log(err) : '';
      return next(err);
    } else {
      // Handle query success

      // Handle query with employee data returned
      if (employee !== null) {
        // Handle employee data being returned
        dev ? console.log(employee) : '';

        // Try to find the task _id in the employee todo/done arrays
        const todoItem = employee.todo.find( item => item._id.toString() === taskId);
        const doneItem = employee.done.find( item => item._id.toString() === taskId);

        // Remove task from the array that has it
        if (todoItem) {
          // Remove the task from the todo array
          employee.todo.id(todoItem._id).remove();
          employee.save(function(err, employeeTodo) {
            if (err) {
              // Log and respond to DB errors
              dev ? console.log(err) : '';
              return next(err);
            } else {
              // Handle employee data being returned
              dev ? console.log(employeeTodo) : '';
              res.status(200).json(employeeTodo);
            }
          });

          // Remove task from the array that has it
        } else if (doneItem) {
            // Remove the task fro the done array
            employee.done.id(doneItem._id).remove();
            employee.save(function (err, employeeDone) {
              if (err) {
                // Log and respond to DB errors
                dev ? console.log(err) : '';
                return next(err);
              } else {
                // Handle employee data being returned
                dev ? console.log(employeeDone) : '';
                res.status(200).json(employeeDone);
              }
            });
          }
      } else {
        // Handle no employee data returned
        dev ? console.log('No employee with that ID. Task not deleted.') : '';
        res.status(200).json('No employee with that ID. Task not deleted.');
      }
    }
  });
});

module.exports = router;
