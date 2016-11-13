const router = require('express').Router();
const index = require('./routes/index');
const groups = require('./routes/groups');

const routes = function() {
  router.get('/groups.json', groups.index);
  router.post('/groups.json', groups.create);
  router.get('*', index);

  return router;
};

module.exports = routes();
