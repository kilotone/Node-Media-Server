const express = require('express');
const scraperController = require('../controllers/scraper');

module.exports = (context) => {
  let router = express.Router();
  router.get('/', scraperController.scraper.bind(context));
  return router;
};
