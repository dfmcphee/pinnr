const Groups = {
  index: function(req, res) {
    res.send({groups: [
      {
        id: '001',
        name: 'Group 1',
        hashtag: 'sometag',
        posts: []
      },
      {
        id: '002',
        name: 'Group 2',
        hashtag: 'anothertag',
        posts: []
      },
    ]});
  },
  create: function(req, res) {
    res.send({
      group: {
        id: '003',
        name: req.body.group.name,
        hashtag: req.body.group.hashtag,
        posts: []
      }
    });
  }
};

module.exports = Groups;
