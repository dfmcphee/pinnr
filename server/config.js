var currentEnv = process.env.NODE_ENV || 'development';

var config = {
  development: {
    host: 'localhost',
    port: 5432,
    database: 'blackmirror',
    username: 'dominic',
    password: ''
  },

  production: {
    host: process.env.DB_HOST,
    port: 5432,
    database: 'blackmirror',
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD
  }
};

module.exports = config[currentEnv];