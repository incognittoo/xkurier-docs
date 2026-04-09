# xcourier_admin — Фичи

## auth — Аутентификация

- **Entities:** `AdminUserEntity` (uid, email, rememberMe)
- **Datasources:** `FirebaseAuthDatasource`
- **Repository:** `IAuthRepository` (interface) → `AuthRepositoryImpl`
- **Providers:** `AuthNotifier` — управляет состоянием через `AuthState`:
  - `AuthStatus.initial` → splash
  - `AuthStatus.authenticated` → основное приложение
  - `AuthStatus.unauthenticated` → login/register
  - `AuthStatus.blocked` → blocked screen
- **Экраны:** `LoginScreen`, `RegisterScreen`, `BlockedScreen`

## orders — Заказы

- **Entities:**
  - `OrderEntity` — заказ с enum `OrderStatus` (created, collecting, inDelivery, done, cancelled)
  - `OrderItemEntity` — товар в заказе
  - `OrderReportModels` — модели отчётов:
    - `OrderReportRange` — период (сегодня, 7 дней, 30 дней, месяц, произвольный)
    - `OrderReportQuery` — запрос отчёта (период + магазин)
    - `OrderReportSummary` — сводка (кол-во по статусам, сумма, средний чек)
    - `OrderReportStoreBreakdown` — разбивка по магазинам
    - `OrderReportPaymentBreakdown` — разбивка по способам оплаты
    - `OrderReportData` — полные данные отчёта с фабрикой `fromOrders()`
- **Datasources:** `FirebaseOrderDatasource`
- **Providers:** `OrdersProvider`, `OrderReportsProvider`
- **Экраны:** `OrdersScreen`, `OrderDetailScreen`, `OrderReportsScreen`
- **Виджеты:** `OrderCard`, `FilterChip`

## stores — Магазины

- **Entities:** `StoreEntity`, `StoreSchedule`, `StoreAddressSuggestion`
- **Datasources:** `FirebaseStoreDatasource`, `StoreAddressSuggestDatasource`
- **Providers:** `StoresProvider`, `StoreAddressSuggestProvider`
- **Экраны:** `StoresScreen`, `StoreFormScreen`, `StoreAddressSearchScreen`

## managers — Менеджеры

- **Entities:** `ManagerEntity` (uid, name, email, storeId, storeName, isActive, role)
- **Datasources:** `FirebaseManagerDatasource`
- **Providers:** `ManagersProvider`
- **Экраны:** `ManagersListScreen`, `ManagerFormScreen`

## banners — Баннеры

- **Entities:** `BannerEntity` (id, imageUrl, targetType, targetUrl, isActive, order)
- **Datasources:** `FirebaseBannerDatasource`
- **Providers:** `BannersProvider`
- **Экраны:** `BannersListScreen`, `BannerFormScreen`

## categories — Категории

- **Entities:** `CategoryEntity` (id, name, storeId, isEnabled, productCount, sortOrder)
- **Datasources:** `FirebaseCategoryDatasource`
- **Providers:** `CategoriesProvider`
- **Экраны:** `CategoriesScreen`

## support_tickets — Обращения

- **Entities:** `SupportTicketEntity` с enum `TicketStatus` (open, inProgress, closed)
- **Datasources:** `FirebaseSupportTicketDatasource`
- **Providers:** `SupportTicketsProvider`
- **Экраны:** `SupportTicketsScreen`, `TicketDetailScreen`
- **Виджеты:** `TicketCard`, `TicketStatusBadge`

## users — Пользователи

- **Entities:** `BlockedUserEntity`
- **Datasources:** `FirebaseUsersDatasource`
- **Providers:** `UsersProvider`
- **Экраны:** `BlockedUsersScreen`

## settings — Настройки

- **Entities:** `PaymentSettingsEntity` (cashEnabled, sbpEnabled, sbpPhone, sbpBank)
- **Экраны:**
  - `SettingsHubScreen` — главная настроек
  - `PaymentSettingsScreen` — настройки способов оплаты
  - `GlobalCategoriesScreen` — глобальные категории
