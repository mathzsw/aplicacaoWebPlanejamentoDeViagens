const sequelize = require('../db');

const Agencia = require('./Agencia');
const Destino = require('./Destino');
const Pacote = require('./Pacote');

Agencia.hasMany(Pacote, {
    foreignKey: 'agenciaId'
});

Pacote.belongsTo(Agencia, {
    foreignKey: 'agenciaId'
});

Agencia.belongsToMany(Destino, {
    through: 'AgenciaDestinos',
    foreignKey: 'agenciaId'
});

Destino.belongsToMany(Agencia, {
    through: 'AgenciaDestinos',
    foreignKey: 'destinoId'
});

module.exports = {
    sequelize,
    Agencia,
    Destino,
    Pacote
};