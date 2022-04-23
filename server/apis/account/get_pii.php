<?php
    session_start();
    echo $_SESSION['name'];
    echo session_id();
    // session_start();
    // // echo $_SESSION['user_id'];
    // echo session_id();

    // // require __DIR__ . '/../../config/database.php';
    include_once __DIR__ . '/../../config/cors.php';

    // // use \Firebase\JWT\JWT;

    // // if($_SERVER['REQUEST_METHOD'] == "GET") {
    // //     try {
    // //         if (isset($_SESSION['user_id']) && $_SESSION['user_id'] == 25) {
    // //             http_response_code(200);
    // //         } else {
    // //             http_response_code(401);
    // //         }
    // //         // $user_id = $_SESSION['user_id'];
    // //         // // echo $user_id;
    
    // //         // $query = $mysqli->prepare('SELECT full_name, username, email, dob, country, gender, user_image FROM users WHERE user_id = ?');
    // //         // $query->bind_param('i', $user_id);
    
    // //         // $response = [];
    
    // //         // try {
    // //         //     $query->execute();
    // //         //     $result = $query->get_result();
    // //         //     while ($user = $result->fetch_assoc()) {
    // //         //         $response[] = $user;
    // //         //     }
    // //         // } catch (Exception $e) {
    // //         //     http_response_code(500);
    // //         // }
    // //         // http_response_code(200);
    // //         // echo json_encode($response);
    // //     } catch (Exeception $e) {
    // //         http_response_code(401);
    // //     }
    // // } else {
    // //     http_response_code(404);
    // // }
?>