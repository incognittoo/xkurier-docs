# Архитектура

## Общая архитектура системы

```mermaid
graph TD
    subgraph Пользователи
        client["👤 Клиент<br>Покупатель продуктов"]
        manager["👤 Менеджер<br>Сотрудник магазина"]
        admin["👤 Администратор<br>Владелец платформы"]
    end

    subgraph "Flutter-приложения"
        xcourier["📱 xcourier<br>Клиентское приложение"]
        xcourier_manager["📱 xcourier_manager<br>Панель менеджера"]
        xcourier_admin["📱 xcourier_admin<br>Админ-панель"]
    end

    subgraph "Бэкенд и сервисы"
        firebase["☁️ Firebase<br>Auth + Firestore + Cloud Functions + FCM"]
        yandex_s3["📦 Yandex Object Storage<br>Хранилище изображений"]
        delivery_api["🚕 Внешний API<br>Расчёт стоимости доставки"]
    end

    client --> xcourier
    manager --> xcourier_manager
    admin --> xcourier_admin

    xcourier -->|"Firestore, Auth, FCM"| firebase
    xcourier_manager -->|"Firestore, Auth, FCM"| firebase
    xcourier_admin -->|"Firestore, Auth, Remote Config"| firebase

    firebase -->|"Upload images"| yandex_s3
    firebase -->|"Расчёт доставки"| delivery_api
```

## Архитектура Flutter-приложений

Все три приложения следуют паттерну **Feature-first + Clean Architecture**:

```mermaid
graph TD
    subgraph "Presentation Layer"
        P[Pages / Screens]
        W[Widgets]
        C[Controllers / Providers]
    end

    subgraph "Domain Layer"
        E[Entities]
        R[Repository Interfaces]
    end

    subgraph "Data Layer"
        RI[Repository Implementations]
        DS[Datasources]
    end

    subgraph "External"
        FS[(Firestore)]
        API[Cloud Functions]
    end

    P --> C
    P --> W
    C --> R
    R -.-> RI
    RI --> DS
    DS --> FS
    DS --> API
    C --> E
```

### Слои

| Слой | Ответственность | Примеры |
|---|---|---|
| **Presentation** | UI, взаимодействие с пользователем, управление состоянием | Pages, Widgets, Riverpod Controllers |
| **Domain** | Бизнес-логика, сущности, контракты | Entities (Freezed), Repository interfaces |
| **Data** | Реализация работы с данными | Firestore datasources, Repository implementations |

### Направление зависимостей

- Presentation зависит от Domain (использует entities и repository interfaces)
- Data зависит от Domain (реализует repository interfaces)
- Domain не зависит ни от чего (чистый Dart)

## State Management (Riverpod)

```mermaid
graph LR
    UI[UI Widget] -->|watch| SP[StreamProvider]
    UI -->|watch| FP[FutureProvider]
    UI -->|watch/read| NP[NotifierProvider]

    SP -->|depends on| R[Repository Provider]
    FP -->|depends on| R
    NP -->|depends on| R

    R -->|creates| RI[Repository Impl]
    RI -->|uses| DS[Datasource]
    DS -->|reads/writes| FS[(Firestore)]
```

| Тип провайдера | Применение |
|---|---|
| `StreamProvider.autoDispose` | Real-time данные из Firestore |
| `FutureProvider.autoDispose.family` | Async загрузка с параметрами |
| `NotifierProvider` | Мутируемое состояние (auth, формы) |
| `NotifierProvider.autoDispose` | Локальный UI стейт страницы |
| `Provider` | Зависимости / репозитории |

В `xcourier_admin` дополнительно используется `riverpod_annotation` + `riverpod_generator` для type-safe провайдеров через кодогенерацию.

## Обработка ошибок

Все data-операции возвращают `Result<T>` — sealed type:

```dart
Result<T>
├── Success(value: T)
└── FailureResult(failure: Failure)

Failure
├── ServerFailure
├── AuthFailure
├── NetworkFailure
├── NotFoundFailure
└── UnknownFailure
```

Использование:
```dart
result.when(
  success: (value) => // обработка успеха,
  failure: (failure) => // обработка ошибки,
);
```

## Процесс создания заказа

```mermaid
sequenceDiagram
    actor C as Клиент
    participant App as xcourier
    participant CF as Cloud Function create_order
    participant FS as Firestore
    participant TM as Delivery API
    participant FCM as FCM

    C->>App: Оформляет заказ
    App->>CF: Создание заказа (товары, адрес, оплата)
    CF->>CF: Верификация токена Firebase Auth
    CF->>FS: Проверка доступности магазина
    FS-->>CF: Данные магазина + расписание
    CF->>CF: Валидация данных, расчёт суммы
    CF->>FS: Создание документа в orders
    FS-->>CF: Подтверждение записи
    CF-->>App: 201 Created + данные заказа

    Note over FS,FCM: Firestore trigger (onNewOrder)
    FS->>FCM: Push менеджерам магазина
    FCM-->>App: Уведомление менеджеру

    Note over App,FS: Менеджер обрабатывает
    App->>FS: Смена статуса (Собирается)

    Note over FS,FCM: Firestore trigger (onOrderStatusChanged)
    FS->>FCM: Push клиенту о смене статуса
```

## Процесс расчёта доставки

```mermaid
sequenceDiagram
    actor C as Клиент
    participant App as xcourier
    participant CF as Cloud Function delivery_quote
    participant FS as Firestore
    participant TM as Delivery API API

    C->>App: Указывает адрес доставки
    App->>CF: Запрос стоимости доставки (магазин, координаты)
    CF->>FS: Получение координат магазина
    FS-->>CF: latitude, longitude
    CF->>TM: Выбор тарифа
    TM-->>CF: ID тарифа
    CF->>TM: Расчёт стоимости
    TM-->>CF: Стоимость доставки
    CF-->>App: { delivery_price, tariff_id }
    App->>C: Показ стоимости доставки
```
