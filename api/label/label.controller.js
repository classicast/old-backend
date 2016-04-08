/**
* Using CRUD standard naming convention for endpoints.
* GET     /label        ->  readAll
* GET     /label/:id    ->  read
* POST    /label        ->  create
* PUT     /label/:id    ->  update
* DELETE  /label/:id    ->  delete
*/

import db from '../../config/database';
const { Label } = db;

export async function readAll(req, res, next) {
  try {
    // Validate that query param exists on the db model, and is not undefined
    // Then construct list of validParams to send to Label.findAll where method
    // const validParams = {};
    const labels = await Label.findAll({
      // where: validParams,
    });
    res.send(200, labels);
    return next();
  } catch (err) {
    // TODO: better error handling
    return next(err);
  }
}

// // Get list of all employees
// exports.readAll = function(req, res) {
//   Employees.findAll()
//   .then(function(employees) {
//     res.status(200).send(employees);
//   })
//   .catch(function(statusCode, err) {
//     handleError(res, statusCode, err);
//   });
// };

// // Get a single employee
// exports.read = function(req, res) {
//   Employees.find(req.params.id)
//   .then(function (employee) {
//     res.status(200).send(employee);
//   })
//   .catch(function(statusCode, err) {
//     handleError(res, statusCode, err);
//   });
// };

// // Creates a new employee
// exports.create = function(req, res) {
//   Employees.create(req.body)
//   .then(function(employee) {
//     res.status(201).send(employee);
//   })
//   .catch(function(statusCode, err) {
//     handleError(res, statusCode, err);
//   });
// };

// // Updates an employee
// exports.update = function(req, res) {
//   Employees.update(req.params.id, req.body)
//   .then(function (employee) {
//     res.status(200).send(employee);
//   })
//   .catch(function(statusCode, err) {
//     handleError(res, statusCode, err);
//   });
// };

// // Deletes an employee
// exports.delete = function(req, res) {
//   Employees.delete(req.params.id)
//   .then(function () {
//     res.status(204).end();
//   })
//   .catch(function(statusCode, err) {
//     handleError(res, statusCode, err);
//   });
// };
