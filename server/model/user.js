module.exports = function (sequelize, DataTypes){
  var User = sequelize.define('User', {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: DataTypes.DATE,
    },{
     classMethods: {
        associate: function (models) {
          User.hasMany(models.Member);
          User.hasMany(models.Post);
        }
      }
    }
  });

  return User;
};
