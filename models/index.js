'use strict'
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const localConfig = require("../config/development.json");
let options;
// creating Database
if(process.env.NODE_ENV.toUpperCase() === "production".toUpperCase()){
    options = process.env.DATABASE_URL;
} else {
    options = localConfig.dbUrl;
}

console.log("DB URL : " + options)
const sequelize = new Sequelize(options, { logging: false });
let db = {};

console.log(`Attching models to DB`)
//attaching models to sequelize
fs.readdirSync(__dirname).filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
}).forEach(file => {
    file = file.substring(0, file.length - 3);
    let model = sequelize.import(path.join(__dirname, file));
    //sequelize['import'](path.join(__dirname, file));
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