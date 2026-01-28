# CI/CD Pipeline

## 概覽

LifeDesign 使用 GitHub Actions 實現自動化測試與部署，採用 Monorepo 結構：

```
┌─────────────────────────────────────────────────────────────────┐
│                    GitHub Actions Workflows                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐ │
│  │     ci.yml      │  │  deploy-web.yml │  │  deploy-api.yml │ │
│  │                 │  │                 │  │                 │ │
│  │  Lint + Test    │  │  Web 部署       │  │  API 部署       │ │
│  │  (All PRs)      │  │  (Next.js)      │  │  (Hono)         │ │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘ │
│                                                                 │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐ │
│  │ deploy-mobile.yml│ │  keep-alive.yml │  │  release.yml    │ │
│  │                 │  │                 │  │                 │ │
│  │  Mobile 建置    │  │  Worker 保活    │  │  版本發布       │ │
│  │  (EAS Build)    │  │  (每 5 分鐘)    │  │  (Semantic)     │ │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘ │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 1. CI 檢查 (ci.yml)

### 觸發條件

```yaml
on:
  pull_request:
    branches: [main, develop]
  push:
    branches: [develop]
```

### 檢查流程

```
Pull Request / Push
        │
        ▼
┌─────────────────────────────────────────┐
│           Job: lint-and-typecheck       │
├─────────────────────────────────────────┤
│  1. Checkout                            │
│  2. Setup pnpm 9 + Node.js 20           │
│  3. pnpm install --frozen-lockfile      │
│  4. pnpm lint (ESLint)                  │
│  5. pnpm type-check (tsc)               │
└─────────────────────────────────────────┘
        │
        ▼
┌─────────────────────────────────────────┐
│              Job: test                  │
├─────────────────────────────────────────┤
│  1. pnpm test:unit (Vitest)             │
│  2. pnpm test:a11y (axe-core)           │
│  3. Upload coverage report              │
└─────────────────────────────────────────┘
        │
        ▼
┌─────────────────────────────────────────┐
│             Job: e2e (optional)         │
├─────────────────────────────────────────┤
│  1. Build web app                       │
│  2. Start preview server                │
│  3. Run Playwright tests                │
└─────────────────────────────────────────┘
```

---

## 2. Web 部署 (deploy-web.yml)

### 觸發條件

```yaml
on:
  push:
    branches: [main, develop]
    paths:
      - 'apps/web/**'
      - 'packages/**'
      - '.github/workflows/deploy-web.yml'
  workflow_dispatch:
    inputs:
      environment:
        type: choice
        options: [preview, production]
```

### 部署流程

```
Push to apps/web/**
        │
        ▼
┌───────────────────┐
│  Checkout Code    │
└───────────────────┘
        │
        ▼
┌───────────────────┐
│  Setup pnpm 9     │
│  Setup Node.js 20 │
└───────────────────┘
        │
        ▼
┌───────────────────┐
│  pnpm install     │
│  --frozen-lockfile│
└───────────────────┘
        │
        ▼
┌───────────────────┐
│  pnpm build:cf    │
│  (OpenNext Build) │
└───────────────────┘
        │
        ▼
┌───────────────────┐
│  Wrangler Deploy  │
│  to Cloudflare    │
└───────────────────┘
        │
        ▼ (main branch only)
┌───────────────────┐
│  Purge Cloudflare │
│  Cache            │
└───────────────────┘
```

### 環境變數配置

| 變數 | main 分支 | 其他分支 |
|------|-----------|----------|
| `NEXT_PUBLIC_API_URL` | `https://api.lifedesign.app/api/v1` | `https://api-preview.lifedesign.app/api/v1` |
| `NEXT_PUBLIC_ENABLE_ANALYTICS` | `true` | `false` |

---

## 3. API 部署 (deploy-api.yml)

### 觸發條件

```yaml
on:
  push:
    branches: [main, develop]
    paths:
      - 'apps/api/**'
      - 'packages/shared/**'
      - '.github/workflows/deploy-api.yml'
  workflow_dispatch:
    inputs:
      environment:
        type: choice
        options: [preview, production]
```

### 部署流程

```
Push to apps/api/**
        │
        ▼
┌─────────────────────────────────────────┐
│           Job: lint-and-typecheck       │
├─────────────────────────────────────────┤
│  1. Checkout                            │
│  2. Setup pnpm 9 + Node.js 20           │
│  3. pnpm install --frozen-lockfile      │
│  4. tsc --noEmit (Type Check)           │
└─────────────────────────────────────────┘
        │
        ▼ (on push/workflow_dispatch only)
┌─────────────────────────────────────────┐
│              Job: deploy                │
├─────────────────────────────────────────┤
│  1. Determine Environment               │
│     - main → production                 │
│     - develop → preview                 │
│     - workflow_dispatch → user choice   │
│                                         │
│  2. Check Required Secrets              │
│     - JWT_SECRET (required)             │
│     - ENCRYPTION_KEY (required)         │
│                                         │
│  3. Wrangler Deploy                     │
│                                         │
│  4. Upload Secrets to Workers           │
│                                         │
│  5. Apply D1 Migrations                 │
│     - 最多重試 3 次                     │
│     - 重試間隔 10 秒                    │
└─────────────────────────────────────────┘
```

---

## 4. Mobile 建置 (deploy-mobile.yml)

### 觸發條件

```yaml
on:
  push:
    branches: [main]
    paths:
      - 'apps/mobile/**'
      - 'packages/**'
  workflow_dispatch:
    inputs:
      platform:
        type: choice
        options: [all, ios, android]
      profile:
        type: choice
        options: [preview, production]
```

### 建置流程

```
Push to apps/mobile/**
        │
        ▼
┌─────────────────────────────────────────┐
│           Job: build-mobile             │
├─────────────────────────────────────────┤
│  1. Checkout                            │
│  2. Setup pnpm + Node.js                │
│  3. Setup Expo                          │
│  4. Install dependencies                │
│  5. Run EAS Build                       │
│     - iOS: eas build --platform ios     │
│     - Android: eas build --platform android │
│  6. Upload artifacts                    │
└─────────────────────────────────────────┘
        │
        ▼ (production profile only)
┌─────────────────────────────────────────┐
│           Job: submit                   │
├─────────────────────────────────────────┤
│  1. Download build artifacts            │
│  2. eas submit --platform ios           │
│  3. eas submit --platform android       │
└─────────────────────────────────────────┘
```

### EAS Build Profiles

```json
// eas.json
{
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal",
      "ios": {
        "simulator": false
      }
    },
    "production": {
      "autoIncrement": true
    }
  }
}
```

---

## 5. Worker Keep-Alive (keep-alive.yml)

### 用途

定期 ping Cloudflare Workers，保持 Worker 溫暖，減少冷啟動延遲。

### 觸發條件

```yaml
on:
  schedule:
    - cron: '*/5 * * * *'  # 每 5 分鐘
  workflow_dispatch:        # 手動觸發
```

### 健康檢查端點

| 端點 | 說明 |
|------|------|
| `https://lifedesign.app/api/health` | Web Worker |
| `https://api.lifedesign.app/health` | API Worker |

---

## 6. 版本發布 (release.yml)

### 觸發條件

```yaml
on:
  push:
    tags:
      - 'v*'
  workflow_dispatch:
    inputs:
      version:
        type: string
        description: 'Version to release (e.g., 1.0.0)'
```

### 發布流程

```
Push tag v*
        │
        ▼
┌─────────────────────────────────────────┐
│           Job: release                  │
├─────────────────────────────────────────┤
│  1. Extract version from tag            │
│  2. Generate changelog                  │
│  3. Create GitHub Release               │
│  4. Deploy to production (all apps)     │
│  5. Trigger mobile build (production)   │
└─────────────────────────────────────────┘
```

---

## GitHub Secrets 完整清單

| Secret 名稱 | 用途 | 必要性 |
|-------------|------|--------|
| **Cloudflare** | | |
| `CLOUDFLARE_API_TOKEN` | Cloudflare 部署權限 | 必要 |
| `CLOUDFLARE_ZONE_ID` | 快取清除用 | Web 必要 |
| **Backend** | | |
| `JWT_SECRET` | JWT 簽名密鑰 | 必要 |
| `ENCRYPTION_KEY` | 資料加密密鑰 | 必要 |
| `GOOGLE_CLIENT_ID` | Google OAuth | 必要 |
| `GOOGLE_CLIENT_SECRET` | Google OAuth | 必要 |
| `APPLE_CLIENT_ID` | Apple Sign-In | iOS 必要 |
| `FCM_SERVER_KEY` | Firebase 推播 | 選填 |
| **Mobile** | | |
| `EXPO_TOKEN` | Expo EAS Build | Mobile 必要 |
| `APPLE_APP_STORE_CONNECT_API_KEY` | App Store 提交 | iOS 必要 |
| `GOOGLE_SERVICE_ACCOUNT_KEY` | Play Store 提交 | Android 必要 |
| **Analytics** | | |
| `POSTHOG_KEY` | PostHog Analytics | 選填 |
| `SENTRY_DSN` | Sentry 錯誤追蹤 | 選填 |
| `SENTRY_AUTH_TOKEN` | Sentry 認證 | 選填 |

---

## 部署環境對應

### Web

| 分支 | Worker 名稱 | Domain |
|------|-------------|--------|
| `main` | lifedesign-web-production | lifedesign.app |
| `develop` | lifedesign-web-preview | preview.lifedesign.app |

### API

| 分支 | Worker 名稱 | Domain | D1 Database |
|------|-------------|--------|-------------|
| `main` | lifedesign-api-production | api.lifedesign.app | lifedesign-db |
| `develop` | lifedesign-api-preview | api-preview.lifedesign.app | lifedesign-db-preview |

### Mobile

| Profile | 用途 | 發布管道 |
|---------|------|----------|
| `development` | 本地開發 | Expo Dev Client |
| `preview` | 內部測試 | TestFlight / Internal Testing |
| `production` | 正式發布 | App Store / Play Store |

---

## Monorepo 配置

### Turborepo (turbo.json)

```json
{
  "$schema": "https://turbo.build/schema.json",
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "dist/**", ".open-next/**"]
    },
    "lint": {
      "outputs": []
    },
    "test": {
      "dependsOn": ["build"],
      "outputs": []
    },
    "dev": {
      "cache": false,
      "persistent": true
    }
  }
}
```

### pnpm Workspace (pnpm-workspace.yaml)

```yaml
packages:
  - 'apps/*'
  - 'packages/*'
```

---

## 手動部署指令

```bash
# Web
cd apps/web
pnpm build:cf
wrangler deploy --env production    # 或 --env preview

# API
cd apps/api
pnpm deploy:production              # 或 pnpm deploy:preview

# Mobile
cd apps/mobile
eas build --profile production --platform all
eas submit --platform all
```

---

## 故障排除

### D1 Migration 失敗

Migration 會自動重試 3 次，間隔 10 秒。如仍失敗：

1. 檢查 migration 檔案語法
2. 手動執行：`wrangler d1 migrations apply lifedesign-db --remote --env production`

### Secrets 未設定

檢查 GitHub Repository Settings → Secrets and variables → Actions

### Mobile Build 失敗

1. 確認 `EXPO_TOKEN` 已設定
2. 檢查 `app.json` 版本號
3. 查看 EAS Build 詳細日誌：`eas build:view`

### 快取問題

Production 部署後會自動清除 Cloudflare 快取。如需手動清除：

```bash
curl -X POST "https://api.cloudflare.com/client/v4/zones/ZONE_ID/purge_cache" \
  -H "Authorization: Bearer CF_API_TOKEN" \
  -H "Content-Type: application/json" \
  --data '{"purge_everything":true}'
```
