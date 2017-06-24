<?php
    session_start();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Тестовая корзина</title>
</head>
<body>
    
    <div class="products">
        <div class="product__item">
            <div class="product__title">
                Тествый товар
            </div>
            <div class="product__price">340</div>
            <a href="#" class="product__add" data-id="18">Добавить</a>
        </div>
        <div class="product__item">
            <div class="product__title">
                Тествый товар
            </div>
            <div class="product__price">340</div>
            <a href="#" class="product__add" data-id="20">Добавить</a>
        </div>
        <div class="product__item">
            <div class="product__title">
                Тествый товар
            </div>
            <div class="product__price">340</div>
            <a href="#" class="product__add" data-id="181">Добавить</a>
        </div>
    </div>

    <div class="products-list" id="products-list">
        
    </div>

    <script src="basket.js"></script>
</body>
</html>