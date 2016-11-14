const bcrypt = require('bcrypt');
const db = require('../models/db.js');

module.exports.show = function(req, res) {
  res.render('signup');
}

module.exports.signup = function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  if (!username || !password) {
    res.send({success: false});
  }

  var salt = bcrypt.genSaltSync(10)
  var hashedPassword = bcrypt.hashSync(password, salt)

  var newUser = {
    username: username,
    salt: salt,
    password: hashedPassword
  }

  db.User.create(newUser).then(function(user) {
    req.login(user, function (err) {
      res.send({ authenticated: true });
    });
  }).catch(function(error) {
    res.send({ authenticated: false });
  })
}
