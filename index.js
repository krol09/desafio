'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
cont env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../../config/database.js');
const db = {};

let sequelize;
if (config.use._env_variable){
    sequelize = new Sequelize(process.env[config.use_env_variable])
} else {
    
}