# LifeDesign 技術棧文件

> 最後更新：2026-01-28
> 狀態：規劃中 (Planning)

## 目錄

1. [技術架構總覽](#技術架構總覽)
2. [Frontend 技術棧](./frontend.md)
3. [Backend 技術棧](./backend.md)
4. [Mobile App 技術棧](./mobile.md)
5. [CI/CD Pipeline](./cicd.md)

---

## 技術架構總覽

```
┌─────────────────────────────────────────────────────────────────┐
│                        Client Layer                             │
├─────────────────────────────────────────────────────────────────┤
│  Web (Next.js 15)          │  Mobile (React Native + Expo)      │
│  - React 19                │  - iOS 14+ / Android 10+           │
│  - TailwindCSS             │  - React Native Paper              │
│  - Zustand + TanStack Query│  - 共用狀態管理與商業邏輯          │
└─────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────┐
│                     API Gateway Layer                           │
├─────────────────────────────────────────────────────────────────┤
│  Cloudflare Workers                                             │
│  - Hono Framework                                               │
│  - JWT / OAuth 2.0 Authentication                               │
│  - Rate Limiting                                                │
└─────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────┐
│                      Data Layer                                 │
├─────────────────────────────────────────────────────────────────┤
│  D1 (SQLite)    │  R2 (Object Storage)  │  KV (Key-Value Cache) │
│  - 主資料庫     │  - 圖片/資料匯出      │  - 快取/Session       │
└─────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────┐
│                   External Services                             │
├─────────────────────────────────────────────────────────────────┤
│  FCM/APNs (Push)  │  OAuth Providers  │  Analytics (PostHog)    │
└─────────────────────────────────────────────────────────────────┘
```

## 技術選型原則

1. **Edge-First**: 使用 Cloudflare 全球邊緣網路，確保首次載入 < 3 秒
2. **Type-Safe**: 全面使用 TypeScript，前後端共享型別
3. **Cross-Platform**: Web + Mobile 共用核心邏輯，減少重複開發
4. **Privacy-First**: 資料加密、GDPR 合規、本地模式支援
5. **Accessibility**: 符合 WCAG 2.1 AA 標準

## 版本資訊

| 類別 | 技術 | 版本 |
|------|------|------|
| **Runtime** | Node.js | 20.x |
| **Package Manager** | pnpm | 9.x |
| **Frontend Framework** | Next.js | 15.x |
| **React** | React | 19.x |
| **Mobile Framework** | React Native | 0.76.x |
| **Mobile Tooling** | Expo | 52.x |
| **Backend Framework** | Hono | 4.x |
| **Language** | TypeScript | 5.x |
| **Styling** | TailwindCSS | 4.x |
| **State Management** | Zustand | 5.x |
| **Server State** | TanStack Query | 5.x |

## 非功能需求對應

| 需求類別 | 需求 | 技術方案 |
|----------|------|----------|
| 效能 | 首次載入 < 3 秒 | Cloudflare Edge + Next.js SSG/ISR |
| 效能 | API 回應 < 500ms (95%) | Edge Workers + D1 Read Replicas |
| 安全性 | TLS 1.3 | Cloudflare 自動管理 |
| 安全性 | AES-256 加密 | Web Crypto API + KV 加密儲存 |
| 安全性 | OAuth 2.0 | Google/Apple Sign-In |
| 隱私 | GDPR 合規 | 資料匯出 API + 帳號刪除功能 |
| 可用性 | 99.5% uptime | Cloudflare Workers 全球分佈 |
| 無障礙 | WCAG 2.1 AA | Radix UI + axe-core 測試 |
| 國際化 | 繁中/簡中/英文 | next-intl + i18n |

## 專案結構規劃

```
life-design/
├── apps/
│   ├── web/                    # Next.js Web 應用
│   │   ├── src/
│   │   │   ├── app/            # App Router 頁面
│   │   │   ├── components/     # React 元件
│   │   │   └── lib/            # 工具函式
│   │   └── package.json
│   │
│   ├── mobile/                 # React Native Expo 應用
│   │   ├── src/
│   │   │   ├── screens/        # 畫面
│   │   │   ├── components/     # 元件
│   │   │   └── navigation/     # 導航
│   │   └── package.json
│   │
│   └── api/                    # Hono API (Cloudflare Workers)
│       ├── src/
│       │   ├── routes/         # API 路由
│       │   ├── middleware/     # 中介軟體
│       │   └── services/       # 商業邏輯
│       └── package.json
│
├── packages/
│   ├── shared/                 # 共用型別與工具
│   │   ├── types/              # TypeScript 型別定義
│   │   ├── utils/              # 共用工具函式
│   │   └── constants/          # 常數定義
│   │
│   └── ui/                     # 共用 UI 元件 (Web + Mobile)
│       ├── web/                # Web 版本
│       └── native/             # React Native 版本
│
├── docs/                       # 文件
│   ├── techstack/              # 技術棧文件
│   └── LifeDesign_PRD.docx.md  # 產品需求文件
│
├── pnpm-workspace.yaml         # Monorepo 配置
├── turbo.json                  # Turborepo 配置
└── package.json
```
