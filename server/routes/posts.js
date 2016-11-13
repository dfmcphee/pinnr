var db = require('../models/db');

const Posts = {
  index: function(req, res) {
    db.Post.findAll({}).then(function(posts) {
      if (!posts) {
        res.send(404);
      } else {
        res.send({ posts });
      }
    });
  },
  create: function(req, res) {
    db.Post.create(req.body.post).then(function(post) {
      res.send({ post });
    });
  },
  delete: function(req, res) {
    db.Post.find({
      where: {
        id: req.params.id
      }
    }).then(function(post) {
      return post.destroy();
    });
  },
};

module.exports = Posts;
