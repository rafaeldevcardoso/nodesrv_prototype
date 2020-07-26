const express = require('express');
const consign = require('consign');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');


let app = express(); //variável que irá invocar o express

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(expressValidator());

consign().include('routes').include('utils').into(app);
//chama o consign, inclue tudo que está dentro da pasta 'routes' e 'utils' e vai colocar dentro de app
app.listen(3000, '127.0.0.1', ()=>{

    console.log('servidor rodando!');

});