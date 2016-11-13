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
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    salt: {
      type: DataTypes.STRING
    },
    date: DataTypes.DATE,
  },
  {
   classMethods: {
      associate: function (models) {
        User.hasMany(models.Member);
        User.hasMany(models.Post);
      }
    }
  });

  return User;
};
