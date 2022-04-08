<?php
    require(__DIR__.'/../../db/config.inc.php');

    $email_or_username = $_POST['email_or_username'];
    $password = $_POST['password'];

    $query;
    $regex = '/\@/';
    if (preg_match($regex, $email_or_username) === 1) {
        // If it includes a '@' character, it is an email
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

    $hash = $response[0]['password'];
    $json_response;

    if (password_verify($password, $hash)) {
        $json_reponse = json_encode(array(
            'success' => true,
            'result' => $response[0],
        ));
    } else {
        $json_reponse = json_encode(array(
            'success' => false,
            'message' => 'Invalid credentials',
        ));
    }
    echo json_encode($json_response);
?>
