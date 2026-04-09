# Структура монорепо

## Корневая директория

```
xkurier/
├── xcourier/              # Клиентское приложение (Flutter)
├── xcourier_manager/      # Панель менеджера (Flutter)
├── xcourier_admin/        # Админ-панель (Flutter)
├── xcourier_api/          # Firebase Cloud Functions (Node.js)
├── xcourier_pushkey_apns/ # Конфигурация APNs для push-уведомлений
├── docs/                  # Документация (VitePress)
├── CLAUDE.md              # Инструкции для AI-ассистента
└── function_address.js    # Адреса Cloud Functions
```

## Структура Flutter-приложения (общая)

Все три Flutter-приложения следуют единой структуре:

```
lib/
├── app/                    # Точка входа приложения
│   ├── app.dart           # MaterialApp.router, тема, ProviderScope
│   └── router/            # GoRouter конфигурация
│       └── app_router.dart
│
├── core/                   # Общие утилиты и инфраструктура
│   ├── theme/             # AppTheme, AppColors
│   ├── network/           # Result<T>, Failure (обработка ошибок)
│   ├── firebase/          # Firebase providers (Firestore, Auth)
│   ├── notifications/     # Push-уведомления
│   ├── utils/             # Логгер, хелперы
│   ├── widgets/           # Общие виджеты (кеш-изображения, кнопки)
│   └── validation/        # Валидаторы полей (только в xcourier)
│
├── features/               # Фичи (Feature-first)
│   ├── auth/              # Аутентификация
│   ├── orders/            # Заказы
│   ├── products/          # Товары
│   └── ...                # Другие фичи
│
├── shared/                 # Переиспользуемые виджеты (только xcourier_manager)
│   └── widgets/           # AppTextField, PrimaryButton, StatusBadge и др.
│
├── firebase_options.dart   # Конфигурация Firebase
└── main.dart              # Точка входа (runApp)
```

## Структура фичи

Каждая фича содержит три слоя:

```
feature/
├── data/
│   ├── datasources/       # Прямая работа с Firestore / API
│   └── repositories/      # Реализация интерфейсов из domain
│
├── domain/
│   ├── entities/          # Бизнес-сущности (Freezed, immutable)
│   ├── repositories/      # Абстрактные интерфейсы репозиториев
│   └── constants/         # Константы (статусы, перечисления)
│
├── application/            # Use cases (опционально, есть в xcourier)
│   └── usecases/
│
└── presentation/
    ├── controllers/       # Riverpod провайдеры (NotifierProvider, etc.)
    ├── providers/         # Riverpod провайдеры (альтернативное название в admin)
    ├── pages/             # Экраны (полноэкранные)
    ├── screens/           # Экраны (альтернативное название в admin)
    └── widgets/           # Виджеты экрана (карточки, формы, списки)
```

## Структура API

```
xcourier_api/
├── functions/
│   ├── index.js                           # Экспорт всех Cloud Functions
│   ├── create_order.js                    # Создание заказа
│   ├── delivery_quote.js                  # Расчёт стоимости доставки (внешний API)
│   ├── upload_image.js                    # Загрузка и конвертация изображений
│   ├── generate_product_search_tokens.js  # Генерация поисковых токенов
│   ├── migrate_search_tokens.js           # Миграция токенов для существующих товаров
│   ├── notifications.js                   # Push-уведомления по заказам (Firestore triggers)
│   ├── support_notifications.js           # Push-уведомления по тикетам поддержки
│   ├── shared/
│   │   ├── admin.js                       # Инициализация Firebase Admin SDK
│   │   ├── s3.js                          # Клиент Yandex Object Storage (AWS SDK)
│   │   ├── store_availability.js          # Логика доступности магазина
│   │   └── delivery_api.js                # Интеграция с API расчёта доставки
│   ├── package.json
│   └── node_modules/
│
├── firebase.json                          # Конфигурация Firebase
├── firestore.rules                        # Правила безопасности Firestore
└── firestore.indexes.json                 # Индексы Firestore
```
