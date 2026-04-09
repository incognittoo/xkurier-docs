import { defineConfig } from "vitepress";
import { withMermaid } from "vitepress-plugin-mermaid";

export default withMermaid(
  defineConfig({
    title: "xkurier",
    description: "Документация системы доставки xkurier",
    base: "/xkurier-docs/",
    lang: "ru-RU",
    lastUpdated: true,

    themeConfig: {
      logo: undefined,
      search: {
        provider: "local",
      },

      nav: [
        { text: "Руководство", link: "/guide/" },
        { text: "Разработка", link: "/dev/" },
        { text: "Changelog", link: "/changelog" },
      ],

      sidebar: {
        "/guide/": [
          {
            text: "Обзор системы",
            link: "/guide/",
          },
          {
            text: "Клиентское приложение",
            collapsed: false,
            items: [
              { text: "Обзор", link: "/guide/xcourier/" },
              {
                text: "Главная и магазины",
                link: "/guide/xcourier/home-stores",
              },
              { text: "Каталог и товары", link: "/guide/xcourier/products" },
              {
                text: "Корзина и оформление заказа",
                link: "/guide/xcourier/cart-checkout",
              },
              { text: "Заказы", link: "/guide/xcourier/orders" },
              { text: "Избранное", link: "/guide/xcourier/favorites" },
              { text: "Профиль", link: "/guide/xcourier/profile" },
              { text: "Поддержка", link: "/guide/xcourier/support" },
            ],
          },
          {
            text: "Панель менеджера",
            collapsed: false,
            items: [
              { text: "Обзор", link: "/guide/xcourier-manager/" },
              {
                text: "Управление заказами",
                link: "/guide/xcourier-manager/orders",
              },
              {
                text: "Управление товарами",
                link: "/guide/xcourier-manager/products",
              },
            ],
          },
          {
            text: "Админ-панель",
            collapsed: false,
            items: [
              { text: "Обзор", link: "/guide/xcourier-admin/" },
              { text: "Заказы и отчёты", link: "/guide/xcourier-admin/orders" },
              { text: "Магазины", link: "/guide/xcourier-admin/stores" },
              { text: "Менеджеры", link: "/guide/xcourier-admin/managers" },
              { text: "Баннеры", link: "/guide/xcourier-admin/banners" },
              {
                text: "Обращения",
                link: "/guide/xcourier-admin/support-tickets",
              },
              { text: "Настройки", link: "/guide/xcourier-admin/settings" },
            ],
          },
        ],
        "/dev/": [
          {
            text: "Разработка",
            link: "/dev/",
          },
          {
            text: "Общее",
            collapsed: false,
            items: [
              { text: "Архитектура", link: "/dev/architecture" },
              { text: "Настройка окружения", link: "/dev/setup" },
              { text: "Структура монорепо", link: "/dev/structure" },
              { text: "База данных", link: "/dev/database" },
              { text: "Деплой", link: "/dev/deployment" },
              { text: "Contributing", link: "/dev/contributing" },
            ],
          },
          {
            text: "xcourier (клиент)",
            collapsed: false,
            items: [
              { text: "Обзор", link: "/dev/xcourier/" },
              { text: "Структура", link: "/dev/xcourier/structure" },
              { text: "Фичи", link: "/dev/xcourier/features" },
            ],
          },
          {
            text: "xcourier_manager",
            collapsed: false,
            items: [
              { text: "Обзор", link: "/dev/xcourier-manager/" },
              { text: "Структура", link: "/dev/xcourier-manager/structure" },
              { text: "Фичи", link: "/dev/xcourier-manager/features" },
            ],
          },
          {
            text: "xcourier_admin",
            collapsed: false,
            items: [
              { text: "Обзор", link: "/dev/xcourier-admin/" },
              { text: "Структура", link: "/dev/xcourier-admin/structure" },
              { text: "Фичи", link: "/dev/xcourier-admin/features" },
            ],
          },
        ],
      },

      footer: {
        message: "Документация проекта xkurier. Разработано HESOYAM.",
        copyright: "© 2026 Yusuf Bogatyrev",
      },

      outline: {
        label: "На этой странице",
      },

      lastUpdated: {
        text: "Обновлено",
      },

      docFooter: {
        prev: "Назад",
        next: "Далее",
      },
    },

    mermaid: {},
    mermaidPlugin: {
      class: "mermaid",
    },
  }),
);
