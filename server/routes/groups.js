var db = require('../models/db');
var Twitter = require('../twitter');

const Groups = {
  index: function(req, res) {
    db.Group.findAll({}).then(function(groups) {
      if (!groups) {
        res.send(404);
      } else {
        res.send({ groups });
      }
    });
  },
  create: function(req, res) {
    db.Group.create({
      title: req.body.group.title,
      hashtag: req.body.group.hashtag
    }).then(function(group) {
      Twitter.startStream(group);
      res.send({ group });
    });
  }
};

module.exports = Groups;
