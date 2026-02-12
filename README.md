# "PROJETO FROODS"

# Pasta: 'config', arquivo: 'db'
 * Permite a gente ter acesso ao nosso banco de dados e saber se q conecção está funcionando.

# Pasta: 'routes'

## alimentos
 *  Através dele é possível ver os alimentos registrados, vendo seu nome, preço, categoria, id do restaurante e a qual restaurante pertence o alimento. Também tem a capacidade de deletar o alimento do banco de dados, adicionar um novo alimento no banco de dados e atualizar algum alimento no banco de dados.

## clientes
 * Através dele é possível ver os clientes registrados, vendo o id do cliente, endereço, telefone, cpf e se está ativo. Também é capaz de deletar um cliente e adicionar um cliente.

## pedidos
 * Através dele é possível ver os pedidos feitos, vendo o id do pedido, valor total, forma de pagamento, status do pedido, id do cliente e id do restaurante. Também é capaz de deletar pedidos.

## relatorios
 * É o relatório completo de todos os pedidos, mostrando o nome dos clientes, nome dos resturantes, id dos pedidos, os alimentos pedidos, a quantidade pedida, o preço dos pedidos e o status dos pedidos.

## restaurantes
 * Através dele é possível ver os restaurantes registrados, vendo o id do restaurante, nome, tipo do restaurante, endereço, telefone e cnpj.

# Pasta: 'src'
 * Aqui está o código fonte do projeto. Nele contém todas as pastas já mencionadas acima. O arquivo 'app.js' é responsável por iniciar o servidor, gerenciar as rotas, verificar a conexão com o banco de dados e exportar o app. 
 * O arquivo 'index.js' ele é responsável por colocar o servidor no ar, carrega configurações, a linha 'require('dotenv').config();' é responsável por carregar o arquivo .env, a linha 'const app = require('./app');' é responsável por importar o app, a linha 'const PORT = process.env.PORT || 3001;' é responsável por definir a porta do servidor, a linha 'app.listen(PORT, () => {' é responsável por iniciar o servidor.
 * O arquivo 'server.js' ele funciona como um centralizador de rotas da aplicação, importa as rotas específicas da pasta 'routes', organiza os caminhos, ele define os prefixos para acessar essas rotas e exporta a configuração, ele exporta esse conjunto de rotas configuradas para ser usado pelo 'app.js'.

## Aqui ficam instruções de inicialização, formas de acesso, demonstração de uso, etc

 * Escrito através de linguagem de marcação - md = Markdown
 * Utiliza uma sintaxe leve e fácil de aprender, com símbolos como # para títulos e * para listas.

 ### Para iniciar o projeto:
 * npm install
 * npm start

# Sapo

![meme](https://github.com/user-attachments/assets/2d4204bb-a77d-4c39-ac7d-922dbf203a15)