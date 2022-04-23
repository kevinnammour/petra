<?php
    require __DIR__ . '/../../config/database.php';
    require __DIR__ . '/../../config/cors.php';

    use \Firebase\JWT\JWT;
    if ($_SERVER['REQUEST_METHOD'] == "POST") {
        $auth_headers = getallheaders();
        if(isset(($auth_headers['Authorization']))) {
            $jwt_token = $auth_headers['Authorization'];
            $json_data = base64_decode(str_replace('_', '/', str_replace('-', '+', explode('.', $jwt_token)[1])));

            $token_data = json_decode($json_data);
            $user_id = $token_data->user_id;
            echo json_encode(array('token' => $jwt_token));
        }
    }
?>