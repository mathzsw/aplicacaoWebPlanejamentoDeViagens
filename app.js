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
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/agencias', async (req, res) => {
    try {
        const agencias = await Agencia.findAll({
            include: { model: Destino, as: 'destinos' }
        });

        res.render('listaAgencias', { agencias });
    } catch (erro) {
        console.error(erro);
        res.status(500).send('Erro ao listar Agências.');
    }
});

app.get('/destinos', async (req, res) => {
    try {
        const destinos = await Destino.findAll({
            include: { model: Agencia, as: 'agencias' }
        });

        res.render('listaDestinos', { destinos });
    } catch (erro) {
        console.error(erro);
        res.status(500).send('Erro ao listar Destinos.');
    }
});

app.get('/pacotes', async (req, res) => {
    try {
        const pacotes = await Pacote.findAll({
            include: { model: Agencia, as: 'agencia' }
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
        const agencia = await Agencia.create({ nome, cnpj });

        if (destinosIds) {
            const ids = Array.isArray(destinosIds) ? destinosIds : [destinosIds];
            await agencia.setDestinos(ids);
        }

        res.redirect('/agencias');
    } catch (erro) {
        console.error(erro);
        res.status(500).send('Erro ao cadastrar Agência.');
    }
});

app.get('/destinos/cadastrar', (req, res) => {
    res.render('cadastrarDestino');
});

app.post('/destinos/cadastrar', async (req, res) => {
    try {
        const { nome, pais } = req.body;
        await Destino.create({ nome, pais });
        res.redirect('/destinos');
    } catch (erro) {
        console.error(erro);
        res.status(500).send('Erro ao cadastrar Destino.');
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
        await Pacote.create({ nome, descricao, preco, agenciaId });
        res.redirect('/pacotes');
    } catch (erro) {
        console.error(erro);
        res.status(500).send('Erro ao cadastrar Pacote.');
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
