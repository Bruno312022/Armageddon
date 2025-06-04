<?php

session_start();
require_once '../connection.php';


if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_GET['id'])) {
        $id = $_GET['id'];
        
        //consulta SQL
        $stmt = $pdo->prepare("SELECT * FROM users WHERE id = :id");
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute();
        
        $data = $stmt->fetch(PDO::FETCH_ASSOC);
    } else {
        $stmt = $pdo->query("SELECT * FROM users");
        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    exit(json_encode($data));
}

if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    // Obtendo o corpo da requisição (JSON enviado)
    $input = json_decode(file_get_contents("php://input"), true);
    
    if (isset($input[0])) { // Ajuste para ler os dados corretamente, pois estava com um nivel extra de encapsulamento -- ...droga...
        $input = $input[0];
    }

    if (isset($_GET['id']) && isset($input['nome']) && isset($input['email']) && isset($input['senha'])  && isset($input['telefone'])  && isset($input['tipo'])) {
        $id = $_GET['id'];
        $nome = $input['nome'];
        $email = $input['email'];
        $senha = $input['senha'];
        $telefone = $input['telefone'];
        $tipo = $input['tipo'];

         // Validando o tipo antes de prosseguir
    if (!in_array($tipo, ["admin", "usuario", "colaborador"])) {
        exit(json_encode(["error" => "Tipo inválido. O tipo deve ser 'admin' ou 'usuario'."]));
    }

        // Atualiza o registro no banco de dados
        $stmt = $pdo->prepare("UPDATE users SET nome = :nome, email = :email, senha = :senha, telefone = :telefone, tipo = :tipo WHERE id = :id");
        $stmt->bindParam(':nome', $nome, PDO::PARAM_STR);
        $stmt->bindParam(':email', $email, PDO::PARAM_STR);
        $stmt->bindParam(':senha', $senha, PDO::PARAM_STR);
        $stmt->bindParam(':telefone', $telefone, PDO::PARAM_STR);
        $stmt->bindParam(':tipo', $tipo, PDO::PARAM_STR);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        
        if ($stmt->execute()) {
            exit(json_encode(["message" => "Usuário atualizado com sucesso!"]));
        } else {
            exit(json_encode(["error" => "Erro ao atualizar usuário."]));
        }
    } else {
        exit(json_encode(["error" => "Parâmetros inválidos para atualização."]));
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Obtem o corpo da requisição (JSON enviado)
    $input = json_decode(file_get_contents("php://input"), true);

   if (isset($input['nome']) && isset($input['email']) && isset($input['senha'])  && isset($input['telefone'])  && isset($input['tipo'])) {
        $nome = $input['nome'];
        $email = $input['email'];
        $senha = $input['senha'];
        $telefone = $input['telefone'];
        $tipo = $input['tipo'];
        

    // Validando o tipo antes de prosseguir
     if (!in_array($tipo, ["admin", "usuario", "colaborador"])) {
        exit(json_encode(["error" => "Tipo inválido. O tipo deve ser 'admin' ou 'usuario'."]));
    }
        // Insere o novo usuário no banco de dados
        $stmt = $pdo->prepare("INSERT INTO users (nome, email, senha, telefone, tipo) VALUES (:nome, :email, :senha, :telefone, :tipo)");
        $stmt->bindParam(':nome', $nome, PDO::PARAM_STR);
        $stmt->bindParam(':email', $email, PDO::PARAM_STR);
        $stmt->bindParam(':senha', $senha, PDO::PARAM_STR);
        $stmt->bindParam(':telefone', $telefone, PDO::PARAM_STR);
        $stmt->bindParam(':tipo', $tipo, PDO::PARAM_STR);

        if ($stmt->execute()) {
            exit(json_encode(["message" => "Usuário criado com sucesso!", "id" => $pdo->lastInsertId()]));
        } else {
            exit(json_encode(["error" => "Erro ao criar usuário."]));
        }
    } else {
        exit(json_encode(["error" => "Parâmetros inválidos para criação."]));
    }
}


if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    if (isset($_GET['id'])) {
        $id = $_GET['id'];

        //consulta SQL
        $stmt = $pdo->prepare("DELETE FROM users WHERE id = :id");
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);

        if ($stmt->execute()) {
            exit(json_encode(["message" => "Usuário aniquilado com sucesso!"]));
        } else {
            exit(json_encode(["error" => "Erro ao deletar usuário."]));
        }
    } else {
        exit(json_encode(["error" => "Parâmetro 'id' não informado para exclusão."]));
    }

}




    

?>