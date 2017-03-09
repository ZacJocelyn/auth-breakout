var bcrypt = require('bcrypt');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex.raw('DELETE FROM "user"; ALTER SEQUENCE user_id_seq RESTART WITH 3;')
    .then(function () {
      var users = [{
        id: 1,
        email: 'sam@gmail.com',
        password: bcrypt.hashSync('sammyg21', 10),
      }, {
        id: 2,
        email: 'alex@gmail.com',
        password: bcrypt.hashSync('123', 10),
      }];
      return knex('user').insert(users);
    });
};
