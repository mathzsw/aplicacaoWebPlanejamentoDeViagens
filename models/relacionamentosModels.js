const sequelize = require('../db');

const Agencia = require('./Agencia');
const Destino = require('./Destino');
const Pacote = require('./Pacote');

Agencia.hasMany(Pacote, {
    foreignKey: 'agenciaId',
    as: 'pacotes'
});

Pacote.belongsTo(Agencia, {
    foreignKey: 'agenciaId',
    as: 'agencia'
});

Agencia.belongsToMany(Destino, {
    through: 'AgenciaDestinos',
    foreignKey: 'agenciaId',
    as: 'destinos'
});

Destino.belongsToMany(Agencia, {
    through: 'AgenciaDestinos',
    foreignKey: 'destinoId',
    as: 'agencias'
});

module.exports = {
    sequelize,
    Agencia,
    Destino,
    Pacote
};
