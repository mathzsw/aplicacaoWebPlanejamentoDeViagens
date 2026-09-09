const express = require('express');
const { engine } = require('express-handlebars');
const sequelize = require('./db');
const Pacote = require('../models/Pacote');
const Destino = require('./models/Destino');
const Agencia = require('./models/Agencia');require('./models/relacionamentosModels');

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');
app.use(express.urlencoded({ extended: true }));







sequelize.sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
  })
  .catch((erro) => {
    console.error('Erro ao sincronizar o banco:', erro);
  });