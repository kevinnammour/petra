<?php
require __DIR__ . '/../../config/database.php';
require __DIR__ . '/../../config/cors.php';

use \Firebase\JWT\JWT;

try {
    if ($_SERVER['REQUEST_METHOD'] == "POST") {
        $params = json_decode(file_get_contents("php://input"));

        // Sanitizing data
        $fullname = htmlspecialchars(strip_tags($params->fullname));
        $username = htmlspecialchars(strip_tags($params->username));
        $password = htmlspecialchars(strip_tags($params->password));

        $hash = password_hash($password, PASSWORD_BCRYPT, array('cost' => 11));

        $query = $mysqli->prepare('INSERT INTO users (full_name, username, password) VALUES (?, ?, ?)');
        $query->bind_param('sss', $fullname, $username, $hash);

        try {
            $query->execute();
            // User created successfully
            http_response_code(201);
        } catch (mysqli_sql_exception $e) {
            if ($e->getCode() == 1062) {
                // Conflict: Username already exists
                http_response_code(409);
            } else {
                // Internal error
                http_response_code(500);
            }
        }
    } else {
        // 404 Not found (if the request type is wrong ...)
        http_response_code(404);
    }
} catch (Exception $e) {
    echo $e;
    http_response_code(500);
}