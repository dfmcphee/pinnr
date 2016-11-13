const router = require('express').Router();
const index = require('./routes/index');
const groups = require('./routes/groups');
const posts = require('./routes/posts');
const email = require('./routes/email');
var passport = require('passport'),
    signupController = require('../controllers/signupController.js')

var isAuthenticated = function (req, res, next) {
  if (req.isAuthenticated())
    return next()
  req.flash('error', 'You have to be logged in to access the page.')
  res.redirect('/')
}

const routes = function() {
  router.get('/signup', signupController.show)
  router.post('/signup', signupController.signup)
  router.post('/login', passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/',
      failureFlash: true
  }))
  router.get('/logout', function(req, res) {
    req.logout()
    res.redirect('/')
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
