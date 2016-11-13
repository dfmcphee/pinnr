const db = require('../models/db');
const cloudinary = require('cloudinary');
const groupRegEx = /(.*)@.*/;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

function savePost(res, postData) {
  db.Post.create(postData).then(function(post) {
    res.send({ post });
  });
}

const Email = function(req, res) {
  const groupUrl = req.body.To.match(groupRegEx);

  db.Group.find({
    where: {
      url: groupUrl
    }
  }).then(function(group) {
    if (!group) {
      return res.send(404);
    }

    if (req.body.Attachments && req.body.Attachments.length > 0) {
      const attachment = req.body.Attachments[0];
      cloudinary.v2.uploader.upload(`data:${attachment.ContentType};base64,${attachment.Content}`, function(error, result) {
        savePost(res, {
          username: req.body.From,
          content: req.body.TextBody,
          service: 'email',
          GroupId: group.id,
          attachment: result.url
        })
      });
    } else {
      savePost(res, {
        username: req.body.From,
        content: req.body.TextBody,
        service: 'email',
        GroupId: group.id
      })
    }
  });
};

module.exports = Email;