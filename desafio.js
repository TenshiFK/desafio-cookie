const express = require('express');
const session = require('express-session');
const cookieParser = require("cookie-parser");

const app = express();

app.use(cookieParser('minhachave'));

app.use(
    session({
        secret: 'minhachave', //chave sercreta para assinar os cookies da sessão
        resave: false, //evita regravar sessões sem alterações
        saveUninitialized: true, //salva sessões não inicializadas 
    })
);

app.use(express.static('public'));

app.get('/cookie', (req, res) => {
    res.cookie('name', 'Desafio', {
        maxAge: 5000,
        expires: new Date('12 11 2030'),
        secure: true,
        httpOnly:true,
        sameSite: 'lax',
        signed: true,
    });
    console.log('Cookies: ', req.cookies);
    console.log('Signed Cookies: ', req.signedCookies);

    const data = {
        id_cookie: JSON.stringify(req.signedCookies), 
    };
    res.json(data);
});

const PORT = process.env.PORT || 3001; // use process.env.PORT

app.listen(PORT, () => {
   console.log(`server started on port ${PORT}`);
});