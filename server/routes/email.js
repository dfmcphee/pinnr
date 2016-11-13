var db = require('../models/db');
const groupRegEx = /(.*)@.*/;

const Email = function(req, res) {
  const groupUrl = req.body.To.match(groupRegEx);

  db.Group.find({ url: groupUrl }).then(function(group) {
    if (!group) {
      return;
    }

    db.Post.create({
      username: req.body.From,
      content: req.body.TextBody,
      service: 'email',
      GroupId: group.id
    }).then(function(post) {
      res.send({ post });
    });
  });
};

module.exports = Email;