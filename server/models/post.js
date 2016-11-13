module.exports = function (sequelize, DataTypes){
  var Post = sequelize.define('Post', {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    url: DataTypes.STRING,
    title: DataTypes.STRING,
    pinned: DataTypes.BOOLEAN,
    hidden: DataTypes.BOOLEAN,
    service: DataTypes.STRING,
    content: DataTypes.TEXT,
    attachment: DataTypes.STRING,
    date: DataTypes.DATE,
  },
  {
   classMethods: {
      associate: function (models) {
        Post.belongsTo(models.User);
        Post.belongsTo(models.Group);
      }
    }
  });

  return Post;
};
