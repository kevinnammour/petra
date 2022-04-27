<?php
require __DIR__ . '/../../config/database.php';
require __DIR__ . '/../../config/cors.php';

use \Firebase\JWT\JWT;

if ($_SERVER['REQUEST_METHOD'] == "GET") {
    $auth_headers = getallheaders();
    if (isset(($auth_headers['Authorization']))) {

        $jwt_token = $auth_headers['Authorization'];
        $jwt_token = explode(" ", $jwt_token)[1];

        try {
            $json_data = base64_decode(str_replace('_', '/', str_replace('-', '+', explode('.', $jwt_token)[1])));

            $token_data = json_decode($json_data);
            $user_id = $token_data->user_id;

            $query = $mysqli->prepare('SELECT full_name, username, email, country, gender, whatsapp, facebook, instagram, tiktok, user_image FROM users WHERE user_id = ?');
            $query->bind_param('i', $user_id);

            $query->execute();
            $result = $query->get_result();

            if (mysqli_num_rows($result) == 0) {
                // User not found
                http_response_code(404);
            } else {
                $user = $result->fetch_assoc();
                http_response_code(200);
                echo json_encode($user);
            }
        } catch (Exeception $e) {
            http_response_code(401);
        }
    } else {
        http_response_code(401);
    }
} else {
    http_response_code(404);
}
