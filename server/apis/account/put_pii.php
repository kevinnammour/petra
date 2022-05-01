<?php
require __DIR__ . '/../../config/database.php';
require __DIR__ . '/../../config/cors.php';
try {
    if ($_SERVER['REQUEST_METHOD'] == "PUT") {
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
            $full_name = htmlspecialchars(strip_tags($params->fullname));
            $country = htmlspecialchars(strip_tags($params->country));
            $gender = htmlspecialchars(strip_tags($params->gender));
            $whatsapp = htmlspecialchars(strip_tags($params->whatsapp));
            $tiktok = htmlspecialchars(strip_tags($params->tiktok));
            $facebook = htmlspecialchars(strip_tags($params->facebook));
            $instagram = htmlspecialchars(strip_tags($params->instagram));

            if ($user_id == null || $full_name == null || $country == null || $gender == null || $whatsapp == null || $tiktok == null | $facebook == null || $instagram == null) {
                // Not found (if some fields are missing)
                http_response_code(404);
                echo json_encode(array('message' => 'Some fields are missing.'));
            } else {
                $query = $mysqli->prepare('UPDATE users SET full_name = ?, country = ?, gender = ?, whatsapp = ?, tiktok = ?, facebook = ?, instagram = ? WHERE user_id = ?');
                $query->bind_param('sssssssi', $full_name, $country, $gender, $whatsapp, $tiktok, $facebook, $instagram, $user_id);
                $query->execute();
                // Unauthorized (if the auth header was not set)
                http_response_code(200);
                echo json_encode(array('message' => 'User personal information updated successfully.'));
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
} catch (Exception $e) {
    // Internal server error
    http_response_code(500);
    echo json_encode(array('message' => 'Internal server error.'));
}
