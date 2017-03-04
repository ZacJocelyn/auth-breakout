const bcrypt = require('bcrypt');
const knex = require('../db/knex');
var localAuth = require('./local')

function createUser(req) {
  const hash = bcrypt.hashSync(req.body.password, 10);
  return knex('user')
  .insert({
    email: req.body.email,
    password: hash,
  })
  .returning('*');
}



function getUser(email) {
  return knex('user').where({email}).first();
}

function comparePass(userPassword, databasePassword) {
  const bool = bcrypt.compareSync(userPassword, databasePassword);
  if (!bool) throw new Error('bad password');
  else return true;
}

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

function ensureAuthenticated(req, res, next) {
  if (!(req.headers && req.headers.authorization)) {
    return res.status(400).json({
      status: 'Please log in'
    });
  }
  // decode the token
  var header = req.headers.authorization.split(' ');
  var token = header[1];
  localAuth.decodeToken(token, (err, payload) => {
    if (err) {
      return res.status(401).json({
        status: 'Token has expired'
      });
    } else {
      // check if the user still exists in the db
      return knex('user').where({id: parseInt(payload.user.id)}).first()
      .then((logged) => {
        return knex("sticker")
            .then(data => {
                var result = {
                    stickers: data,
                    logged: logged
                };
                res.json(result);
            });
      })
      .catch((err) => {
        res.status(500).json({
          status: 'error'
        });
      });
    }
  });
}

module.exports = {
  createUser,
  getUser,
  comparePass,
  ensureAuthenticated
};
