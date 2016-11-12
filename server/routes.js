const router = require('express').Router();
const index = require('./routes/index');
const groups = require('./routes/groups');

const routes = function() {
  router.get('/groups.json', groups);
  router.get('*', index);

  return router;
};

module.exports = routes();
