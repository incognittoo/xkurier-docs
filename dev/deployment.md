# Деплой

## Cloud Functions

```bash
cd xcourier_api/functions

# Деплой всех функций
npm run deploy
# Эквивалент: firebase deploy --only functions

# Просмотр логов
npm run logs
```

### Список Cloud Functions

| Функция | Тип | Описание |
|---|---|---|
| `uploadImage` | HTTP (POST) | Загрузка изображения → конвертация в WebP → Yandex S3 |
| `delivery_quote` | HTTP (GET) | Расчёт стоимости доставки через внешний API |
| `create_order` | HTTP (POST) | Создание заказа (серверная валидация) |
| `generateProductSearchTokens` | Firestore trigger | Генерация поисковых токенов при создании/обновлении товара |
| `migrateProductsSearchTokens` | HTTP | Миграция токенов для всех существующих товаров |
| `onNewOrder` | Firestore trigger | Push менеджерам при новом заказе |
| `onOrderStatusChanged` | Firestore trigger | Push клиенту при смене статуса |
| `onOrderPacked` | Firestore trigger | Push при статусе «Собран» |
| `onOrderInTransit` | Firestore trigger | Push при статусе «В пути» |
| `onOrderCompleted` | Firestore trigger | Push при завершении заказа |
| `onOrderCancelled` | Firestore trigger | Push при отмене заказа |
| `onSupportTicketUpdated` | Firestore trigger | Push пользователю при ответе на обращение |

### Регионы

- HTTP-функции: `us-central1`
- Firestore triggers: совпадает с регионом БД (см. конфигурацию)

## Flutter-приложения

### Android (APK)

```bash
cd xcourier  # или xcourier_manager / xcourier_admin
flutter build apk --release
```

APK будет в `build/app/outputs/flutter-apk/app-release.apk`.

### iOS

```bash
flutter build ios --release
```

Затем — архивирование и публикация через Xcode или `flutter build ipa`.

## Firestore Rules

```bash
cd xcourier_api
firebase deploy --only firestore:rules
```

## Firestore Indexes

```bash
cd xcourier_api
firebase deploy --only firestore:indexes
```

## Yandex Object Storage

Бакет S3 используется для хранения изображений (название бакета — в конфигурации Cloud Functions). Настройка:
- ACL: `public-read` для загружаемых объектов
- Формат: WebP (quality 80)
- Путь: `products/{uuid}.webp`
