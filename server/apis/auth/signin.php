<?php
require __DIR__ . '/../../config/database.php';
require __DIR__ . '/../../config/cors.php';

use \Firebase\JWT\JWT;

try {
    if ($_SERVER['REQUEST_METHOD'] == "POST") {
        $params = json_decode(file_get_contents("php://input"));

        // Sanitizing data
        $username = htmlspecialchars(strip_tags($params->username));
        $password = htmlspecialchars(strip_tags($params->password));

        $query;
        $query = $mysqli->prepare('SELECT * FROM users WHERE username = ?');
        $query->bind_param('s', $username);

        $query->execute();
        $result = $query->get_result();

        if (mysqli_num_rows($result) == 0) {
            // User not authorized
            http_response_code(401);
        } else {
            $user = $result->fetch_assoc();
            if (password_verify($password, $user['password'])) {
                // Logon succeeded
                $secret_key = $_ENV['SECRET_KEY'];
                $payload = array(
                    'user_id' => $user['user_id'],
                    'full_name' => $user['full_name'],
                    'username' => $user['username'],
                );
                $jwt_token = JWT::encode($payload, $secret_key, 'HS256');
                http_response_code(200);
                echo json_encode(array('token' => $jwt_token));
            } else {
                // Logon failed (Incorrect password)
                http_response_code(401);
            }
        }
    } else {
        // 404 Not found (if the request type is wrong ...)
        http_response_code(404);
    }
} catch (Exception $e) {
    http_response_code(500);
}