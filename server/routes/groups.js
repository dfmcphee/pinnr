var db = require('../models/db');
var Twitter = require('../twitter');

const Groups = {
  index: function(req, res) {
    if (req.user) {
      db.Group.findAll({
        UserId: req.user.id
      }).then(function(groups) {
        if (!groups) {
          res.send(404);
        } else {
          res.send({ groups });
        }
      });
    } else {
      res.send({ groups: [] });
    }
  },
  create: function(req, res) {
    if (req.user) {
      db.Group.create({
        title: req.body.group.title,
        hashtag: req.body.group.hashtag,
        UserId: req.user.id
      }).then(function(group) {
        Twitter.startStream(group);
        res.send({ group });
      });
    } else {
      res.send(401);
    }
  }
};

module.exports = Groups;
