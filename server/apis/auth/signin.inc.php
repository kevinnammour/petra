<?php
    require __DIR__ . '/../../db/config.inc.php';

    $email_or_username = $_POST['email_or_username'];
    $password = $_POST['password'];

    $query;
    $regex = '/\@/';
    if (preg_match($regex, $email_or_username) === 1) {
        // If it includes a '@' character, it is an email
        $query = $mysqli->prepare('SELECT * FROM users WHERE email = ?');
    } else {
        // Since username cannot contain an @ (prohibited on sign up)
        $query = $mysqli->prepare('SELECT * FROM users WHERE username = ?');
    }
    $query->bind_param('s', $email_or_username);

    $response;
    try {
        $query->execute();
        $result = $query->get_result();

        if (mysqli_num_rows($result) == 0) {
            // User not found
            $response = array('status' => 404);
        } else {
            $array = [];
            while ($user = $result->fetch_assoc()) {
                $array[] = $user;
            }
            $hash = $array[0]['password'];
            if (password_verify($password, $hash)) {
                // Logon succeeded
                $response = array('status' => 200);
            } else {
                // Logon failed
                $response = array('status' => 401);
            }
        }
    } catch (mysqli_sql_exception $e) {
        $response = array('status' => 500);
    }
    echo json_encode($response);
?>