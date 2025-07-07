// config/db.js
const { Sequelize, DataTypes } = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('./config')[env];
const initModels = require('../models/init-models');

const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
);

const db = {};

// **Keep your instance on `.sequelize`**
db.sequelize = sequelize;
// Export the Sequelize class on `.Sequelize` in case you need it
db.Sequelize = Sequelize;

// Initialize all of your models
const models = initModels(sequelize);
Object.keys(models).forEach((name) => {
    db[name] = models[name];
});

db.connectAndSync = async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ Koneksi ke database berhasil dibuat.');
        await sequelize.sync({ alter: true });
        console.log('✅ Model database berhasil di-sinkronkan.');
    } catch (err) {
        console.error('🔴 Gagal terhubung atau sinkronkan database:', err);
        process.exit(1);
    }
};

module.exports = db;
