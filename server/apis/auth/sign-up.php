<?php
    $full_name = $_POST['full_name'];
    $username = $_POST['username'];
    $email = $_POST['email'];
    $password = $_POST['password'];

    $hash = password_hash($password, PASSWORD_BCRYPT, array('cost'=>11));
    
?>