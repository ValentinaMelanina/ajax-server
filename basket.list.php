<?php

session_start(); // Стартуем сессию

echo json_encode([ // todo - не понятно ??
    'result' => 1,
    'basket' => $_SESSION['basket'],
]);