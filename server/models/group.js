const uniqueSlug = require('unique-slug');

module.exports = function (sequelize, DataTypes){
  var Group = sequelize.define('Group', {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    url: {
      type: DataTypes.STRING,
      unique: true,
      defaultValue: uniqueSlug()
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hashtag: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    classMethods: {
      associate: function(models) {
        Group.hasMany(models.Post);
        Group.hasMany(models.Member);
        Group.belongsTo(models.User);
      }
    }
  });

  return Group;
};
