# Backend 技術棧

## 核心框架

| 技術 | 版本 | 用途 | 選用理由 |
|------|------|------|----------|
| **Hono** | 4.x | 輕量級 Web 框架 | Edge Runtime 原生支援、極低延遲 |
| **TypeScript** | 5.x | 型別安全 | 前後端型別共享 |
| **Cloudflare Workers** | - | Serverless Runtime | 全球 300+ 節點、冷啟動 < 50ms |

## 資料庫與儲存

| 技術 | 用途 | 說明 |
|------|------|------|
| **Cloudflare D1** | 主資料庫 | SQLite 相容，邊緣分佈式，Read Replicas |
| **Cloudflare R2** | 物件儲存 | 用戶資料匯出檔案、圖片（未來） |
| **Cloudflare KV** | 快取與 Session | 分散式 Key-Value 儲存 |

### D1 資料庫 Schema 規劃

```sql
-- 用戶相關
users                    -- 用戶基本資料
user_settings            -- 用戶設定 (語言、通知偏好)
user_onboarding          -- Onboarding 進度追蹤

-- 自我探索
compass_entries          -- 意義羅盤四面向資料
compass_results          -- 交集分析結果
user_values              -- 核心價值觀排序結果
satisfaction_scores      -- 生活滿意度評分 (8 面向)
strengths_results        -- 優勢探索結果

-- 目標設定
life_blueprints          -- 三軌人生藍圖
blueprint_milestones     -- 藍圖里程碑
goals                    -- 目標 (OKR)
key_results              -- 關鍵結果

-- 習慣養成
habits                   -- 習慣定義
habit_logs               -- 習慣打卡記錄
habit_streaks            -- 連續天數統計

-- 反思日記
reflections              -- 每日反思
gratitude_entries        -- 感恩日記
weekly_reviews           -- 週回顧
mood_logs                -- 心情追蹤

-- 成就系統
badges                   -- 徽章定義
user_badges              -- 用戶獲得的徽章
achievements             -- 成就記錄
```

## 認證與安全

| 技術 | 版本 | 用途 |
|------|------|------|
| **jose** | 5.x | JWT 簽發與驗證 |
| **Zod** | 3.x | 請求驗證 |
| **@hono/zod-validator** | 最新 | Hono Zod 整合 |
| **bcryptjs** | 2.x | 密碼雜湊 (備用，主要用 OAuth) |

### 認證流程

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   Client     │────▶│  OAuth 2.0   │────▶│   Backend    │
│  (Web/App)   │     │ (Google/Apple)│     │  (Hono API)  │
└──────────────┘     └──────────────┘     └──────────────┘
                                                 │
                                                 ▼
                                         ┌──────────────┐
                                         │  JWT Token   │
                                         │  (Access +   │
                                         │   Refresh)   │
                                         └──────────────┘
```

### 安全措施

| 措施 | 實作方式 |
|------|----------|
| TLS 1.3 | Cloudflare 自動管理 |
| AES-256 加密 | 敏感資料使用 Web Crypto API 加密後儲存 |
| Rate Limiting | Hono 中介軟體，依 IP / User ID 限流 |
| CORS | 白名單網域限制 |
| XSS 防護 | Content-Security-Policy headers |
| SQL Injection | D1 Prepared Statements |

## 推播通知

| 技術 | 用途 |
|------|------|
| **Firebase Cloud Messaging (FCM)** | Android + Web 推播 |
| **Apple Push Notification service (APNs)** | iOS 推播 |

### 推播場景

- 習慣打卡提醒 (每日)
- 週回顧提醒 (週日)
- 連續打卡激勵訊息
- Re-engagement 訊息 (3/7/14/30 天未使用)

## 資料隱私與 GDPR

| 功能 | API 端點 |
|------|----------|
| 資料匯出 | `GET /api/v1/users/me/export` |
| 帳號刪除 | `DELETE /api/v1/users/me` |
| 隱私設定 | `PATCH /api/v1/users/me/privacy` |
| 本地模式切換 | `POST /api/v1/users/me/local-mode` |

### 敏感資料處理

```typescript
// 加密敏感欄位
const encryptedFields = [
  'compass_entries.content',
  'reflections.content',
  'gratitude_entries.content'
]

// 用戶可選擇資料不上傳雲端
// 使用 IndexedDB 本地儲存 + 端對端加密
```

## 專案結構

```
apps/api/
├── src/
│   ├── index.ts            # 主入口點與路由定義
│   ├── types.ts            # TypeScript 型別定義
│   ├── middleware/
│   │   ├── auth.ts         # JWT 認證中介軟體
│   │   ├── cors.ts         # CORS 配置
│   │   ├── rateLimit.ts    # 速率限制
│   │   └── logger.ts       # 請求日誌
│   ├── routes/
│   │   ├── auth/           # 認證相關
│   │   ├── users/          # 用戶管理
│   │   ├── compass/        # 意義羅盤
│   │   ├── values/         # 價值觀
│   │   ├── blueprint/      # 三軌藍圖
│   │   ├── goals/          # 目標設定
│   │   ├── habits/         # 習慣追蹤
│   │   ├── reflections/    # 反思日記
│   │   ├── badges/         # 成就系統
│   │   └── notifications/  # 通知管理
│   ├── services/           # 商業邏輯
│   │   ├── compass.ts      # 意義羅盤分析
│   │   ├── streaks.ts      # 連續天數計算
│   │   ├── badges.ts       # 徽章發放邏輯
│   │   └── notifications.ts # 推播通知
│   ├── repositories/       # 資料存取層
│   └── utils/
│       ├── crypto.ts       # 加解密工具
│       ├── jwt.ts          # JWT 工具
│       └── validators.ts   # 驗證工具
├── migrations/             # D1 資料庫遷移
└── wrangler.toml           # Cloudflare Workers 配置
```

## API 路由結構

```
/api/v1
├── /auth                       # 認證
│   ├── POST /google            # Google OAuth
│   ├── POST /apple             # Apple Sign-In
│   ├── POST /refresh           # Token 刷新
│   └── POST /logout            # 登出
│
├── /users                      # 用戶管理
│   ├── GET /me                 # 取得個人資料
│   ├── PATCH /me               # 更新個人資料
│   ├── GET /me/export          # 匯出資料 (GDPR)
│   ├── DELETE /me              # 刪除帳號 (GDPR)
│   └── PATCH /me/settings      # 更新設定
│
├── /compass                    # 意義羅盤
│   ├── GET /                   # 取得所有探索
│   ├── POST /entries           # 新增探索項目
│   ├── GET /analysis           # 取得交集分析
│   └── POST /regenerate        # 重新分析
│
├── /values                     # 價值觀
│   ├── GET /                   # 取得排序結果
│   └── PUT /                   # 儲存排序結果
│
├── /blueprints                 # 三軌人生藍圖
│   ├── GET /                   # 取得所有藍圖
│   ├── POST /                  # 建立藍圖
│   ├── PUT /:id                # 更新藍圖
│   └── DELETE /:id             # 刪除藍圖
│
├── /habits                     # 習慣追蹤
│   ├── GET /                   # 取得所有習慣
│   ├── POST /                  # 建立習慣
│   ├── PUT /:id                # 更新習慣
│   ├── DELETE /:id             # 刪除習慣
│   ├── POST /:id/log           # 打卡
│   ├── POST /:id/makeup        # 補卡
│   └── GET /:id/stats          # 統計資料
│
├── /reflections                # 反思日記
│   ├── GET /                   # 取得日記列表
│   ├── POST /daily             # 新增每日反思
│   ├── POST /gratitude         # 新增感恩日記
│   ├── POST /weekly            # 新增週回顧
│   └── GET /weekly/:date       # 取得週回顧
│
├── /badges                     # 成就系統
│   ├── GET /                   # 取得所有徽章
│   └── GET /my                 # 我的徽章
│
├── /notifications              # 通知
│   ├── GET /                   # 取得通知列表
│   ├── POST /register          # 註冊推播 Token
│   └── PATCH /settings         # 通知設定
│
└── /health                     # 健康檢查
```

## 環境配置

### Cloudflare Bindings

```toml
# wrangler.toml
[vars]
ENVIRONMENT = "production"

[[d1_databases]]
binding = "DB"
database_name = "lifedesign-db"

[[r2_buckets]]
binding = "STORAGE"
bucket_name = "lifedesign-exports"

[[kv_namespaces]]
binding = "CACHE"

[[kv_namespaces]]
binding = "SESSIONS"
```

### 環境變數 (Secrets)

| 變數名稱 | 說明 |
|----------|------|
| `JWT_SECRET` | JWT 簽名密鑰 |
| `ENCRYPTION_KEY` | 資料加密密鑰 |
| `GOOGLE_CLIENT_ID` | Google OAuth Client ID |
| `GOOGLE_CLIENT_SECRET` | Google OAuth Client Secret |
| `APPLE_CLIENT_ID` | Apple Sign-In Client ID |
| `FCM_SERVER_KEY` | Firebase Cloud Messaging Key |
| `APNS_KEY` | APNs 認證 Key |

## 部署環境

| 環境 | Worker 名稱 | Domain | D1 Database |
|------|-------------|--------|-------------|
| **Production** | lifedesign-api-production | api.lifedesign.app | lifedesign-db |
| **Preview** | lifedesign-api-preview | api-preview.lifedesign.app | lifedesign-db-preview |

## 常用指令

```bash
cd apps/api

pnpm dev                           # 啟動本地開發伺服器
pnpm build                         # 建置
pnpm deploy:preview                # 部署到 Preview 環境
pnpm deploy:production             # 部署到 Production 環境

# 資料庫操作
pnpm db:migrate                    # 執行本地遷移
pnpm db:migrate:remote             # 執行遠端遷移
pnpm db:seed                       # 填充測試資料
```

## 效能最佳化

1. **Edge Computing**: Cloudflare 全球 300+ 邊緣節點
2. **D1 Read Replicas**: 讀取自動複製到最近節點
3. **KV Cache**: 熱門資料快取 (徽章定義、問題庫)
4. **Connection Pooling**: D1 自動管理連線池
5. **Response Compression**: Cloudflare 自動 Brotli/Gzip 壓縮

## 監控與可觀測性

| 工具 | 用途 |
|------|------|
| **Cloudflare Analytics** | Worker 效能監控 |
| **Sentry** | 錯誤追蹤 |
| **PostHog** | 產品分析 |
