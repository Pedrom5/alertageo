CREATE DATABASE IF NOT EXISTS alertageo;
USE alertageo;

CREATE TABLE IF NOT EXISTS perfis (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50) NOT NULL UNIQUE,
    descricao VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(120) NOT NULL,
    email VARCHAR(120) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    perfil_id INT NOT NULL,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_usuarios_perfis FOREIGN KEY (perfil_id) REFERENCES perfis(id)
);

CREATE TABLE IF NOT EXISTS areas_risco (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(120) NOT NULL,
    descricao TEXT,
    latitude DECIMAL(10, 7),
    longitude DECIMAL(10, 7),
    nivel_risco ENUM('baixo', 'medio', 'alto', 'muito alto') NOT NULL,
    status ENUM('ativo', 'em analise', 'resolvido') DEFAULT 'ativo',
    criador_id INT NOT NULL,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_areas_risco_usuarios FOREIGN KEY (criador_id) REFERENCES usuarios(id)
);

CREATE TABLE IF NOT EXISTS alertas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    categoria VARCHAR(80) NOT NULL,
    nivel_risco ENUM('baixo', 'medio', 'alto', 'muito alto') NOT NULL,
    descricao TEXT NOT NULL,
    latitude DECIMAL(10, 7),
    longitude DECIMAL(10, 7),
    status ENUM('novo', 'em analise', 'monitoramento', 'resolvido') DEFAULT 'novo',
    usuario_id INT NOT NULL,
    area_risco_id INT,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_alertas_usuarios FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    CONSTRAINT fk_alertas_areas FOREIGN KEY (area_risco_id) REFERENCES areas_risco(id)
);

CREATE TABLE IF NOT EXISTS historico_alertas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    alerta_id INT NOT NULL,
    descricao TEXT NOT NULL,
    usuario_id INT NOT NULL,
    data_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_historico_alertas_alertas FOREIGN KEY (alerta_id) REFERENCES alertas(id),
    CONSTRAINT fk_historico_alertas_usuarios FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

INSERT INTO perfis (nome, descricao) VALUES
('administrador', 'Responsável pela gestão geral do sistema.'),
('operador', 'Responsável por registrar e acompanhar ocorrências.'),
('cidadao', 'Usuário que envia alertas e visualiza informações relevantes.');
