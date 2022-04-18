<?php
    require __DIR__ . '/../../config/database.php';
    include_once __DIR__ . '/../../config/cors.php';

    use \Firebase\JWT\JWT;

    $auth_headers = getallheaders();
    if(isset(($auth_headers['Authorization']))) {
        $jwt_token = $auth_headers['Authorization'];
        $jwt_token = explode(" ", $jwt_token)[1];

        try {
            $secret_key = "secret";
            $user_data=JWT::decode($jwt_token, $secret_key, array('HS256'));
        } catch (Exeception $e) {
            http_response_code(401);
        }
    }

    // $user_id = $_GET['user_id'];
    // $query = $mysqli->prepare('SELECT full_name, username, email, dob, country, gender, user_image FROM users WHERE user_id = ?');
    // $query->bind_param('i', $user_id);

    // $response;

    // try {
    //     $query->execute();
    //     $result = $query->get_result();
    //     while ($user = $result->fetch_assoc()) {
    //         $response = $user;
    //     }
    //     $response['status'] = 200;
    // } catch (mysqli_sql_exception $e) {
    //     // Unknown error
    //     $response = array('status' => 500);
    // }
    // echo json_encode($response);
?>