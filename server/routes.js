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
  res.send({
    authenticated: false,
    user: null
  });
}

const routes = function() {
  router.post('/signup', signup.signup)
  router.get('/authenticated', isAuthenticated, function(req, res) {
    res.send({
      authenticated: true,
      user: req.user
    });
  });
  router.post('/login', passport.authenticate('local'), function(req, res) {
    res.send({
      authenticated: true,
      user: req.user
    });
  });
  router.post('/logout', function(req, res) {
    req.logout();
    res.send({
      authenticated: false,
      user: null
    });
  })
  router.get('/api/groups', groups.index);
  router.post('/api/groups', groups.create);
  router.get('/api/groups/:id/posts', posts.index);
  router.post('/api/posts', posts.create);
  router.delete('/api/posts/:id/', posts.delete);
  router.post('/api/email', email);
  router.get('*', index);

  return router;
};

module.exports = routes();
