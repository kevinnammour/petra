<?php
    require __DIR__ . '/../../db/config.inc.php';

    $user_id = $_POST['user_id'];
    $whatsapp = $_POST['whatsapp'];
    $facebook = $_POST['facebook'];
    $instagram = $_POST['instagram'];
    $tiktok = $_POST['tiktok'];
    $tiktok = null;

    $query = $mysqli->prepare('UPDATE users SET whatsapp = ?, facebook = ?, instagram = ?, tiktok = ? WHERE user_id = ?');
    $query->bind_param('ssssi', $whatsapp, $facebook, $instagram, $tiktok, $user_id);

    $response;
    try {
        $query->execute();
        // User social networks information has been updated successfully
        $response = array('status' => 200);
    } catch(mysqli_sql_exception $e) {
        $response = array('status' => 500);
    }
    echo json_encode($response);
?>