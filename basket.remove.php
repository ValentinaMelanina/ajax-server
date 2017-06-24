<?php

session_start(); // Запускаем сессию

$id = $_POST[ 'id_product' ]; // Передаем данные ID на сервер

// Проверяем переменную basket, если у нее нет данных, то возвращаем пустой массив, иначе возвращаем ее значение:
$basket = empty( $_SESSION['basket'] ) ? [] : $_SESSION['basket'];
$index = false; // todo - не понятно ??

// Пробегаемся по корзине и каждый ее элемент заносим в переменную item:
for ( $i = 0, $len = count( $basket ); $i < $len; $i++ ) {
    $item = $basket[ $i ];
    if ( $item['id_product'] == $id ) { // Если значение item = id, то переменная index получает порядковый номер
		// итерации и выходим из цикла
        $index = $i;
        break;
    }
}

if ( $index !== false ) { // Если значение index = true, то добавим его в массив basket
    array_splice( $basket, $index, 1 );
}

$_SESSION['basket'] = $basket; // todo - не понятно ??

echo json_encode([ // todo - не понятно ??
    'result' => 1,
    'full_price' => 1000,
]);