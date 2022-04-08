<?php
    require __DIR__ . '/../../db/config.inc.php';

    $full_name = $_POST['full_name'];
    $username = $_POST['username'];
    $email = $_POST['email'];
    $password = $_POST['password'];

    $hash = password_hash($password, PASSWORD_BCRYPT, array('cost' => 11));

    $query = $mysqli->prepare("INSERT INTO users (full_name, username, email, password) VALUES (?, ?, ?, ?)");
    $query->bind_param("ssss", $full_name, $username, $email, $hash);

    $response;
    try {
        $query->execute();
        // 200 -> OK
        $response = array("status" => 200);
    } catch (mysqli_sql_exception $e) {
        // 409 -> Conflict
        $response = array("status" => 409);
    }
    echo json_encode($response);
?>