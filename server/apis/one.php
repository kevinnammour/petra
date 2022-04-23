<?php
    session_start();
    $_SESSION['name'] = 'kevin';
    echo session_id();
?>