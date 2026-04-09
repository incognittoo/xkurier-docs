# xcourier_manager — Структура

## Дерево каталогов

```
xcourier_manager/lib/
├── app/
│   ├── app.dart                    # MaterialApp.router
│   └── router/
│       └── app_router.dart         # GoRouter с auth redirect
│
├── core/
│   ├── firebase/
│   │   └── firebase_providers.dart # Firestore, Auth инстансы
│   ├── network/
│   │   ├── failure.dart            # Типы ошибок
│   │   └── result.dart             # Result<T>
│   ├── notifications/
│   │   ├── notification_service.dart
│   │   ├── notification_token_service.dart
│   │   ├── app_badge_service.dart            # Badge на иконке приложения
│   │   └── pending_order_navigation_provider.dart  # Навигация по push-у
│   ├── theme/
│   │   └── app_theme.dart
│   ├── utils/
│   │   ├── app_logger.dart
│   │   └── app_provider_observer.dart  # Отладка провайдеров
│   └── widgets/
│       └── manager_cached_image.dart
│
├── features/
│   ├── auth/                       # Аутентификация менеджера
│   ├── orders/                     # Заказы
│   ├── products/                   # Товары
│   └── splash/                     # Экран загрузки
│
├── shared/
│   └── widgets/
│       ├── app_text_field.dart     # Кастомное текстовое поле
│       ├── primary_button.dart     # Основная кнопка
│       ├── secondary_button.dart   # Вторичная кнопка
│       ├── app_outlined_button.dart
│       ├── status_badge.dart       # Бейдж статуса заказа
│       ├── toggle_row.dart         # Ряд с переключателем
│       ├── photo_uploader.dart     # Загрузка фото
│       ├── app_drawer.dart         # Боковое меню
│       ├── category_chip.dart      # Чип категории
│       ├── app_switch.dart         # Переключатель
│       ├── input_dialog.dart       # Диалог с текстовым вводом
│       └── confirmation_dialog.dart # Диалог подтверждения
│
├── firebase_options.dart
└── main.dart
```

## Shared Widgets

Уникальная особенность xcourier_manager — папка `shared/widgets/` с переиспользуемыми компонентами:

| Виджет | Назначение |
|---|---|
| `AppTextField` | Кастомное текстовое поле с единым стилем |
| `PrimaryButton` | Основная кнопка действия |
| `SecondaryButton` | Вторичная кнопка |
| `StatusBadge` | Цветной бейдж со статусом заказа |
| `PhotoUploader` | Компонент загрузки фотографии товара |
| `AppDrawer` | Боковое навигационное меню |
| `ConfirmationDialog` | Диалог подтверждения действия |
| `InputDialog` | Диалог с текстовым полем ввода |
| `ToggleRow` | Ряд с label и переключателем |
