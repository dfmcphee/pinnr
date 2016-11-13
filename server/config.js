var config = {
  host: process.env.DB_HOST,
  port: 5432,
  database: 'blackmirror',
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD
};

module.exports = config;