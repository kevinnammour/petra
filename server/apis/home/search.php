<?php
    require __DIR__ . '/../../config/database.php';
    require __DIR__ . '/../../config/cors.php';

    if ($_SERVER['REQUEST_METHOD'] == "GET") {
        // $params = json_decode(file_get_contents("php://input"));

        // Sanitizing data
        $min = htmlspecialchars(strip_tags($_GET['min']));
        $max = htmlspecialchars(strip_tags($_GET['max']));
        $location = htmlspecialchars(strip_tags($_GET['location']));
        $activities = htmlspecialchars(strip_tags($_GET['activities']));
        echo json_encode(array('activities' => $_GET['activities']));
        // print_r($_GET);

    } else {
        http_response_code(404);
    }
?>