# Настройка окружения

## Требования

| Инструмент | Версия |
|---|---|
| Flutter | 3.x (stable) |
| Dart | 3.x |
| Node.js | 22.x |
| Firebase CLI | Последняя |
| Git | Последняя |

## Установка

### 1. Flutter SDK

```bash
# Установка Flutter (macOS)
brew install flutter

# Проверка
flutter doctor
```

### 2. Firebase CLI

```bash
npm install -g firebase-tools
firebase login
```

### 3. Клонирование проекта

```bash
git clone <repo-url>
cd xkurier
```

### 4. Flutter-приложения

Для каждого из трёх приложений:

```bash
# xcourier (клиент)
cd xcourier
flutter pub get
dart run build_runner build --delete-conflicting-outputs

# xcourier_manager
cd ../xcourier_manager
flutter pub get
dart run build_runner build --delete-conflicting-outputs

# xcourier_admin
cd ../xcourier_admin
flutter pub get
dart run build_runner build --delete-conflicting-outputs
```

### 5. API (Cloud Functions)

```bash
cd xcourier_api/functions
npm install
```

## Запуск

### Flutter-приложения

```bash
# Запуск на подключённом устройстве или эмуляторе
flutter run

# Запуск с hot reload
flutter run --debug
```

### Локальный эмулятор Firebase

```bash
cd xcourier_api/functions
npm run serve
# Запустит firebase emulators:start --only functions
```

## Кодогенерация

При изменении Freezed-классов или Riverpod-аннотаций необходимо перезапустить кодогенерацию:

```bash
dart run build_runner build --delete-conflicting-outputs
```

Генерируемые файлы:
- `*.freezed.dart` — Freezed (immutable classes, copyWith, equals)
- `*.g.dart` — json_serializable (fromJson/toJson)
- В xcourier_admin: `*.g.dart` также содержат riverpod_generator провайдеры

::: warning
Не редактируйте `.freezed.dart` и `.g.dart` файлы вручную — они перезапишутся при следующей генерации.
:::

## Конфигурация Firebase

Файл `firebase_options.dart` содержит ключи Firebase-проекта. Он копируется из `xcourier/` в `xcourier_manager/` вручную при изменениях.

Путь: `lib/firebase_options.dart` в каждом приложении.

## Синхронизация ассетов

Шрифты (Inter) и SVG-иконки синхронизируются между приложениями вручную. Основной источник — `xcourier/`.
