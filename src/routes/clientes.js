const express = require('express');
const { cpf } = require('cpf-cnpj-validator');
const { pool } = require('../config/db');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const [rows] = await pool.execute('SELECT * FROM cliente WHERE ativo = 1');
        res.json(rows);
    } catch (error) {
        console.error('Erro ao consultar clientes: ', error);
        res.status(500).json({ error: 'Erro ao consultar cliente', details: error.message });
    }
});

router.post('/', async (req, res) => {
    const { nome, enderecoCliente, telefone, cpfValue } = req.body || {};

    if (!nome || nome.trim() === '') {
        return res.status(400).json({ error: 'Nome do cliente é obrigatório' });
    }

    if (!cpf.isValid(cpfValue)) {
        return res.status(400).json({
            error: 'cpf inválido',
            message: 'Por favor digite um cpf válido'
        });
    }

    try {
        const [clienteExiste] = await pool.execute('SELECT * FROM cliente WHERE cpf = ?', [cpfValue]);
        if (clienteExiste.length > 0) {
            return res.status(409).json({ error: 'Cliente já existe com este CPF' });
        }

        const query = `INSERT INTO cliente (nome, enderecoCliente, telefone, cpf) VALUES (?, ?, ?, ?)`;
        const [result] = await pool.execute(query, [nome.trim(), enderecoCliente, telefone, cpfValue]);

        res.status(201).json({ message: 'Cliente criado com sucesso', id: result.insertId });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar cliente', details: error.message });
    }
});

router.delete('/:id/permanente', async (req, res) => {
    const clientesId = req.params.id;

    try {
        const [clientes] = await pool.execute('SELECT * FROM cliente WHERE idCliente = ?', [clientesId]);
        if (clientes.length === 0) {
            return res.status(404).json({ erro: 'Cliente não encontrado' });
        }

        const [pedidos] = await pool.execute('SELECT COUNT(*) as total FROM pedidos WHERE idCliente = ?', [clientesId]);
        
        if (pedidos[0].total > 0) {
            return res.status(400).json({
                erro: 'Não é possível excluir permanentemente',
                message: `Este cliente possui ${pedidos[0].total} pedidos no histórico. Use a desativação.`
            });
        }

        await pool.execute('DELETE FROM cliente WHERE idCliente = ?', [clientesId]);
        res.json({ mensagem: 'Cliente removido do sistema com sucesso' });

    } catch (error) {
        res.status(500).json({ erro: 'Erro ao excluir', detalhes: error.message });
    }
});

router.patch('/:id/desativar', async (req, res) => {
    const clienteId = req.params.id;

    try {
        const [cliente] = await pool.execute('SELECT * FROM cliente WHERE idCliente = ?', [clienteId]);
        
        if (cliente.length === 0) {
            return res.status(404).json({ erro: 'Cliente não encontrado' });
        }

        await pool.execute('UPDATE cliente SET ativo = 0 WHERE idCliente = ?', [clienteId]);

        res.json({
            mensagem: 'Cliente desativado com sucesso',
            cliente: cliente[0].nome,
            status: 'Inativo'
        });

    } catch (error) {
        console.error('Erro ao desativar cliente:', error);
        res.status(500).json({ erro: 'Erro ao desativar o cliente. Verifique se a coluna "ativo" existe no banco.', detalhes: error.message });
    }
});

module.exports = router;