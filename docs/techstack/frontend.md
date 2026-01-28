# Frontend 技術棧

## 核心框架

| 技術 | 版本 | 用途 | 選用理由 |
|------|------|------|----------|
| **Next.js** | 15.x | React 全端框架，App Router | SSG/ISR 支援、SEO 優化、Edge Runtime |
| **React** | 19.x | UI 函式庫 | Server Components、Suspense 優化 |
| **TypeScript** | 5.x | 型別安全 | 全專案型別共享 |

## 樣式與 UI

| 技術 | 版本 | 用途 | 選用理由 |
|------|------|------|----------|
| **TailwindCSS** | 4.x | Utility-first CSS | 快速開發、一致性設計 |
| **Radix UI** | 最新 | Headless UI 元件 | WCAG 2.1 AA 合規、無障礙支援 |
| **Framer Motion** | 12.x | 動畫效果 | 流暢的 Onboarding 與微互動 |
| **Lucide React** | 最新 | 圖示庫 | 輕量、可自訂 |
| **class-variance-authority** | 0.7.x | 元件變體管理 | 設計系統一致性 |
| **clsx** | 2.x | 條件式 className | 程式碼簡潔 |
| **tailwind-merge** | 2.x | TailwindCSS class 合併 | 避免樣式衝突 |

### 預計使用的 Radix UI 元件

```
意義羅盤互動：
- @radix-ui/react-slider          # 滿意度評分
- @radix-ui/react-progress        # 進度指示

價值觀排序：
- @dnd-kit/core + @dnd-kit/sortable  # 卡片拖放排序

引導式問答：
- @radix-ui/react-dialog          # 對話框
- @radix-ui/react-alert-dialog    # 確認對話框

習慣追蹤：
- @radix-ui/react-checkbox        # 打卡勾選
- @radix-ui/react-toggle          # 切換開關

通用元件：
- @radix-ui/react-tabs            # 分頁
- @radix-ui/react-toast           # 通知訊息
- @radix-ui/react-popover         # 彈出提示
- @radix-ui/react-dropdown-menu   # 下拉選單
- @radix-ui/react-accordion       # 手風琴 (FAQ、日記展開)
```

## 狀態管理

| 技術 | 版本 | 用途 | 選用理由 |
|------|------|------|----------|
| **Zustand** | 5.x | 全域客戶端狀態 | 輕量、易測試、可持久化 |
| **TanStack Query** | 5.x | 伺服器狀態與快取 | 快取策略、離線支援 |

### Zustand Stores 規劃

```
src/store/
├── authStore.ts          # 認證狀態 (用戶資訊、Token)
├── onboardingStore.ts    # Onboarding 進度
├── compassStore.ts       # 意義羅盤資料 (四面向)
├── blueprintStore.ts     # 三軌人生藍圖
├── habitStore.ts         # 習慣追蹤狀態
├── reflectionStore.ts    # 反思日記資料
├── settingsStore.ts      # 用戶設定 (語言、通知)
└── uiStore.ts            # UI 狀態 (主題、側邊欄)
```

## 表單處理

| 技術 | 版本 | 用途 |
|------|------|------|
| **React Hook Form** | 7.x | 表單狀態管理 |
| **Zod** | 3.x | Schema 驗證 |
| **@hookform/resolvers** | 3.x | Zod 與 RHF 整合 |

### 表單場景

- 註冊/登入表單
- 意義羅盤問答輸入
- 三軌人生藍圖編輯
- 習慣設定表單
- 每日反思問答

## API 通訊

| 技術 | 版本 | 用途 |
|------|------|------|
| **Axios** | 1.x | HTTP 客戶端 |
| **js-cookie** | 3.x | Cookie 管理 (JWT Token) |

### API Client 架構

```typescript
// src/lib/api/client.ts
// - Request Interceptor: 自動附加 JWT Token
// - Response Interceptor: 處理 401 Token Refresh
// - Retry Logic: 網路錯誤自動重試
// - Offline Queue: 離線操作佇列
```

## 認證

| 技術 | 版本 | 用途 |
|------|------|------|
| **@react-oauth/google** | 0.13.x | Google OAuth 登入 |
| **@apple/sign-in** | - | Apple Sign-In (規劃中) |
| **js-cookie** | 3.x | Token 儲存 |

## 國際化 (i18n)

| 技術 | 版本 | 用途 |
|------|------|------|
| **next-intl** | 3.x | Next.js 國際化方案 |

### 語言支援

- `zh-TW` - 繁體中文 (預設)
- `zh-CN` - 簡體中文
- `en` - 英文

```
src/messages/
├── zh-TW.json    # 繁體中文
├── zh-CN.json    # 簡體中文
└── en.json       # 英文
```

## 無障礙 (Accessibility)

| 技術 | 用途 |
|------|------|
| **Radix UI** | 內建 ARIA 支援 |
| **@axe-core/react** | 開發時無障礙檢測 |
| **eslint-plugin-jsx-a11y** | 靜態無障礙檢查 |

### WCAG 2.1 AA 合規檢查清單

- [ ] 所有互動元素可用鍵盤操作
- [ ] 色彩對比度達 4.5:1 以上
- [ ] 表單有適當的 label 關聯
- [ ] 動態內容變更有 ARIA live region
- [ ] 圖片有適當的 alt 文字

## 視覺化

| 技術 | 版本 | 用途 |
|------|------|------|
| **Recharts** | 2.x | 習慣統計圖表 |
| **D3.js** | 7.x | 意義羅盤視覺化 (客製化) |

### 視覺化應用場景

- 意義羅盤四圓交集圖
- 生活滿意度雷達圖
- 習慣完成率趨勢圖
- 三軌人生藍圖時間軸
- 心情追蹤曲線圖

## 離線支援

| 技術 | 用途 |
|------|------|
| **Workbox** | Service Worker 管理 |
| **IndexedDB** (via Dexie.js) | 本地資料儲存 |

### 離線策略

- 意義羅盤、習慣資料本地快取
- 離線時可打卡，上線後同步
- 敏感資料可選擇純本地儲存

## 開發工具

| 技術 | 版本 | 用途 |
|------|------|------|
| **ESLint** | 9.x | 程式碼檢查 |
| **Prettier** | 3.x | 程式碼格式化 |
| **prettier-plugin-tailwindcss** | 最新 | TailwindCSS class 排序 |
| **Husky** | 9.x | Git hooks |
| **lint-staged** | 15.x | 暫存區檢查 |

## 測試

| 技術 | 版本 | 用途 |
|------|------|------|
| **Vitest** | 2.x | 單元測試框架 |
| **@testing-library/react** | 16.x | React 測試工具 |
| **Playwright** | 1.x | E2E 測試 |
| **@axe-core/playwright** | 最新 | E2E 無障礙測試 |

## 部署

| 技術 | 用途 |
|------|------|
| **@opennextjs/cloudflare** | Cloudflare Workers 適配器 |
| **Wrangler** | Cloudflare CLI |

## 專案結構

```
apps/web/src/
├── app/                        # Next.js App Router 頁面
│   ├── [locale]/               # 國際化路由
│   │   ├── (auth)/             # 認證相關頁面
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── (main)/             # 主要功能頁面
│   │   │   ├── explore/        # 自我探索
│   │   │   │   ├── compass/    # 意義羅盤
│   │   │   │   ├── values/     # 價值觀排序
│   │   │   │   └── strengths/  # 優勢探索
│   │   │   ├── design/         # 目標設定
│   │   │   │   ├── blueprint/  # 三軌人生藍圖
│   │   │   │   └── goals/      # OKR 設定
│   │   │   ├── habits/         # 習慣養成
│   │   │   ├── reflect/        # 反思日記
│   │   │   └── dashboard/      # 首頁儀表板
│   │   ├── onboarding/         # 新用戶引導
│   │   └── settings/           # 設定
│   └── api/                    # API Routes
├── components/
│   ├── compass/                # 意義羅盤相關元件
│   ├── blueprint/              # 三軌藍圖相關元件
│   ├── habits/                 # 習慣追蹤相關元件
│   ├── reflection/             # 反思日記相關元件
│   ├── onboarding/             # Onboarding 元件
│   ├── shared/                 # 共用元件
│   └── ui/                     # 基礎 UI 元件
├── lib/
│   ├── api/                    # API 客戶端
│   ├── hooks/                  # 自訂 Hooks
│   └── utils/                  # 工具函式
├── store/                      # Zustand stores
└── styles/                     # 全域樣式
```

## 常用指令

```bash
pnpm dev                 # 啟動開發伺服器 (localhost:3000)
pnpm build              # 建置生產版本
pnpm build:cf           # 建置 Cloudflare Workers 版本
pnpm lint               # 執行 ESLint
pnpm test               # 執行測試
pnpm test:e2e           # 執行 E2E 測試
pnpm format             # 格式化程式碼
pnpm i18n:extract       # 提取國際化字串
```
