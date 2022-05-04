<?php
require __DIR__ . '/../../config/database.php';
require __DIR__ . '/../../config/cors.php';
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
                echo json_encode(array('message' => 'User not authorized.'));
            }
            $params = json_decode(file_get_contents("php://input"));
            $activity_id = htmlspecialchars(strip_tags($params->activity_id));

            $query = $mysqli->prepare('DELETE FROM bookmarks WHERE user_id = ? AND activity_id = ?');
            $query->bind_param('ii', $user_id, $activity_id);
            $query->execute();
            http_response_code(200);
            echo json_encode(array('message' => 'Bookmark was removed successfully.'));
        } else {
            // Unauthorized (if the auth header was not set)
            http_response_code(401);
            echo json_encode(array('message' => 'User not authorized.'));
        }
    } else {
        http_response_code(404);
        echo json_encode(array('message' => 'Request not processed.'));
    }
} catch (Exception $e) {
    // Internal server error
    http_response_code(500);
    echo json_encode(array('message' => 'Internal server error.'));
}
