<?php
require __DIR__ . '/../../config/database.php';
require __DIR__ . '/../../config/cors.php';
if ($_SERVER['REQUEST_METHOD'] == "GET") {
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
    
        $query = $mysqli->prepare('SELECT activity.activity_id, category, description, location, price FROM bookmarks AS bookmark INNER JOIN activities AS activity ON activity.activity_id = bookmark.activity_id WHERE bookmark.user_id = ?');
        $query->bind_param('i', $user_id);

        try {
            $query->execute();
            $result = $query->get_result();

            if (mysqli_num_rows($result) == 0) {
                http_response_code(204);
            } else {
                $activities = [];

                while ($activity = $result->fetch_assoc()) {
                    $activities[] = $activity;
                }

                http_response_code(200);
                echo json_encode($activities);
            }
        } catch (Exception $e) {
            http_response_code(500);
        }
    } else {
        // Unauthorized (if the auth header was not set)
        http_response_code(401);
        echo json_encode(array('message' => 'User not authorized.'));
    }
} else {
    // Not found (if it was a post request)
    http_response_code(404);
    echo json_encode(array('message' => 'Request not processed.'));
}