<?php
    $week = new DateTime('+1 week');
    setcookie('key', 'value', $week->getTimestamp(), '/', null, null, false);
?>