<?php 

// Configura os headers CORS e JSON
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: POST, GET, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With'); 
header('Content-Type: application/json; charset=utf-8');  


// Conexão com o banco de dados
$database = 'campo01';
$host = 'localhost';
$username = 'root';
$pass = 'falconStudio';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$database", "$username", "$pass", [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
		
    ]);
} catch (PDOException $e) {
    echo json_encode(["error" => "Erro ao conectar com o banco!", "details" => $e->getMessage()]);
}

?>