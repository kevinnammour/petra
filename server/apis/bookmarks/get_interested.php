<?php
require __DIR__ . '/../../config/database.php';
require __DIR__ . '/../../config/cors.php';

use \Firebase\JWT\JWT;

try {
    if ($_SERVER['REQUEST_METHOD'] == "GET") {
        $auth_headers = getallheaders();
        // if (isset(($auth_headers['Authorization']))) {
            // $user_id;
            // // Decoding the token to get the id of the user
            // try {
            //     $jwt_token = $auth_headers['Authorization'];
            //     $jwt_token = explode(" ", $jwt_token)[1];
            //     $json_data = base64_decode(str_replace('_', '/', str_replace('-', '+', explode('.', $jwt_token)[1])));
            //     $token_data = json_decode($json_data);
            //     if ($token_data !== null) {
            //         $user_id = $token_data->user_id;
            //     }
            // } catch (Exception $e) {
            //     // Unauthorized (if the token did not decode correctly)
            //     http_response_code(401);
            // }
            // if ($user_id !== null) {
                $activity_id = htmlspecialchars(strip_tags($_GET['activity_id']));
                $query = $mysqli->prepare('SELECT user.user_id, user.full_name, user.username, user.country, user.gender, user.whatsapp, user.facebook, user.instagram, user.tiktok FROM bookmarks AS bookmark INNER JOIN users AS user ON bookmark.user_id = user.user_id WHERE bookmark.activity_id = ?');
                $query->bind_param('i', $activity_id);

                $query->execute();
                $result = $query->get_result();

                if (mysqli_num_rows($result) == 0) {
                    http_response_code(204);
                } else {
                    $users = [];

                    while ($user = $result->fetch_assoc()) {
                        if($user['user_id'] !== $user_id) {
                            $users[] = $user;
                        }
                    }

                    http_response_code(200);
                    echo json_encode($users);
                }
            // }
        // } else {
        //     // Unauthorized (if the auth header was not set)
        //     http_response_code(401);
        // }
    } else {
        // 404 Not found (if the request type is wrong ...)
        http_response_code(404);
    }
} catch (Exception $e) {
    http_response_code(500);
}