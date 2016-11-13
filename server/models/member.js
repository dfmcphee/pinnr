module.exports = function (sequelize, DataTypes){
  var Member = sequelize.define('Member', {
    owner: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  }, {
    classMethods: {
      associate: function (models) {
        Member.belongsTo(models.User);
        Member.belongsTo(models.Group);
      }
    }
  });

  return Member;
};
