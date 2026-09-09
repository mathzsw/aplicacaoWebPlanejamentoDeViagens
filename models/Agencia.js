const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Agencia = sequelize.define('Agencia', {
  nome: {
    type: DataTypes.STRING
  },
  cnpj: {
    type: DataTypes.STRING
  }
});

module.exports = Agencia    ;