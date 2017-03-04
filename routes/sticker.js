var express = require('express');
var router = express.Router();
var config = require('../config')
var app = express();
var jwt = require('jsonwebtoken');
var localAuth = require('../auth/local')

/* GET users listing. */
var knex = require('../db/knex');
var secret = app.get('superSecret')

// router.get('/', function(req, res, next) {
//   return knex("sticker")
//   .then(data => {
//       res.json(data);
//   })
//   .catch((err) => {
//     res.status(500).json({
//       status: 'error'
//     });
//   });
// });

router.get('/', function(req, res, next) {
  ensureAuthenticated(req, res, next);
});

module.exports = router;
