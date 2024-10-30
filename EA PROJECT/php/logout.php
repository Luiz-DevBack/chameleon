<?php
    session_start();
    session_destroy(); //destroi a sessão atual
    header("Location: ../html/EaLogin.html"); //redireciona para a página de login
    exit(); //encerra o script
?>