const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Pacote = sequelize.define('Pacote', {
  nome: {
    type: DataTypes.STRING
  },
  descricao: {
    type: DataTypes.STRING
  },
  preco: {
    type: DataTypes.DECIMAL(10, 2)
  }
});

module.exports = Pacote;