# xcourier_admin — Обзор

Административная панель для управления всеми аспектами платформы.

## Технологии

- Flutter + Riverpod
- `riverpod_annotation` + `riverpod_generator` (кодогенерация провайдеров)
- GoRouter (ShellRoute с Drawer)
- Freezed + json_serializable
- Firebase Auth, Firestore, Remote Config
- Equatable (для моделей отчётов)

## Особенности

- **Riverpod Generator** — type-safe провайдеры через аннотации (`@riverpod`)
- **ShellRoute** — единый Drawer для всех внутренних экранов
- **Remote Config** — управление force update, maintenance mode, connectivity
- **Отчёты** — аналитика заказов с группировкой по магазинам и способам оплаты
- **Именованные маршруты** — все пути в `AppRoutes` (абстрактный final class)
- **Auth flow** — 4 состояния: initial, authenticated, unauthenticated, blocked

## Навигация

```mermaid
graph TD
    Start["/splash"] --> Login["/login"]
    Start --> Register["/register"]
    Start --> Blocked["/blocked"]
    Start --> Shell

    subgraph Shell["MainShell (Drawer)"]
        Orders["/orders"]
        Reports["/reports/orders"]
        Stores["/stores"]
        Support["/support"]
        Settings["/settings"]
    end

    Orders --> OrderDetail["/orders/:id"]

    Stores --> StoreNew["/stores/new"]
    Stores --> StoreEdit["/stores/:storeId/edit"]
    Stores --> StoreAddress["/stores/address-search"]
    Stores --> StoreCategories["/stores/:storeId/categories"]

    Support --> TicketDetail["/support/:ticketId"]

    Settings --> Payment["/settings/payment"]
    Settings --> Managers["/settings/managers"]
    Settings --> Categories["/settings/categories"]
    Settings --> BlockedUsers["/settings/blocked-users"]
    Settings --> Banners["/settings/banners"]
    Banners --> BannerNew["/settings/banners/new"]
    Banners --> BannerEdit["/settings/banners/:bannerId/edit"]
```
