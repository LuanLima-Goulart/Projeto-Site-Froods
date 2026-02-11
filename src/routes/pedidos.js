const express = require('express');
const { pool } = require('../config/db');
const router = express.Router();

// --------------------------------------GET---------------------------------------------------------
router.get('/', async (req, res) => {
    try {
        const [rows] = await pool.execute('SELECT * FROM pedidos');
    if (rows.length === 0) {
        return res.status(404).json({ erro: 'Produto não encontrado' });
    }
    res.json(rows);
    } catch (error) {
        console.error('Erro ao consultar clientes: ', error);
        res.status(500).json({erro: 'Erro ao consultar produto', detalhes: error.message});
    }
});

// --------------------------------------DELETE------------------------------------------------------
router.delete('/:id/permanente', async (req, res) => {
    const clientesId = req.params.id;


    try {
        const [clientes] = await pool.execute('SELECT * FROM pedidos WHERE idPedido = ?', [clientesId]);
        if (clientes.length === 0) {
            return res.status(404).json({ erro: 'Pedido não encontrado' });
        }


        const [pedidos] = await pool.execute('SELECT COUNT(*) as total FROM pedidos WHERE idPedido = ?', [clientesId]);


        await pool.execute('DELETE FROM pedidos WHERE idPedido = ?', [clientesId]);
        res.json({ mensagem: 'Pedido removido do sistema com sucesso' });


    } catch (error) {
        res.status(500).json({ erro: 'Erro ao excluir', detalhes: error.message });
    }
});

// --------------------------------------POST--------------------------------------------------------
// Não a necessidade...

// --------------------------------------PUT---------------------------------------------------------
// Não a necessidade...

module.exports = router;