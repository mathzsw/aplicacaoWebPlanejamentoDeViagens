const Agencia = require('./Agencia');
const Pacote = require('./Pacote');
const Destino = require('./Destino');

Agencia.hasMany(Pacote, {
    foreignKey: 'agenciaId' 
});

Pacote.belongsTo(Agencia, { 
    foreignKey: 'agenciaId' 
});

Pacote.belongsToMany(Destino, { 
    through: 'PacoteDestino', 
    foreignKey: 'pacoteId' 
});

Destino.belongsToMany(Pacote, { 
    through: 'PacoteDestino', 
    foreignKey: 'destinoId' 
});

module.exports = {
    Agencia,
    Pacote,
    Destino
};
