# Contributing

## Стиль кода

### Dart / Flutter

- Feature-first структура — каждая фича в своей папке с data/domain/presentation слоями
- Entities — всегда Freezed (immutable, copyWith, equals, toJson/fromJson)
- State management — Riverpod (провайдеры, не setState)
- Навигация — GoRouter (декларативная)
- Обработка ошибок — `Result<T>` (sealed type), не throw/catch

### Именование

| Что | Формат | Пример |
|---|---|---|
| Файлы | snake_case | `order_details_page.dart` |
| Классы | PascalCase | `OrderDetailsPage` |
| Переменные | camelCase | `orderSum` |
| Провайдеры | camelCase + Provider | `ordersStreamProvider` |
| Константы | camelCase | `statusCreated` |

### UI/UX стандарты

- Ошибки операций → `SnackBar` (не `Text` внизу страницы)
- Валидация полей → inline `errorText`
- Критические ошибки → `AlertDialog`
- Загрузка → skeleton-анимация (не спиннер)
- `Column` внутри `Expanded` → обязательно `mainAxisSize: MainAxisSize.min`
- Динамический `Text` → обязательно `overflow: TextOverflow.ellipsis`

## Работа с Git

### Ветки

- `main` — основная ветка
- Feature branches для новых фич

### Коммиты

Используйте осмысленные сообщения на английском языке.

## Кодогенерация

После изменения Freezed-классов или Riverpod-аннотаций:

```bash
dart run build_runner build --delete-conflicting-outputs
```

Не коммитьте `.freezed.dart` и `.g.dart` файлы — они генерируются автоматически.

## Добавление новой фичи

1. Создайте папку в `features/`:
   ```
   features/new_feature/
   ├── data/
   │   ├── datasources/
   │   └── repositories/
   ├── domain/
   │   ├── entities/
   │   └── repositories/
   └── presentation/
       ├── controllers/
       ├── pages/
       └── widgets/
   ```

2. Определите entity (Freezed) в `domain/entities/`
3. Определите абстрактный репозиторий в `domain/repositories/`
4. Реализуйте datasource и репозиторий в `data/`
5. Создайте Riverpod провайдеры в `presentation/controllers/`
6. Создайте UI в `presentation/pages/` и `presentation/widgets/`
7. Добавьте маршрут в GoRouter (`app/router/app_router.dart`)

## Синхронизация между приложениями

При изменении:
- `firebase_options.dart` → скопировать из `xcourier/` в `xcourier_manager/`
- Шрифты / SVG-иконки → синхронизировать между приложениями вручную
