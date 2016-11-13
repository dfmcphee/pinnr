var db = require('../models/db');

const Groups = {
  index: function(req, res) {
    db.Group.findAll({
      include: [db.Post]
    }).then(function(groups) {
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
      res.send({ group });
    });
  }
};

module.exports = Groups;
