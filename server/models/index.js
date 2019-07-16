import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import configPath from '../config/config';

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
console.log('---------------------------------------what is the problem2-------------------------------------', env, configPath);

const config = configPath[env];
console.log('what is the problem', config);
console.log('---------------------------------------what is the problem config -------------------------------------', configPath[env]);
const db = {};

let sequelize = config.use_env_variable ? new Sequelize(process.env[config.use_env_variable]) : new Sequelize(config.database, config.username, config.password, config);

fs.readdirSync(__dirname)
  .filter(file => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.sequelize = sequelize;

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

export default db;
