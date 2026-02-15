# 🍔 Projeto Froods

Bem-vindo ao **Froods**! Este projeto consiste em uma API completa para o gerenciamento de restaurantes, pedidos e clientes. Desenvolvido com foco em escalabilidade e organização, o sistema oferece uma solução backend robusta para aplicações de delivery e gestão de estabelecimentos.

---

## 🚀 Tecnologias Utilizadas

O projeto foi construído utilizando as seguintes tecnologias:

- **Node.js**: Ambiente de execução JavaScript.
- **Express**: Framework web rápido e minimalista.
- **MySQL**: Banco de dados relacional.
- **Dotenv**: Gerenciamento de variáveis de ambiente.

---

## 📂 Estrutura do Projeto

A arquitetura do projeto foi organizada para facilitar a manutenção e o entendimento do código:

### `config`
- **db**: Responsável pela conexão com o banco de dados e verificação de integridade da conexão.

### `src`
O núcleo da aplicação.
- **app.js**: Inicializa o servidor, gerencia middlewares, verifica a conexão com o banco e exporta a instância da aplicação.
- **index.js**: Ponto de entrada. Carrega as variáveis de ambiente (`.env`), importa o `app` e coloca o servidor no ar na porta definida.
- **server.js**: Centralizador de rotas. Importa e organiza os endpoints definidos na pasta `routes`.

### `routes`
Gerenciamento dos endpoints da API:
- **Alimentos**: CRUD completo (Consultar, Adicionar, Atualizar, Deletar) de itens do cardápio, incluindo preços e vinculação com restaurantes.
- **Clientes**: Gestão de cadastros de clientes (CPF, Endereço, Contato).
- **Pedidos**: Controle de fluxo de pedidos, status, pagamentos e vínculo entre cliente e restaurante.
- **Restaurantes**: Administração das unidades, incluindo dados cadastrais (CNPJ, Endereço).
- **Relatórios**: Geração de relatórios detalhados contendo informações consolidadas sobre pedidos, clientes e faturamento.

---

## 🛠️ Como Iniciar

Para executar este projeto em sua máquina local, siga os passos abaixo:

### Pré-requisitos
Certifique-se de ter o **Node.js** e o **npm** instalados.

### Instalação

1. Instale as dependências do projeto:
   ```bash
   npm install
   ```

2. Inicie o servidor:
   ```bash
   npm start
   ```

---

# Sapo

![meme](https://github.com/user-attachments/assets/2d4204bb-a77d-4c39-ac7d-922dbf203a15)