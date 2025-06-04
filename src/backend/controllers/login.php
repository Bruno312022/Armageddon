<?php
session_start();
require_once '../connection.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents("php://input"), true);

    if (!isset($input['email']) || !isset($input['senha'])) {
        exit(json_encode(["error" => "Email e senha são obrigatórios."]));
    }

    $email = $input['email'];
    $senha = $input['senha'];

    // Verificar se usuário existe
    $stmt = $pdo->prepare("SELECT id, nome, tipo, senha FROM users WHERE email = :email");
    $stmt->bindParam(':email', $email, PDO::PARAM_STR);
    $stmt->execute();

    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user && $user['senha'] === $senha) { // Se usar senha hash, troque por password_verify($senha, $user['senha'])
        exit(json_encode(["success" => true, "token" => md5(uniqid()), "user" => $user]));
    } else {
        exit(json_encode(["success" => false, "error" => "Usuário ou senha incorretos."]));
    }
}
?>
