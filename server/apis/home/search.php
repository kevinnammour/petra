<?php
require __DIR__ . '/../../config/database.php';
require __DIR__ . '/../../config/cors.php';

if ($_SERVER['REQUEST_METHOD'] == "GET") {
    // Sanitizing data
    $min = htmlspecialchars(strip_tags($_GET['min']));
    $max = htmlspecialchars(strip_tags($_GET['max']));
    $location = htmlspecialchars(strip_tags($_GET['location']));
    $categories = htmlspecialchars(strip_tags($_GET['categories']));

    $categories_array = explode(",", $categories);

    $query = $mysqli->prepare('SELECT activity_id, category, description, price, location, activity_image FROM activities WHERE (price >= ?) AND (price <= ?) AND (location = ?)');
    $query->bind_param('dds', $min, $max, $location);

    try {
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
    } catch (Exception $e) {
        http_response_code(500);
    }

} else {
    http_response_code(404);
}
