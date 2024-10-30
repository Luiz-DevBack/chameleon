<?php
session_start();
include 'db_connection.php'; //inclui a conexão com o banco de dados

if ($_SERVER['REQUEST_METHOD'] == 'POST'){
    $email = $_POST['email'];
    $password = $_POST['password'];

    // Filtrando a entrada para evitar problemas de injeção de codigo
    $email = filter_var($email, FILTER_SANITIZE_EMAIL);
    
    // Verifica se o usuario existe
    $sql = "SELECT * FROM usuarios WHERE email = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('s', $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        // Encontra o usuario
        $user = $result->fetch_assoc();
        
        // Verifica a senha com hash
        if (password_verify($senha, $user ['senha'])) {
            $_SESSION['user_id'] = $user['id']; //armazena o id do usuario na sessão
            header("location: area_restrita.php"); // Redireciona para a areá restrita
            exit();
        }else {
            header("location: ../html/Ealogin.html?erro=Senha incorreta!"); // Redireciona caso a senha seja incorreta
            exit();
        }
    }else{
        header("location: ../html/Ealogin.html?erro=Usuário não encontrado!"); // Redireciona caso o usuario não seja encontrado
        exit();
    }
}
?>