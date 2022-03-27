<?php
    require "../vendor/autoload.php";
    // loads the .env file
    $dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . './../');
    // suppresses any exception that is thrown if the .env does not exist
    $dotenv->safeLoad();
    
    $db_host = $_ENV['DB_HOST'];
    $db_user = $_ENV['DB_USER'];
    $db_pass = $_ENV['DB_PASS'];
    $db_name = $_ENV['DB_NAME'];

    $mysqli = new mysqli($db_host, $db_user, $db_pass, $db_name);

    if(mysqli_connect_errno()) {
        die("Failed connection");
    }
?>