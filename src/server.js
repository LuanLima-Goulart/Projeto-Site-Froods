const express = require('express');
const { pool } = require('./config/db');
const app = express();

const clientesRoutes = require('./routes/clientes');
const pedidosRoutes = require('./routes/pedidos');
const relatorioRoutes = require('./routes/relatorio-completo');
const cardapioRoutes = require('./routes/cardapio.js');

app.use('/clientes', clientesRoutes);
app.use('/pedidos', pedidosRoutes);
app.use('relatorio-completo', relatorioRoutes);
app.use('cardapio', cardapioRoutes);

module.exports = app;