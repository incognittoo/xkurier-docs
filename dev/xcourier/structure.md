# xcourier — Структура

## Дерево каталогов

```
xcourier/lib/
├── app/
│   ├── app.dart                          # MaterialApp.router + ProviderScope
│   ├── data/
│   │   ├── home_data.dart                # Модель данных главной страницы
│   │   └── store_detail_data.dart        # Модель данных страницы магазина
│   ├── providers/
│   │   └── home_data_provider.dart       # Провайдер главной страницы
│   ├── router/
│   │   ├── app_router.dart               # GoRouter конфигурация
│   │   └── app_shell.dart                # Bottom navigation shell
│   └── startup/
│       └── startup_page.dart             # Экран загрузки
│
├── core/
│   ├── auth/
│   │   └── auth_providers.dart           # Firebase Auth провайдеры
│   ├── config/
│   │   └── app_config.dart               # Конфигурация приложения
│   ├── error/
│   │   └── error_handler.dart            # Глобальный обработчик ошибок
│   ├── firebase/
│   │   └── firebase_providers.dart       # Firestore, Auth инстансы
│   ├── network/
│   │   ├── failure.dart                  # Типы ошибок (Failure)
│   │   ├── result.dart                   # Result<T> sealed type
│   │   └── result_extensions.dart        # Расширения для Result
│   ├── notifications/
│   │   ├── notification_service.dart     # Обработка push-уведомлений
│   │   └── notification_token_service.dart
│   ├── pagination/
│   │   ├── paginated_data.dart           # Модель пагинированных данных
│   │   ├── paginated_notifier.dart       # Базовый notifier с пагинацией
│   │   └── pagination_params.dart        # Параметры пагинации
│   ├── theme/
│   │   └── app_theme.dart                # Тема, цвета, типографика
│   ├── utils/
│   │   ├── app_logger.dart               # Логгер
│   │   ├── firebase_error_utils.dart     # Маппинг Firebase ошибок
│   │   └── phone_utils.dart              # Утилиты для телефонных номеров
│   ├── validation/
│   │   └── validators.dart               # Валидаторы полей форм
│   └── widgets/
│       ├── add_to_cart_pill.dart          # Кнопка добавления в корзину
│       ├── back_button_universal.dart     # Универсальная кнопка «назад»
│       ├── error_page.dart               # Страница ошибки
│       ├── optimized_cache_image.dart     # Оптимизированное кеш-изображение
│       └── success_notification_banner.dart
│
└── features/
    ├── banners/                           # Рекламные баннеры
    ├── cart/                              # Корзина
    ├── categories/                        # Категории товаров
    ├── favorites/                         # Избранные магазины
    ├── home/                              # Главная страница
    ├── order/                             # Заказы + оформление
    ├── products/                          # Каталог товаров
    ├── profile/                           # Профиль пользователя
    ├── stores/                            # Магазины
    └── support/                           # Обращения в поддержку
```

## Особенности

### Пагинация

В `core/pagination/` реализован базовый `PaginatedNotifier` — абстрактный класс для провайдеров с бесконечной прокруткой. Используется в каталоге товаров.

### Корзина

Корзина хранится локально (не в Firestore). Реализация в `features/cart/data/datasources/cart_local_data_source.dart`.

### Home Data

Главная страница загружает данные параллельно через `HomeDataProvider` — баннеры и магазины объединяются в единую модель `HomeData`.
