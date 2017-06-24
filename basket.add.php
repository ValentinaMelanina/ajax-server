<?php

session_start(); // Стартуем сессию

$id = $_POST[ 'id_product' ]; // Передаем id товара на сервер
$quantity = $_POST[ 'quantity' ]; // Передаем количество товара

$basket = empty( $_SESSION['basket'] ) ? [] : $_SESSION['basket']; // Проверяем переменную
$index = false;
for ( $i = 0, $len = count( $basket ); $i < $len; $i++ ) {
    $item = $basket[ $i ];
    if ( $item['id_product'] == $id ) {
        $index = $i; // todo - не понятно ??
        break;
    }
}

if ( $index === false ) { // todo - не понятно ??
    $basket[] = [ // создаем массив с данными - ??
        'id_product' => $id,
        'price' => 100,
        'quantity' => $quantity,
    ];
}
else {
    $basket[ $index ]['quantity'] += $quantity; // todo - не понятно ??
}

$_SESSION['basket'] = $basket; // todo - не понятно ??

echo json_encode([ // todo - не понятно ??
    'result' => 1,
    'full_price' => 1000,
]);