<?php
    $db_config = parse_ini_file("../.env");
    
    $db_host = $db_config['DB_HOST'];
    $db_user = $db_config['DB_USER'];
    $db_pass = $db_config['DB_PASS'];
    $db_name = $db_config['DB_NAME'];

    $mysqli = new mysqli($db_host, $db_user, $db_pass, $db_name);

    if(mysqli_connect_errno()) {
        die("Failed connection");
    }
?>