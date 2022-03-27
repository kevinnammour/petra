<?php
    include '../../db/connection.php';

    $full_name = $_POST['full_name'];
    $username = $_POST['username'];
    $email = $_POST['email'];
    $password = $_POST['password'];

    $hash = password_hash($password, PASSWORD_BCRYPT, array('cost'=>11));
    echo $hash;

    $query = $mysqli->prepare("INSERT INTO users (full_name, username, email, passowrd) VALUES (?, ?, ?, ?)");
    $query->bind_param("ssss", $full_name, $username, $email, $hash);
    $query->execute();
?>