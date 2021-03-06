<?php
require __DIR__ . '/../../config/database.php';
require __DIR__ . '/../../config/cors.php';

use \Firebase\JWT\JWT;

try {
    if ($_SERVER['REQUEST_METHOD'] == "POST") {
        $auth_headers = getallheaders();
        if (isset(($auth_headers['Authorization']))) {
            $user_id;
            // Decoding the token to get the id of the user
            try {
                $jwt_token = $auth_headers['Authorization'];
                $jwt_token = explode(" ", $jwt_token)[1];
                $json_data = base64_decode(str_replace('_', '/', str_replace('-', '+', explode('.', $jwt_token)[1])));
                $token_data = json_decode($json_data);
                if ($token_data !== null) {
                    $user_id = $token_data->user_id;
                }
            } catch (Exception $e) {
                // Unauthorized (if the token did not decode correctly)
                http_response_code(401);
            }
            if ($user_id !== null) {
                $params = json_decode(file_get_contents("php://input"));
                
                // Sanitizing data
                $category = htmlspecialchars(strip_tags($params->category));
                $description = htmlspecialchars(strip_tags($params->description));
                $price = htmlspecialchars(strip_tags($params->price));
                $location = htmlspecialchars(strip_tags($params->location));

                if ($category == null || $description == null || $price == null || $location == null) {
                    // Not found (if some fields are missing)
                    http_response_code(404);
                } else {
                    $query = $mysqli->prepare('INSERT INTO activities (user_id, category, description, price, location) VALUES (?, ?, ?, ?, ?)');
                    $query->bind_param('issss', $user_id, $category, $description, $price, $location);
                    $query->execute();
                    // Unauthorized (if the auth header was not set)
                    http_response_code(200);
                    echo json_encode(array('message' => 'Activity was added successfully.'));
                }
            }
        } else {
            // Unauthorized (if the auth header was not set)
            http_response_code(401);
        }
    } else {
        // 404 Not found (if the request type is wrong ...)
        http_response_code(404);
    }
} catch (Exception $e) {
    http_response_code(500);
}
