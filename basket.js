'use strict'; // Указываем, что код должен обрабатываться в строгом режиме

// Создаем корзину:
const Basket = (() => {
  // Получаем данные для отправки на сервер, передаем данные data конструктору FormData в виде массива:
  const getFormData = ( data ) => {

        // Создаем новый объект FormData для кодирования данных, которые необходимо отправить на сервер по
        // технологии Ajax с помощью метода POST:
      const form = new FormData,
            // Использую метод Object.keys(obj) вернем массив свойств объекта data, чтобы их (свойства) можно было
            // использовать в цикле for:
            keys = Object.keys( data );

          // Перебираем все ключи со свойствами объекта data и добавляем их в FormData (ключ-значение):
          for ( let i = keys.length; i--; ) {
            const key = keys[ i ],
              value = data[ key ];
            form.append( key, value );
          }
          // Возвращаем значение функции form:
          return form;
        },

      // Создаем объект с url:
        url = {
          add: 'basket.add.php',
          list: 'basket.list.php',
          remove: 'basket.remove.php'
        },
      // Получаем ID товара и его количество и обрабатываем его с помощью метода body:
    add = ( id_product, quantity ) => fetch( url.add, { // запрашиваем данные
        method: 'POST', // для отправки используем метод POST
        credentials: 'same-origin', // посылаем данные с cookie в рамках одного сайта (same-origin)
        body: getFormData({ // обрабатываем данные в виде, который указан в body
          id_product: id_product,
          quantity: quantity
        })
      })
      .then( response => response.json()), // получаем ответ в формате json

      // Формируем список товаров:
    list = id_user => fetch( url.list, {
        credentials: 'same-origin',
        method: 'POST',
      })
      .then( response => response.json()),

      // Очищаем корзину:
    remove = id_product => fetch( url.remove, {
        method: 'POST',
        credentials: 'same-origin',
        body: getFormData({
          id_product: id_product
        })
      })
      .then( response => response.json());
      return { // Возвращаем все значения с указанных функций
        add: add,
        list: list,
        remove: remove
      }
  })(); // Вызовем функцию Basket

// Формируем список с товарами:
const productsList = document.getElementById( 'products-list' ), // Найдем на странице элемент с id = products-list
  renderBasket = products => {
      // Очистим содержимое контейнера с id = products-list
    productsList.innerHTML = '';

    // Пробежимся по продуктам:
    for ( let i = 0, len = products.length; i < len ; i++ ) {
      const product = products[ i ], // Пронумируем товары
        productElement = document.createElement( 'a' ); // Создадим элемент с тегом "а" (ссылка)
      productElement.className = 'products-list__item'; // Добавим созданной ссылке класс
      productElement.setAttribute( 'data-id', product.id_product ); // Добавим ссылке атрибут data-id со значением
        // product.id_product
      productElement.textContent = `Товар # ${product.id_product}, Количество: ${product.quantity}`; // Добавим
        // текст в ссылку
      productElement.href = '#'; // и укажем адрес для ссылки
      productsList.appendChild( productElement ); // Добавим полученную ссылку в качестве дочернего элемента к productsList
    }
  };

// Добавляем товары в корзину при клике на ссылку "Добавить"
document.body.addEventListener( 'click', e => { // Создаем обработчик собития по клику
  const target = e.target; // Сохраняем в переменной данные о том, на каком элементе произошел клик
  if ( !target.classList.contains( 'product__add' )) { // Если клик был не по элементу с классом product__add
    return; // выходим из функции
  }

  const id = target.getAttribute( 'data-id' ), // Получаем значение атрибута data-id
    quantity = 1; // сразу задаем количество товаров

    console.log( id ); // выводим в консоль id товара
  Basket.add( id, quantity ) // Добавляем значение с id и количеством в Basket
  .then( data => { // todo - не понятно ??
    if ( !data.result ) {
      throw new Error( data.error_message ); // Выводим ошибку
    }
    
    return Basket.list(); // Возвращаем список с ссылками
  })
  .then( data => { // todo - не понятно ??
    if ( !data.result ) {
      throw new Error( data.error_message );
    }
    renderBasket( data.basket ); // todo - не понятно ??
  })
  .catch( e => { // Обрабатываем ошибки
    alert( e.message ); // и выводим их на экран
  });
});

// Удаляем товар из корзины:
document.body.addEventListener( 'click', e => { // Создаем обработчик по клику
  const target = e.target;
  if ( !target.classList.contains( 'products-list__item' )) {
    return;
  }
  e.preventDefault(); // Отменяем стандартное действие при клике на ссылке
  const id = target.getAttribute( 'data-id' ); // Получаем id из атрибута элемента products-list__item

  Basket.remove( id ) // Передаем id для удаления из корзины
  .then( data => {
    if ( !data.result ) { // todo - не понятно ??
      throw new Error( data.error_message );
      return;
    }
    return Basket.list(); // Получаем обновленный список
  })
  .then( data => { // todo - не понятно ??
    if ( !data.result ) {
      throw new Error( data.error_message );
    }
    renderBasket( data.basket ); // todo - не понятно ??
  })
  .catch( e => {
    alert( e.message );
  });
});

