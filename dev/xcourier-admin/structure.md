# xcourier_admin — Структура

## Дерево каталогов

```
xcourier_admin/lib/
├── application/
│   ├── app.dart                    # MaterialApp.router
│   ├── app_env.dart                # Конфигурация окружения
│   ├── app_initializer.dart        # Инициализация Firebase, Remote Config
│   └── app_observers.dart          # ProviderObserver для отладки
│
├── core/
│   ├── constants/
│   │   └── app_constants.dart      # Глобальные константы
│   ├── errors/
│   │   ├── exceptions.dart         # Кастомные исключения
│   │   ├── failures.dart           # Типы ошибок (Failure)
│   │   └── firebase_error_mapper.dart  # Маппинг Firebase ошибок
│   ├── extensions/
│   │   └── extensions.dart         # Расширения Dart
│   ├── presentation/
│   │   └── pages/
│   │       └── splash_page.dart    # Splash screen
│   ├── providers/
│   │   └── providers.dart          # Базовые провайдеры (Firestore, Auth)
│   ├── router/
│   │   └── app_router.dart         # GoRouter с AppRoutes и ShellRoute
│   ├── technical/
│   │   ├── models/
│   │   │   └── remote_config_data.dart
│   │   ├── providers/
│   │   │   ├── app_status_provider.dart      # Статус приложения (normal/maintenance/update)
│   │   │   ├── connectivity_provider.dart    # Наличие интернета
│   │   │   └── remote_config_provider.dart   # Firebase Remote Config
│   │   └── screens/
│   │       ├── error_screen.dart
│   │       ├── force_update_screen.dart
│   │       ├── maintenance_screen.dart
│   │       └── no_internet_screen.dart
│   ├── theme/
│   │   └── app_theme.dart          # Тема + AppColors
│   ├── utils/
│   │   └── app_logger.dart
│   └── widgets/
│       ├── app_switch.dart
│       ├── common_widgets.dart     # Общие виджеты
│       └── main_shell.dart         # ShellRoute wrapper с Drawer
│
├── features/
│   ├── auth/                       # Аутентификация (login, register, blocked)
│   ├── banners/                    # Управление баннерами
│   ├── categories/                 # Управление категориями
│   ├── managers/                   # Управление менеджерами
│   ├── orders/                     # Просмотр заказов + отчёты
│   ├── settings/                   # Настройки платежей
│   ├── stores/                     # Управление магазинами
│   ├── support_tickets/            # Обращения пользователей
│   └── users/                      # Заблокированные пользователи
│
├── firebase_options.dart
└── main.dart
```

## Отличия от других приложений

| Аспект | xcourier / manager | xcourier_admin |
|---|---|---|
| Провайдеры | Ручные (Provider, NotifierProvider) | `riverpod_generator` (@riverpod аннотации) |
| Ошибки | `Result<T>` sealed type | `Failure` + exceptions |
| Инициализация | В `main.dart` | В `AppInitializer` (отдельный класс) |
| Remote Config | Нет | Есть (force update, maintenance) |
| Отчёты | Нет | `OrderReportData` (summary, breakdowns) |
| App structure | `app/` в lib | `application/` в lib |

## Technical Layer

Уникальная для admin-панели подсистема `core/technical/`:

- **Remote Config** — загружает конфигурацию из Firebase Remote Config
- **App Status** — определяет состояние приложения: нормальная работа, обслуживание, требует обновления
- **Connectivity** — мониторинг интернет-соединения
- **Error screens** — экраны для каждого edge-case сценария
