const express = require('express');

const session = require('express-session');
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.static('public'));

app.use(cookieParser('minhachave'));

app.use(
    session({
        secret: 'minhachave', //chave sercreta para assinar os cookies da sessão
        resave: false, //evita regravar sessões sem alterações
        saveUninitialized: true, //salva sessões não inicializadas 
    })
);

app.get('/', (req, res) => {
    res.cookie('name', 'Desafio', {
        maxAge: 5000,
        expires: new Date('08 11 2023'),
        secure: true,
        httpOnly:true,
        sameSite: 'lax',
        signed: true,
    }).send(`
        <html>
            <head>
                <link rel="stylesheet" type="text/css" href="/style.css">
            </head>

            <body>
                <header>
                    <h1>Desafio Cookies</h1>
                </header>
                <main>
                    <h1><span>Seu Cookie</span></h1>
                    <p>${JSON.stringify(req.signedCookies)}</p>
                    <img src="https://pngimg.com/d/cookie_PNG13645.png"></img>
                </main>
                <footer></footer>
            </body>
        </html>

        
    `);
    console.log('Cookies: ', req.cookies)

    // Cookies that have been signed
    console.log('Signed Cookies: ', req.signedCookies)

 });


app.listen(3001, () => {
    console.log("Aplicação rodando na porta 3001");
})


