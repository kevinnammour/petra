<?php
    require __DIR__ . '/../../config/database.php';
    require __DIR__ . '/../../config/cors.php';

    use \Firebase\JWT\JWT;

    if($_SERVER['REQUEST_METHOD'] == "POST") {
        $params = json_decode(file_get_contents("php://input"));

        // Sanitizing data
        $email_or_username = htmlspecialchars(strip_tags($params->emailorusername));
        $password = htmlspecialchars(strip_tags($params->password));

        $query;
        $regex = '/\@/';
        if (preg_match($regex, $email_or_username) === 1) {
            // If it includes a '@' character, it is intendec as an email
            $query = $mysqli->prepare('SELECT * FROM users WHERE email = ?');
        } else {
            // Since username cannot contain an @ (prohibited on sign up)
            $query = $mysqli->prepare('SELECT * FROM users WHERE username = ?');
        }
        $query->bind_param('s', $email_or_username);

        try {
            $query->execute();
            $result = $query->get_result();

            if (mysqli_num_rows($result) == 0) {
                // User not found
                http_response_code(404);
            } else {
                $user = $result->fetch_assoc();
                if (password_verify($password, $user['password'])) {
                    // Logon succeeded

                    $secret_key = "secret";
                    $payload = array(
                        'user_id' => $user['user_id'],
                        'full_name' => $user['full_name'],
                        'username' => $user['username'],
                        'email' => $user['email']
                    );
                    $jwt_token = JWT::encode($payload, $secret_key, 'HS256');
                    http_response_code(200);
                    $response = array('token' => $jwt_token);
                    echo json_encode($response);
                } else {
                    // Logon failed (Incorrect password)
                    http_response_code(401);
                }
            }
        } catch (Exception $e) {
            http_response_code(500);
        }
    } else {
        // 404 Not found
        http_response_code(404);
    }
?>