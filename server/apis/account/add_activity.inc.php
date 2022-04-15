<?php
    require __DIR__ . '/../../db/config.inc.php';
    require(__DIR__ . '/../../vendor/autoload.php');

    $user_id = $_POST['user_id'];
    $category = $_POST['category'];
    $description = $_POST['description'];
    $price = $_POST['price'];
    $latitude = $_POST['latitude'];
    $longitude = $_POST['longitude'];
    $activity_image = $_POST['activity_image'];

    // Getting a readable address for that activity based on the lat and long
    // More specifically, we are getting the country, and county
    $ACCESS_KEY = $_ENV['ACCESS_KEY'];
    $loc_api = "http://api.positionstack.com/v1/reverse?access_key=$ACCESS_KEY&query=$latitude,$longitude";
    $loc_api_res = file_get_contents($loc_api);
    $std_obj = json_decode($loc_api_res);
    $address = json_decode(json_encode($std_obj), true);
    $country = $address['data'][0]['country'];
    $county = $address['data'][0]['county'];


    $query = $mysqli->prepare("INSERT INTO activities (user_id, category, description, price, latitude, longitude, country, county, activity_image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $query->bind_param("issdddssb", $user_id, $category, $description, $price, $latitude, $longitude, $country, $county, $activity_image);

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