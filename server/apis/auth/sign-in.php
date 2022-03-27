<?php
    require(__DIR__.'/../../db/connection.php');

    $email_or_username = $_POST['email_or_username'];
    $password = $_POST['password'];

    $query;
    $regex = '/\@/';
    if(preg_match($regex, $email_or_username) === 1) {
        $query = $mysqli->prepare("SELECT * FROM users WHERE email = ?");
    } else {
        // Since username cannot contain an @ (prohibited on sign up)
        $query = $mysqli->prepare("SELECT * FROM users WHERE username = ?");
    }
    $query->bind_param("s", $email_or_username);
    $query->execute();

    $array = $query->get_result();

    $response = [];
    
    while ($user = $array->fetch_assoc()) {
        $response[] = $user;
    }

    // $options = array('cost'=>11);
    $hash = $response[0]['password'];
    $json_response;

    if(password_verify($password, $hash)) {
        $json_response = array( 
            "user_id" => $response[0]['user_id']
        );
    } else {
        $json_response = array( 
            "status" => 401
        );
    }
    echo json_encode($json_response);
?>