'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;

// Base options from config.json
const sequelizeOptions = {
  ...config, // Spread existing config properties
  logging: env === 'production' ? false : console.log, // Disable logging in production, use console.log otherwise
};

if (config.use_env_variable) {
  // Option 1: Use a single environment variable for the database URI
  const databaseUri = process.env[config.use_env_variable];
  if (!databaseUri) {
    console.error(`Error: Environment variable "${config.use_env_variable}" is not set.`);
    process.exit(1); // Exit if critical env var is missing
  }
  sequelize = new Sequelize(databaseUri, sequelizeOptions);
} else {
  // Option 2: Use individual environment variables or fallback to config.json
  const database = process.env.DB_DATABASE || config.database;
  const username = process.env.DB_USERNAME || config.username;
  const password = process.env.DB_PASSWORD || config.password;
  const host = process.env.DB_HOST || config.host;
  const port = process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : config.port;

  // Ensure essential credentials are not null/undefined in production if not using URI
  if (env === 'production' && (!username || !password || !database || !host)) {
    console.error('Error: Database credentials (username, password, database, host) must be provided via environment variables in production.');
    process.exit(1);
  }

  sequelize = new Sequelize(database, username, password, {
    ...sequelizeOptions,
    host,
    port,
  });
}
sequelize.authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
    process.exit(1); // Exit the process if connection fails
  });
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
