const router = require('express').Router();
const passport = require('passport');
const index = require('./routes/index');
const groups = require('./routes/groups');
const posts = require('./routes/posts');
const email = require('./routes/email');
const signup = require('./routes/signup.js')

var isAuthenticated = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.send({authenticated: false});
}

const routes = function() {
  router.post('/signup', signup.signup)
  router.get('/authenticated', isAuthenticated, function(req, res) {
    res.send({authenticated: true});
  });
  router.post('/login', passport.authenticate('local'), function(req, res) {
    res.send({authenticated: true});
  });
  router.post('/logout', function(req, res) {
    req.logout();
    res.send({authenticated: false});
  })
  router.get('/api/groups', groups.index);
  router.post('/api/groups', isAuthenticated, groups.create);
  router.get('/api/posts', posts.index);
  router.post('/api/posts', posts.create);
  router.delete('/api/posts/:id/', isAuthenticated, posts.delete);
  router.post('/api/email', email);
  router.get('*', index);

  return router;
};

module.exports = routes();
