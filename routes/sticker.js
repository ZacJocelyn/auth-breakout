var express = require('express');
var router = express.Router();
var localAuth = require('../auth/local')
var authHelpers = require('../auth/_helpers')

/* GET users listing. */
var knex = require('../db/knex');

router.get('/', function(req, res, next) {
  authHelpers.ensureAuthenticated(req, res, next);
});

module.exports = router;
