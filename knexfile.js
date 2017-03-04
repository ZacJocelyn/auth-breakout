require('dotenv').config();
module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/auth'
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL + '?ssl=true'
  }

};
