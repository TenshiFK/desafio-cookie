const express = require('express');

const session = require('express-session');
const cookieParser = require("cookie-parser");

const app = express();


app.use(cookieParser());

app.use(
    session({
        secret: 'minhachave', //chave sercreta para assinar os cookies da sessão
        resave: false, //evita regravar sessões sem alterações
        saveUninitialized: true, //salva sessões não inicializadas 
    })
);

const produtos = [
    {id: 1, nome: 'Arroz', preco: 25},
    {id: 2, nome: 'Feijão', preco: 15},
    {id: 3, nome: 'Bife', preco: 40},
];

//rota inicial
app.get('/produtos', (req, res) => {
    res.send(`
        <h1>Lista de Produtos</h1>
        <ul>
            ${produtos.map(
                (produto) => `<li>${produto.nome} - ${produto.preco},00 <a href='/adicionar/${produto.id}'>Adiconar ao carrinho</a></li>`   
            )
            .join('')
        }
        </ul>
        <a href="/carrinho">Ver Carrinho</a>
    `);
});

//rota add
app.get('/adicionar/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const produto = produtos.find((p) => p.id === id);

    if(produto){
        if(!req.session.carrinho){
            req.session.carrinho = [];
        }
        req.session.carrinho.push(produto);
    }

    res.redirect('/produtos');
});

//rota carrinho
app.get("/carrinho", (req, res) => {
    const carrinho = req.session.carrinho || [];
    const total = carrinho.reduce((acc, produto) => acc + produto.preco, 0);

    res.send(`
        <h1>Carrinho de compras</h1>
        <ul>
            ${carrinho.map(
                (produto) => `<li>${produto.nome} - ${produto.preco},00</li>`   
            )
            .join('')
        }
        </ul>
        <p>Total: ${total},00</p>
        <a href="/produtos">Continuar Comprando</a>
    `);
});

app.listen(3000, () => {
    console.log("Aplicação rodando na porta 3000");
})


