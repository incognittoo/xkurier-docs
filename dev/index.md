# Разработка

Техническая документация для разработчиков проекта xkurier.

## Технологический стек

| Компонент | Технология |
|---|---|
| Мобильные приложения | Flutter (Dart) |
| State Management | Riverpod |
| Навигация | GoRouter |
| Кодогенерация | Freezed + json_serializable + riverpod_generator |
| Backend | Firebase Cloud Functions (Node.js 22) |
| База данных | Cloud Firestore |
| Аутентификация | Firebase Auth |
| Push-уведомления | Firebase Cloud Messaging (FCM) |
| Хранилище изображений | Yandex Cloud Object Storage (S3-совместимый) |
| Расчёт доставки | Внешний API (через Cloud Functions) |
| Remote Config | Firebase Remote Config |

## Firebase проект

- **Project ID:** указан в `firebase_options.dart`
- **Регион Firestore:** Europe
- **Регион Cloud Functions:** см. конфигурацию в `xcourier_api/firebase.json`

## Быстрый старт

```bash
# Клонировать репозиторий
git clone <repo-url>
cd xkurier

# Установить зависимости для любого Flutter-приложения
cd xcourier && flutter pub get

# Запустить кодогенерацию
dart run build_runner build --delete-conflicting-outputs

# Запустить приложение
flutter run
```

Подробнее о настройке окружения — в разделе [Настройка окружения](./setup).
