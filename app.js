const express = require('express');
const { engine } = require('express-handlebars');
const {
    sequelize,
    Agencia,
    Destino,
    Pacote
} = require('./models/relacionamentosModels');

const app = express(); 
const PORT = 3000;

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => { 
    res.render('home'); 
});

sequelize.sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
  })
  .catch((erro) => {
    console.error('Erro ao sincronizar o banco:', erro);
  });