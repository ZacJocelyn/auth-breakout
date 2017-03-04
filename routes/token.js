var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var knex = require('../db/knex');
var authHelpers = require('../auth/_helpers')
var localAuth = require('../auth/local')


router.post('/', (req, res, next) => {
  const email = req.body.auth.email;
  const password = req.body.auth.password;
  console.log(req.body);
  return authHelpers.getUser(email)
  .then((response) => {
    authHelpers.comparePass(password, response.password);
    return response;
  })
  .then((response) => { return localAuth.encodeToken(response); })
  .then((token) => {
    res.status(200).json({
      status: 'success',
      token: token
    });
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json({
      message: err,
      status: 'error'
    });
  });
});


module.exports = router;
