const express = require('express');
const { pool } = require('../config/db');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const [rows] = await pool.execute(`SELECT
            alimento.nome,
            alimento.preco,
            alimento.categoria,
            restaurante.nome AS nomeRestaurante
            FROM alimento
            INNER JOIN restaurante ON alimento.idRestaurante = restaurante.idRestaurante
            ORDER BY alimento.categoria ASC, alimento.nome ASC
            `);
        res.json(rows);
    } catch (error) {
        console.error('Erro ao consultar clientes: ', error);
        res.status(500).json({ error: 'Erro ao consultar produto', details: error.message });
    }
});

module.exports = router;