<?php
$servername = "localhost"; // colocar nome do server aqui
$username = "root@localhost"; //colocar nome de usuario aqui
$password = ""; // colocar senha aqui do server quando definir
$dbname = "db_eastudio"; // nome do banco de dados

// Criar a conexão
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar a conexão

if ($conn->connect_error) {
    die("Conexão falhou: ". $conn->connect_error);
}

// Criar a query
?>