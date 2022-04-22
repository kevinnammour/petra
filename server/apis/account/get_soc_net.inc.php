<?php
    require __DIR__ . '/../../db/config.inc.php';

    $user_id = $_GET['user_id'];
    $query = $mysqli->prepare('SELECT whatsapp, instagram, facebook, tiktok, user_image FROM users WHERE user_id = ?');
    $query->bind_param('i', $user_id);

    $response;

    try {
        $query->execute();
        $result = $query->get_result();
        while ($user = $result->fetch_assoc()) {
            $response = $user;
        }
    } catch (mysqli_sql_exception $e) {
        // Unknown error
        $response = array('status' => 500);
    }
    echo json_encode($response);
?>