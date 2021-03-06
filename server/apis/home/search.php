<?php
require __DIR__ . '/../../config/database.php';
require __DIR__ . '/../../config/cors.php';

use \Firebase\JWT\JWT;

try {
    if ($_SERVER['REQUEST_METHOD'] == "GET") {
        // Sanitizing data
        $min = htmlspecialchars(strip_tags($_GET['min']));
        $max = htmlspecialchars(strip_tags($_GET['max']));
        $location = htmlspecialchars(strip_tags($_GET['location']));
        $categories = htmlspecialchars(strip_tags($_GET['categories']));

        $categories_array = explode(",", $categories);

        // Getting all activities based on the filers
        $query = $mysqli->prepare('SELECT activity_id, category, description, price, location, full_name, username, country, gender, whatsapp, facebook, instagram, tiktok FROM activities AS activity INNER JOIN users AS user ON activity.user_id = user.user_id WHERE (price >= ?) AND (price <= ?) AND (location = ?)');
        $query->bind_param('dds', $min, $max, $location);
        $query->execute();
        $result = $query->get_result();

        if (mysqli_num_rows($result) == 0) {
            http_response_code(204);
        } else {
            $unfiltered_activities = [];

            while ($activity = $result->fetch_assoc()) {
                $unfiltered_activities[] = $activity;
            }

            $filtered_activities = [];
            for ($i = 0; $i < count($unfiltered_activities); $i++) {
                if (in_array($unfiltered_activities[$i]['category'], $categories_array)) {
                    $filtered_activities[] = $unfiltered_activities[$i];
                }
            }
            http_response_code(200);
            echo json_encode($filtered_activities);
        }
    } else {
        // 404 Not found (if the request type is wrong ...)
        http_response_code(404);
    }
} catch (Exception $e) {
    http_response_code(500);
}
