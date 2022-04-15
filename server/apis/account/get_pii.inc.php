<?php
    require __DIR__ . '/../../db/config.inc.php';

    $user_id = $_GET['user_id'];
    $query = $mysqli->prepare('SELECT full_name, username, email, dob, country, gender, user_image FROM users WHERE user_id = ?');
    $query->bind_param('i', $user_id);

    $response;

    try {
        $query->execute();
        $result = $query->get_result();
        while ($user = $result->fetch_assoc()) {
            $response = $user;
        }
        $response['status'] = 200;
    } catch (mysqli_sql_exception $e) {
        // Unknown error
        $response = array('status' => 500);
    }
    echo json_encode($response);
?>