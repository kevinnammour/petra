<?php
    require __DIR__ . '/../../config/database.php';
    require __DIR__ . '/../../config/cors.php';

    if($_SERVER['REQUEST_METHOD'] == "GET") {
        $params = json_decode(file_get_contents("php://input"));

        // Sanitizing data
        $min = htmlspecialchars(strip_tags($params->min));
        $max = htmlspecialchars(strip_tags($params->max));
        $min = htmlspecialchars(strip_tags($params->min));
        $min = htmlspecialchars(strip_tags($params->min));

    } else {
        http_response_code(404);
    }

    $min = $_GET['min'];
    $max = $_GET['max'];
    
?>