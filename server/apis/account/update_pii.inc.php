<?php
    require __DIR__ . '/../../db/config.inc.php';

    $user_id = $_POST['user_id'];
    $full_name = $_POST['full_name'];
    $dob = $_POST['dob'];
    $country = $_POST['country'];
    $gender = $_POST['gender'];
    $user_image = $_POST['user_image'];

    $query = $mysqli->prepare('UPDATE users SET full_name = ?, dob = ?, country = ?, gender = ?, user_image = ? WHERE user_id = ?');
    $query->bind_param('ssssbi', $full_name, $dob, $country, $gender, $user_image, $user_id);

    $response;

    try {
        $query->execute();
        // User information has been updated successfully
        $response = array('status' => 200);
    } catch (mysqli_sql_exception $e) {
        // Unknown error
        $response = array('status' => 500);
    }
    echo json_encode($response);
?>