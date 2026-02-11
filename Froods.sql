create database Froods;
use Froods;

create table cliente (
	idCliente int primary key auto_increment,
    nome varchar(100) not null,
    enderecoCliente varchar(300) not null,
    telefone varchar(20) not null unique,
    cpf varchar(11) not null unique
);

create table restaurante (
	idRestaurante int primary key auto_increment,
    nome varchar(200) not null,
    tipoRestaurante varchar(50) not null,
    enderecoRestaurante varchar(300) not null,
    telefone varchar(20) not null unique,
    cnpj varchar(14) not null unique
);

create table alimento (
	idAlimento int primary key auto_increment,
	nome varchar(200) not null,
    preco decimal(8,2) not null,
    categoria varchar(50) not null,
    idRestaurante int,
    foreign key (idRestaurante) references restaurante(idRestaurante) on delete cascade
);

create table pedidos (
	idPedido int primary key auto_increment,
    valorTotal decimal(10,2) not null,
    formaPagamento varchar(20) not null,
    stats varchar(30) not null,
    idCliente int,
    idRestaurante int,
    FOREIGN KEY (idCliente) REFERENCES cliente(idCliente) on delete cascade,
    FOREIGN KEY (idRestaurante) REFERENCES restaurante(idRestaurante) on delete cascade
);

create table itensPedido (
    idItemPedido int primary key auto_increment,
    idPedido int,
    idAlimento int,
    quantidade int not null,
    precoUnitario decimal(8,2) not null,
    FOREIGN KEY (idPedido) REFERENCES pedidos(idPedido) on delete cascade,
    FOREIGN KEY (idAlimento) REFERENCES alimento(idAlimento)
);

insert into cliente
(nome, enderecoCliente, telefone, cpf)
values ('gustavo h b', 'rua pantanal', '01 1234-5678', '11122233300'),
('luan l', 'rua limoeiro', '01 4321-8765', '00033322211'),
('lucas edu', 'rua senai', '01 1234-8765', '22233300011'),
('sapo pe sujo', 'rua lagoa', '10 1100-0011', '33322211100');

insert into restaurante
(nome, tipoRestaurante, enderecoRestaurante, telefone, cnpj)
values ('donald king', 'fast food', 'rua fritas', '01 4444-5555', '12344456666611'),
('padaria do zé', 'padaria', 'rua massas', '01 2222-8888', '11122255544333'),
('marmitaria da tia maria', 'caseiro', 'rua liberdade', '01 8002-8922', '22982008001122'),
('assados do zé e filhos', 'assadão', 'rua quente', '10 5555-3333', '32132100077798');

insert into alimento
(nome, preco, categoria, idRestaurante)
values ('refrigerante', 3.50, 'bebida', 1),
('hamburguer', 6.50, 'fastfood', 1),
('pastel', 4.75, 'fastfood', 1),
('panqueca', 5.00, 'cafê da manhã', 2),
('suco natural', 3.50, 'bebida', 2),
('waffle', 3.50, 'cafê da manhã', 2),
('marmita', 15.00, 'almoço', 3),
('cento de salgado', 30.50, 'especial', 4),
('churrasco', 35.50, 'especial', 4),
('pizza', 25.99, 'especial', 4);

insert into pedidos
(valorTotal, formaPagamento, stats, idCliente, idRestaurante)
Values (6.50, 'débito', 'preparando', 1, 1),
(25.99, 'débito', 'em rota para entrega', 2, 4),
(15.00, 'crédito', 'entregue', 3, 3),
(3.50, 'moedas', 'preparando', 4, 2);

insert into itensPedido
(idPedido, idAlimento, quantidade, precoUnitario)
values (1, 2, 2, 6.50),
(2, 10, 1, 25.99),
(3, 7, 3, 15.00),
(4, 5, 1, 3.50);