const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const config = require('../config');
const db = {};
const currentEnv = process.env.NODE_ENV || 'development';

var sequelize;

if (currentEnv === 'development') {
  sequelize = new Sequelize('postgres://localhost/blackmirror');
} else {
  sequelize = new Sequelize(`postgres://${config.username}:${config.password}@${config.host}:${config.port}/${config.database}`);
}

fs.readdirSync(__dirname).filter(function (file) {
  return (file.indexOf('.') !== 0) && (file !== 'db.js');
}).forEach(function (file) {
  var model = sequelize['import'](path.join(__dirname, file));
  db[model.name] = model;
});

Object.keys(db).forEach(function (modelName) {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
