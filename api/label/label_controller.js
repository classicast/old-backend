/**
* Using CRUD standard naming convention for endpoints.
* GET     /label        ->  readAll
* GET     /label/:id    ->  read
* POST    /label        ->  create
* PUT     /label/:id    ->  update
* DELETE  /label/:id    ->  delete
*/

// var Label = require('./label_model.js');

exports.readAll = function(req, res, next) {
  res.send(200, 'Hello World!');
  return next();
};

// function handleError(res, statusCode, err) {
//   statusCode = statusCode || 500;
//   return res.status(statusCode).send(err);
// }

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
