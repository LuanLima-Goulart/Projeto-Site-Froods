const express = require('express');
const { pool } = require('./config/db');
const app = express();

app.get('/clientes', async (req, res) => {
    try {
        const [rows] = await pool.execute('SELECT * FROM cliente');
        res.json(rows);
    } catch (error) {
        console.error('Erro ao consultar clientes: ', error);
        res.status(500).json({error: 'Erro ao consultar produto', details: error.message});
    }
});

app.get('/pedidos', async (req, res) => {
    try {
        const [rows] = await pool.execute('SELECT * FROM pedidos');
        res.json(rows);
    } catch (error) {
        console.error('Erro ao consultar clientes: ', error);
        res.status(500).json({error: 'Erro ao consultar produto', details: error.message});
    }
});


module.exports = app;