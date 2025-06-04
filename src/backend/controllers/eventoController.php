<?php

session_start();
require_once '../connection.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_GET['id'])) {
        $id = $_GET['id'];
        
        // Consulta SQL para buscar um evento específico
        $stmt = $pdo->prepare("SELECT * FROM evento WHERE evid = :id");
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute();
        
        $data = $stmt->fetch(PDO::FETCH_ASSOC);
    } else {
        // Consulta para listar todos os eventos
        $stmt = $pdo->query("SELECT * FROM evento");
        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    exit(json_encode($data));
}

if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    // Obtendo o corpo da requisição (JSON enviado)
    $input = json_decode(file_get_contents("php://input"), true);

    if (isset($_GET['id']) && isset($input['evnome']) && isset($input['evdesc']) && isset($input['evend']) && isset($input['evtipo']) && isset($input['evdata'])) {
        $id = $_GET['id'];
        $nome = $input['evnome'];
        $desc = $input['evdesc'];
        $endereco = $input['evend'];
        $tipo = $input['evtipo'];
        $data = $input['evdata'];

        // Atualiza o evento no banco de dados
        $stmt = $pdo->prepare("UPDATE evento SET evnome = :nome, evdesc = :desc, evend = :endereco, evtipo = :tipo, evdata = :data WHERE evid = :id");
        $stmt->bindParam(':nome', $nome, PDO::PARAM_STR);
        $stmt->bindParam(':desc', $desc, PDO::PARAM_STR);
        $stmt->bindParam(':endereco', $endereco, PDO::PARAM_STR);
        $stmt->bindParam(':tipo', $tipo, PDO::PARAM_STR);
        $stmt->bindParam(':data', $data, PDO::PARAM_STR);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);

        if ($stmt->execute()) {
            exit(json_encode(["message" => "Evento atualizado com sucesso!"]));
        } else {
            exit(json_encode(["error" => "Erro ao atualizar evento."]));
        }
    } else {
        exit(json_encode(["error" => "Parâmetros inválidos para atualização."]));
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Obtendo o corpo da requisição (JSON enviado)
    $input = json_decode(file_get_contents("php://input"), true);

    if (isset($input['evnome']) && isset($input['evdesc']) && isset($input['evend']) && isset($input['evtipo']) && isset($input['evdata'])) {
        $nome = $input['evnome'];
        $desc = $input['evdesc'];
        $endereco = $input['evend'];
        $tipo = $input['evtipo'];
        $data = $input['evdata'];

        // Insere novos eventos no campo01
        $stmt = $pdo->prepare("INSERT INTO evento (evnome, evdesc, evend, evtipo, evdata) VALUES (:nome, :desc, :endereco, :tipo, :data)");
        $stmt->bindParam(':nome', $nome, PDO::PARAM_STR);
        $stmt->bindParam(':desc', $desc, PDO::PARAM_STR);
        $stmt->bindParam(':endereco', $endereco, PDO::PARAM_STR);
        $stmt->bindParam(':tipo', $tipo, PDO::PARAM_STR);
        $stmt->bindParam(':data', $data, PDO::PARAM_STR);

        if ($stmt->execute()) {
            exit(json_encode(["message" => "Evento criado com sucesso!", "id" => $pdo->lastInsertId()]));
        } else {
            exit(json_encode(["error" => "Erro ao criar evento."]));
        }
    } else {
        exit(json_encode(["error" => "Parâmetros inválidos para criação."]));
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    if (isset($_GET['id'])) {
        $id = $_GET['id'];

        // Consulta SQL pra deletar o evento
        $stmt = $pdo->prepare("DELETE FROM evento WHERE evid = :id");
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);

        if ($stmt->execute()) {
            exit(json_encode(["message" => "Evento removido com sucesso!"]));
        } else {
            exit(json_encode(["error" => "Erro ao deletar evento."]));
        }
    } else {
        exit(json_encode(["error" => "Parâmetro 'id' não informado para exclusão."]));
    }
}

?>
