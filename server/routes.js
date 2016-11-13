const router = require('express').Router();
const index = require('./routes/index');
const groups = require('./routes/groups');
const email = require('./routes/email');

const routes = function() {
  router.get('/groups.json', groups.index);
  router.post('/groups.json', groups.create);
  router.post('/email.json', email);
  router.get('*', index);

  return router;
};

module.exports = routes();
