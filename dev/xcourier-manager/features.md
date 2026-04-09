# xcourier_manager — Фичи

## auth — Аутентификация

- **Entities:** `Manager` (id, email, storeId, storeName, managerName, isActive)
- **Datasources:** `AuthFirestoreDatasource` — проверка credentials в коллекции `staff`
- **Контроллеры:** `AuthController` — `AsyncNotifier<Manager?>`, обрабатывает login/logout
- **Страницы:** `LoginPage`, `BlockedPage`
- **Redirect:** GoRouter слушает `authControllerProvider` — при изменении auth state перенаправляет на соответствующий экран

## orders — Заказы

- **Entities:**
  - `ManagerOrder` — заказ с полями: id, storeId, orderNumber, clientName, clientPhone, status, items, totalPrice и др.
  - `OrderProduct` — товар в заказе
- **Constants:** `OrderStatus` — строковые константы статусов (Создан, Собирается, Собран, В пути, Завершен, Отменен)
- **Datasources:** `OrderFirestoreDatasource` — stream заказов магазина, смена статуса, обновление
- **Контроллеры:**
  - `OrdersStreamController` — stream активных заказов (StreamProvider)
  - `OrderDetailController` — детали конкретного заказа
- **Страницы:**
  - `OrdersPage` — список активных заказов (основной экран)
  - `AllOrdersPage` — архив всех заказов
  - `OrderDetailsPage` — детали заказа со сменой статуса
  - `EditOrderPage` — редактирование заказа (товары, количество)
  - `AddProductToOrderPage` — добавление товара из каталога в заказ
- **Виджеты:** `OrderCard`, `OrderProductItem`, `StatusDropdownSheet`

## products — Товары

- **Entities:**
  - `ManagerProduct` — товар (id, storeId, name, imageUrl, weight, price, isAvailable, inStock, categoryIds, description, sortOrder)
  - `ManagerCategory` — категория (id, storeId, name, sortOrder, isActive)
- **Datasources:** `ProductFirestoreDatasource` — CRUD товаров и категорий магазина
- **Контроллеры:**
  - `ProductsController` — список товаров магазина
  - `AddEditProductController` — создание/редактирование товара
- **Страницы:**
  - `ProductsPage` — каталог (сетка/список)
  - `AddEditProductPage` — форма создания/редактирования
  - `ProductSearchPage` — поиск по названию
  - `OutOfStockPage` — товары не в наличии
  - `CategoriesFilterPage` — фильтр по категориям
- **Виджеты:** `ProductGridCard`, `ProductListTile`, `ProductGrid`

## splash — Загрузка

- **Страницы:** `SplashPage` — начальный экран, проверяет auth state и перенаправляет
