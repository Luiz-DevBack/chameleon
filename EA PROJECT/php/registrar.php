<?php
include 'db_connect.php';

if ($_SERVER['REQUEST_METHOD'] == "POST") {
    $nome = $_POST['nome'];
    $email = $_POST['email'];
    $senha = password_hash($_POST['senha'], PASSWORD_DEFAULT) ;

    //inserir no banco de dados
    $sql = "INSERT INTO usuarios (nome, email, senha)
    VALUES (?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sss", $nome, $email, $senha);
    
    if ($stmt->execute()) {
        echo ("Cadastro realizado com sucesso!");
    } else {
        echo "Erro ao registrar o usuario: ". $conn->error;
    }
}

?>