<?php
    require __DIR__ . '/../../config/database.php';
    include_once __DIR__ . '/../../config/cors.php';

    if ($_SERVER['REQUEST_METHOD'] == "POST") {
        $params = json_decode(file_get_contents("php://input"));

        // Sanitizing data
        $full_name = htmlspecialchars(strip_tags($params->full_name));
        $username = htmlspecialchars(strip_tags($params->username));
        $email = htmlspecialchars(strip_tags($params->email));
        $password = htmlspecialchars(strip_tags($params->password));

        $hash = password_hash($password, PASSWORD_BCRYPT, array('cost' => 11));

        $query = $mysqli->prepare('INSERT INTO users (full_name, username, email, password) VALUES (?, ?, ?, ?)');
        $query->bind_param('ssss', $full_name, $username, $email, $hash);

        try {
            $query->execute();
            // User created successfully
            http_response_code(201);
        } catch (mysqli_sql_exception $e) {
            if ($e->getCode() == 1062) {
                // Conflict: Username or email already exist
                http_response_code(409);
            } else {
                // Internal error
                http_response_code(500);
            }
        }
    } else {
        // 404 Not found
        http_response_code(404);
    }
?>