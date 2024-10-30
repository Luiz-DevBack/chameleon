CREATE DATABASE db_eastudio
CHARACTER SET utf8 COLLATE utf8_general_ci;

    USE db_eastudio;
    
    CREATE TABLE usuarios (
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        nome VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        senha VARCHAR(255) NOT NULL
    );
    
    INSERT INTO usuarios (nome, email, senha)
        VALUES (
            'Killian', 'killianj@gmail.com', '12345678'
        );

    CREATE TABLE servicos (
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        nome_servico VARCHAR(255) NOT NULL
    );

    CREATE TABLE horarios (
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        horario TIME NOT NULL
    );

    CREATE TABLE agendamento (
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        nome_cliente VARCHAR(255) NOT NULL,
        email_cliente VARCHAR(255) NOT NULL,
        id_servico INT,
        id_horario INT,
        data_agendamento DATE,
        FOREIGN KEY (id_servico) REFERENCES servicos(id),
        FOREIGN KEY (id_horario) REFERENCES horarios(id)
    );

    CREATE TABLE cliente (
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        nome_cliente VARCHAR(255) NOT NULL,
        email_cliente VARCHAR(255) NOT NULL,
        telefone_cliente VARCHAR(20)
    );

