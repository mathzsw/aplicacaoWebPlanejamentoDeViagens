const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Destino = sequelize.define('Destino', {
  nome: {
    type: DataTypes.STRING
  },
  pais: {
    type: DataTypes.STRING
  }
});     

module.exports = Destino;