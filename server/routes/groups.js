const Groups = function(req, res) {
  res.send({groups: [
    {
      id: '001',
      name: 'Group 1',
      members: [{
        name: 'testmember',
        email: 'test@email.com'
      }]
    },
    {
      id: '002',
      name: 'Group 2',
      members: [{
        name: 'testmember2',
        email: 'test2@email.com'
      }]
    },
  ]});
};

module.exports = Groups;
