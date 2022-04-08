<?php
    require(__DIR__ . '/../vendor/autoload.php');

    $dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . "./../");
    $dotenv->safeLoad();

    $db_host = $_ENV['DB_HOST'];
    $db_user = $_ENV['DB_USER'];
    $db_pass = $_ENV['DB_PASS'];
    $db_name = $_ENV['DB_NAME'];

    $mysqli = new mysqli($db_host, $db_user, $db_pass, $db_name);

    if (mysqli_connect_errno()) {
        die("Connection failed");
    }
?>