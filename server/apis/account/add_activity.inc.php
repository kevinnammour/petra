<?php
    require __DIR__ . '/../../db/config.inc.php';

    $user_id = $_POST['user_id'];
    $category = $_POST['category'];
    $description = $_POST['description'];
    $price = $_POST['price'];
    $latitude = $_POST['latitude'];
    $longitude = $_POST['longitude'];
    $activity_image = $_POST['activity_image'];

    $query = $mysqli->prepare("INSERT INTO activities (user_id, category, description, price, latitude, longitude, activity_image) VALUES (?, ?, ?, ?, ?, ?, ?)");
    $query->bind_param("issdddb", $user_id, $category, $description, $price, $latitude, $longitude, $activity_image);

    $response;
    try {
        $query->execute();
        // Activity has been created successfully
        $response = array('status' => 200);
    } catch (mysqli_sql_exception $e) {
        $response = array('status' => 500);
    }
    echo json_encode($response);
?>