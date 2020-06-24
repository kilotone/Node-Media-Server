const express = require('express');
const helloController = require('../controllers/hello');

module.exports = (context) => {
  let router = express.Router();
  router.get('/', helloController.hello.bind(context));
  return router;
};
