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

app.get('/agencias', async (req, res) => {
  try {
    const agencias = await Agencia.findAll();
    res.render('listaAgencias', { agencias });
  } catch (erro) {
    console.error(erro);
    res.status(500).send('Erro ao listar Agências.');
  }
});

app.get('/destinos', async (req, res) => {
  try {
    const destinos = await Destino.findAll();
    res.render('listaDestinos', { destinos });
  } catch (erro) {
    console.error(erro);
    res.status(500).send('Erro ao listar Destinos.');
  }
});

app.get('/pacotes', async (req, res) => {
  try {
    const pacotes = await Pacote.findAll({
      include: Agencia
    });
    res.render('listaPacotes', { pacotes });
  } catch (erro) {
    console.error(erro);
    res.status(500).send('Erro ao listar Pacotes.');
  }
});

app.get('/agencias/cadastrar', async (req, res) => {
  try {
    const destinos = await Destino.findAll();
    res.render('cadastrarAgencia', { destinos });
    } catch (erro) {
        console.error(erro);
        res.status(500).send('Erro ao carregar a página de cadastro de Agência.');
  }
});

app.post('/agencias/cadastrar', async (req, res) => {
    try {
        const { nome, cnpj, destinosIds } = req.body;

        const agencia = await Agencia.create({
            nome,
            cnpj
        });

        if (destinosIds) {
            const ids = Array.isArray(destinosIds)
                ? destinosIds
                : [destinosIds];

            await agencia.setDestinos(ids);
        }

        res.redirect(`/agencias/${agencia.id}`);
    } catch (erro) {
        console.error(erro);
        res.status(500).send('Erro ao cadastrar Agência.');
    }
});

app.get('/agencias/:id', async (req, res) => {
  try {
    const agencia = await Agencia.findByPk(req.params.id, {
      include: Destino
    });

    if (!agencia) {
      return res.status(404).send('Agência não encontrada.');
    }

    res.render('detalharAgencia', {
      agencia: agencia.toJSON()
    });
  } catch (erro) {
    console.error(erro);
    res.status(500).send('Erro ao detalhar Agência.');
  }
});

app.get('/destinos/cadastrar', async (req, res) => {
  try {
    const destinos = await Destino.findAll();
    res.render('cadastrarDestino', { destinos });
    } catch (erro) {
        console.error(erro);
        res.status(500).send('Erro ao carregar a página de cadastro de Destino.');
  }
});

app.post('/destinos/cadastrar', async (req, res) => {
  try {
    const { nome, pais } = req.body;

    const destino = await Destino.create({
      nome,
      pais
    });

    res.redirect(`/destinos/${destino.id}`);
  } catch (erro) {
    console.error(erro);
    res.status(500).send('Erro ao cadastrar Destino.');
  }
});

app.get('/destinos/:id', async (req, res) => {
  try {
    const destino = await Destino.findByPk(req.params.id);
    if (!destino) {
      return res.status(404).send('Destino não encontrado.');
    }
    res.render('detalharDestino', { destino: destino.toJSON() });
  } catch (erro) {
    console.error(erro);
    res.status(500).send('Erro ao detalhar Destino.');
  }
});

app.get('/pacotes/cadastrar', async (req, res) => {
  try {
    const agencias = await Agencia.findAll();
    res.render('cadastrarPacote', { agencias });
  } catch (erro) {
    console.error(erro);
    res.status(500).send('Erro ao carregar a página de cadastro de Pacote.');
  }
});

app.post('/pacotes/cadastrar', async (req, res) => {
  try {
    const { nome, descricao, preco, agenciaId } = req.body;

    const pacote = await Pacote.create({
        nome,
        descricao,
        preco,
        agenciaId
    });

    res.redirect(`/pacotes/${pacote.id}`);
  } catch (erro) {
    console.error(erro);
    res.status(500).send('Erro ao cadastrar Pacote.');
  }
});

app.get('/pacotes/:id', async (req, res) => {
  try {
    const pacote = await Pacote.findByPk(req.params.id, {
      include: Agencia
    });

    if (!pacote) {
      return res.status(404).send('Pacote não encontrado.');
    }

    res.render('detalharPacote', {
      pacote: pacote.toJSON()
    });
  } catch (erro) {
    console.error(erro);
    res.status(500).send('Erro ao detalhar Pacote.');
  }
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