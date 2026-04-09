# xcourier — Фичи

## Фичи приложения

### home — Главная страница

- **Страницы:** `HomePage`
- **Виджеты:** `HomeBannerSection`, `HomeStoreListSection`, `HomeSkeleton`
- **Данные:** загружаются через `HomeDataProvider` (баннеры + магазины параллельно)

### stores — Магазины

- **Entities:** `Store`, `StoreSchedule`
- **Use cases:** `GetStores`, `GetStoreById`
- **Datasources:** `StoreFirestoreDataSource`
- **Страницы:** `StoreDetailPage`
- **Виджеты:** `StoreCard`, `StoreProductList`, `StoreSkeleton`
- **Бизнес-логика:** расчёт статуса доступности (`StoreAvailabilityStatus`), форматирование времени доставки

### products — Товары

- **Entities:** `Product`
- **Use cases:** `GetProductsPaginated`
- **Datasources:** `ProductFirestoreDataSource`
- **Контроллеры:**
  - `ProductController` — детали товара
  - `ProductPaginatedController` — пагинация (extends `PaginatedNotifier`)
  - `ProductSearchController` — поиск
  - `ProductStoreController` — товары магазина
- **Страницы:** `ProductDetailPage`, `ProductSearchPage`
- **Виджеты:** `ProductCard`, `ProductTile`, `ProductBottomBar`, `ProductSearchButton`

### categories — Категории

- **Entities:** `Category`
- **Use cases:** `GetCategories`
- **Контроллеры:** `CategoryListControllers`, `SelectedCategoriesController`
- **Страницы:** `CategorySelectionPage`

### cart — Корзина

- **Entities:** `Cart`, `CartItem`
- **Хранение:** локально (не Firestore)
- **Datasources:** `CartLocalDataSource`
- **Контроллеры:** `CartController`
- **Страницы:** `CartPage`, `CheckoutPage`
- **Виджеты:** `CartItemTile`, `CartBottomBar`, `CartButtonTrash`
- **Бизнес-логика:** расчёт итоговой суммы, отслеживание изменения цен

### order — Заказы

- **Entities:** `OrderItem`, `Tariff`, `AddressSuggestion`
- **Datasources:**
  - `OrderFirestoreDataSource` — CRUD заказов
  - `AddressSuggestDatasource` — автоподсказки адресов
  - `DeliveryQuoteDatasource` — расчёт стоимости доставки
  - `TariffFirestoreDataSource` — фиксированные тарифы
  - `SuggestedAddressFirestoreDataSource` — сохранённые адреса
- **Контроллеры:**
  - `OrderProvider` — текущий заказ
  - `OrdersListController` — список заказов пользователя
  - `CheckoutController` — процесс оформления
  - `AddressSuggestController` — автоподсказки
  - `TariffProvider` — тарифы доставки
- **Страницы:** `OrdersPage`, `OrderDetailsPage`, `AddressSearchPage`
- **Виджеты:** `OrderCard`, `AddressForm`, `DeliveryMethodSelector`, `PaymentMethodSheet`, `CitySelector`, `CheckoutBottomBar`, `OrderConfirmationDialog`

### favorites — Избранное

- **Use cases:** `GetFavoriteStores`
- **Datasources:** `FavoriteFirestoreDataSource`
- **Контроллеры:** `FavoriteStoresController`, `FavoritesProviders`
- **Страницы:** `FavoritesPage`
- **Виджеты:** `FavoriteButton`, `FavoritePageSkeleton`

### profile — Профиль

- **Entities:** `AppUser`, `DeliveryAddress`
- **Services:** `UserFirestoreService`
- **Страницы:** `ProfilePage`, `UserAgreementPage`, `PrivacyPolicyPage`

### support — Поддержка

- **Entities:** `SupportTicket`
- **Datasources:** `SupportFirestoreDatasource`
- **Контроллеры:** `SupportProvider`, `SupportTicketsController`, `CreateTicketController`
- **Страницы:** `SupportTicketsPage`, `CreateTicketPage`, `TicketDetailPage`
- **Виджеты:** `TicketCard`

### banners — Баннеры

- **Entities:** `BannerAd`
- **Use cases:** `GetBanners`
- **Datasources:** `BannerFirestoreDataSource`, `BannerFakeDataSource`
- **Контроллеры:** `BannerListController`
- **Виджеты:** `BannerCarousel`
