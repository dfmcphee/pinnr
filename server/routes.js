const router = require('express').Router();
const index = require('./routes/index');
const groups = require('./routes/groups');
const posts = require('./routes/posts');
const email = require('./routes/email');

const routes = function() {
  router.get('/api/groups', groups.index);
  router.post('/api/groups', groups.create);
  router.get('/api/posts', posts.index);
  router.post('/api/posts', posts.create);
  router.delete('/api/posts/:id/', posts.delete);
  router.post('/api/email', email);
  router.get('*', index);

  return router;
};

module.exports = routes();
