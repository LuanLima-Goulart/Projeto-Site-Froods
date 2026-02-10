const express = require('express');
const { cpf } = require('cpf-cnpj-validator');
const { pool } = require('../config/db');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const [rows] = await pool.execute('SELECT * FROM cliente');
        res.json(rows);
    } catch (error) {
        console.error('Erro ao consultar clientes: ', error);
        res.status(500).json({ error: 'Erro ao consultar cliente', details: error.message });
    }
});

router.post('/', async (req, res) => {
    const {
        nome,
        enderecoCliente,
        telefone,
        cpfValue
    } = req.body || {};

    // Validação de dados obrigatórios
    if (!nome || nome.trim() === '') {
        return res.status(400).json({
            error: 'Nome do cliente é obrigatório',
            message: 'Forneça um nome válido para o cliente'
        });
    }

    const nomeCliente = nome.trim();
    if (nomeCliente.length > 200) {
        return res.status(400).json({
            error: 'Nome muito longo',
            message: 'O nome do cliente deve ter no máximo 200 caracteres'
        });
    }

    if (cpf.isValid(cpfValue)) {
        return res.status(400).json({
            error: 'cpf inválido',
            message: 'Por favor digite um cpf válido'
        });
    }

    try {
        const [clienteExiste] = await pool.execute('SELECT * FROM cliente WHERE nome = ?', [nomeCliente]);
        if (clienteExiste.length > 0) {
            return res.status(409).json({
                error: 'Cliente já existe',
                message: `Já existe um Cliente com o nome "${nomeCliente}"`
            });
        }

        // Insere o novo cliente
        const query = `
      INSERT INTO cliente 
      (nome, enderecoCliente, telefone, cpf) 
      VALUES (?, ?, ?, ?)
    `;

        const [result] = await pool.execute(query, [
            nomeCliente,
            enderecoCliente,
            telefone,
            cpfValue,
        ]);

        // Busca o cliente inserido com informações da categoria para retornar os dados completos
        const queryCliente = `
      SELECT p.*, c.nome as cliente_nome
      FROM cliente p
      LEFT JOIN cliente c ON p.telefone = c.telefone
    `;
        const [novoCliente] = await pool.execute(queryCliente, [result.insertId]);

        res.status(201).json({
            message: 'Cliente criado com sucesso',
            cliente: novoCliente[0]
        });

    } catch (error) {
        console.error('Erro ao criar cliente:', error);
        res.status(500).json({ error: 'Erro ao criar cliente', details: error.message });
    }
});

router.delete('/:id/permanente', async (req, res) => {
    const clientesId = req.params.id;

    try {
        // Primeiro verifica se o produto existe
        const [clientes] = await pool.execute('SELECT * FROM cliente WHERE idCliente = ?', [clientesId]);
        if (clientes.length === 0) {
            return res.status(404).json({ erro: 'Cliente não encontrado' });
        }


        // Verifica se existem movimentações vinculadas
        const [movimentacoes] = await pool.execute('SELECT COUNT(*) as total FROM cliente WHERE idCliente = ?', [clientesId]);
        if (movimentacoes[0].total > 0) {
            return res.status(400).json({
                erro: 'Não é possível excluir permanentemente o cliente',
                message: `Existem ${movimentacoes[0].total} pedidos vinculados a este cliente. Use a rota de desativação (soft delete) em vez da exclusão permanente.`
            });
        }


        // Se não há movimentações, procede com a exclusão permanente
        const [result] = await pool.execute('DELETE FROM cliente WHERE idCliente = ?', [clientesId]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ erro: 'Cliente não encontrado' });
        }


        res.json({
            mensagem: 'Cliente excluído permanentemente com sucesso',
            cliente: clientes[0].nome,
            id: clientesId,
            AVISO: 'Esta ação é irreversível'
        });


    } catch (error) {
        console.error('Erro ao excluir permanentemente o cliente:', error);
        res.status(500).json({ erro: 'Erro ao excluir permanentemente o cliente', detalhes: error.message });
    }
});

// Rota para desativar o cliente (Soft Delete)
router.patch('/:id/desativar', async (req, res) => {
  const clienteId = req.params.id;

  try {
    // Verifica se o cliente existe
    const [cliente] = await pool.execute('SELECT * FROM cliente WHERE id_cliente = ?', [clienteId]);
    
    if (cliente.length === 0) {
      return res.status(404).json({ erro: 'Cliente não encontrado' });
    }

    // Atualiza o status para inativo (ativo = 0)
    await pool.execute('UPDATE cliente SET ativo = 0 WHERE id_cliente = ?', [clienteId]);

    res.json({
      mensagem: 'Cliente desativado com sucesso',
      cliente: cliente[0].nome,
      status: 'Inativo'
    });

  } catch (error) {
    console.error('Erro ao desativar cliente:', error);
    res.status(500).json({ erro: 'Erro ao desativar o cliente', detalhes: error.message });
  }
});

module.exports = router;