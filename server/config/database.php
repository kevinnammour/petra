<?php
    require(__DIR__ . '/../vendor/autoload.php');

    $dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . "./../");
    $dotenv->safeLoad();

    $db_host = $_ENV['DB_HOST'];
    $db_database = $_ENV['DB_DATABASE'];
    $db_username = $_ENV['DB_USERNAME'];
    $db_password = $_ENV['DB_PASSWORD'];

    $mysqli = new mysqli($db_host, $db_username, $db_password, $db_database);

    if (mysqli_connect_errno()) {
        die("Connection failed");
    }
?>