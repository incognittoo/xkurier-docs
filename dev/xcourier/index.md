# xcourier — Обзор

Клиентское мобильное приложение для покупателей.

## Технологии

- Flutter + Riverpod
- GoRouter (StatefulShellRoute для табов)
- Freezed + json_serializable
- Firebase Auth (анонимный + телефон)
- Cloud Firestore (real-time)
- Firebase Cloud Messaging (push)

## Ключевые зависимости

- `flutter_riverpod` — state management
- `go_router` — навигация
- `freezed_annotation` / `json_annotation` — кодогенерация
- `cloud_firestore` — база данных
- `firebase_auth` — аутентификация
- `firebase_messaging` — push-уведомления
- `flutter_svg` — SVG иконки
- `cached_network_image` — кеширование изображений

## Точка входа

`lib/main.dart` → `lib/app/app.dart` — `MaterialApp.router` обёрнутый в `ProviderScope`.

## Навигация

GoRouter с `StatefulShellRoute.indexedStack` для нижних табов:

```mermaid
graph TD
    Start[/startup] --> Shell

    subgraph Shell["Bottom Navigation (4 вкладки)"]
        Tab0["/home — Главная"]
        Tab1["/favorites — Избранное"]
        Tab2["/cart — Корзина"]
        Tab3["/profile — Профиль"]
    end

    Tab0 --> Store["/home/store/:id"]
    Tab3 --> Orders["/profile/orders"]
    Tab3 --> Agreement["/profile/user-agreement"]
    Tab3 --> Privacy["/profile/privacy-policy"]

    Shell -.-> Product["/product/:id"]
    Shell -.-> Search["/search"]
    Shell -.-> Checkout["/checkout"]
    Checkout --> Address["/checkout/address-search"]
    Shell -.-> OrderDetail["/order-details/:id"]

    Shell -.-> Support["/support"]
    Support --> CreateTicket["/support/create"]
    Support --> TicketDetail["/support/ticket"]
```

Маршруты с пунктирными линиями — overlay-маршруты (`parentNavigatorKey: _rootKey`), которые отображаются поверх табов.
