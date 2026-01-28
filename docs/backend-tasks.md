# 後端任務清單

> **專案**: LifeDesign 人生設計助手
> **版本**: v1.0
> **建立日期**: 2026-01-28
> **狀態**: 規劃中

---

## 階段一：專案初始化與基礎架構

### 1.1 API 專案設置 (apps/api)
- [ ] 初始化 Hono 4.x 專案
- [ ] 配置 TypeScript 5.x
- [ ] 設置 Cloudflare Workers 開發環境
- [ ] 配置 Wrangler CLI
- [ ] 設置環境變數管理 (dev/preview/production)
- [ ] 配置 ESLint + Prettier

### 1.2 Cloudflare 資源設置
- [ ] 創建 D1 資料庫 (lifedesign-db)
- [ ] 創建 R2 儲存桶 (lifedesign-storage)
- [ ] 創建 KV 命名空間 (lifedesign-cache, lifedesign-sessions)
- [ ] 配置 Cloudflare Workers 路由

### 1.3 中介軟體 (Middleware)
- [ ] CORS 中介軟體配置
- [ ] 請求日誌記錄
- [ ] 錯誤處理中介軟體
- [ ] Rate Limiting 實作
- [ ] 認證中介軟體 (JWT 驗證)
- [ ] 請求驗證中介軟體 (Zod)

---

## 階段二：資料庫設計與遷移

### 2.1 用戶相關表
- [ ] `users` - 用戶基本資訊
  ```sql
  id, email, name, avatar_url,
  auth_provider, created_at, updated_at
  ```
- [ ] `user_settings` - 用戶設定
  ```sql
  user_id, language, theme, timezone,
  notification_enabled, reminder_time
  ```
- [ ] `user_onboarding` - Onboarding 進度
  ```sql
  user_id, step, completed_at, user_goal
  ```

### 2.2 自我探索表
- [ ] `compass_entries` - 意義羅盤回答
  ```sql
  id, user_id, dimension (passion/mission/profession/vocation),
  question_id, answer, created_at
  ```
- [ ] `compass_results` - 羅盤分析結果
  ```sql
  id, user_id, intersection_score, insights, created_at
  ```
- [ ] `user_values` - 用戶價值觀
  ```sql
  id, user_id, value_name, rank, created_at
  ```
- [ ] `satisfaction_scores` - 生活滿意度
  ```sql
  id, user_id, area, score, recorded_at
  ```
- [ ] `strengths_results` - 優勢探索結果
  ```sql
  id, user_id, strength_name, description, created_at
  ```

### 2.3 目標設定表
- [ ] `life_blueprints` - 三軌人生藍圖
  ```sql
  id, user_id, version (A/B/C), title,
  description, status, created_at, updated_at
  ```
- [ ] `blueprint_milestones` - 藍圖里程碑
  ```sql
  id, blueprint_id, title, target_date,
  completed, completed_at
  ```
- [ ] `goals` - 目標設定
  ```sql
  id, user_id, blueprint_id, title,
  description, deadline, status
  ```
- [ ] `key_results` - 關鍵結果 (OKR)
  ```sql
  id, goal_id, description, target_value,
  current_value, unit
  ```

### 2.4 習慣養成表
- [ ] `habits` - 習慣定義
  ```sql
  id, user_id, name, description, frequency,
  reminder_time, is_active, created_at
  ```
- [ ] `habit_logs` - 習慣打卡記錄
  ```sql
  id, habit_id, completed_at, is_makeup
  ```
- [ ] `habit_streaks` - 連續打卡統計
  ```sql
  id, habit_id, current_streak, longest_streak,
  last_completed_at
  ```

### 2.5 反思日記表
- [ ] `reflections` - 每日反思
  ```sql
  id, user_id, content, mood, reflection_date, created_at
  ```
- [ ] `gratitude_entries` - 感恩日記
  ```sql
  id, reflection_id, content
  ```
- [ ] `weekly_reviews` - 週回顧
  ```sql
  id, user_id, week_start, summary,
  wins, challenges, next_week_focus
  ```
- [ ] `mood_logs` - 心情記錄
  ```sql
  id, user_id, mood, note, logged_at
  ```

### 2.6 成就系統表
- [ ] `badges` - 徽章定義
  ```sql
  id, name, description, icon, criteria
  ```
- [ ] `user_badges` - 用戶獲得的徽章
  ```sql
  id, user_id, badge_id, earned_at
  ```
- [ ] `achievements` - 成就記錄
  ```sql
  id, user_id, achievement_type, value, achieved_at
  ```

### 2.7 資料庫遷移
- [ ] 編寫初始遷移腳本
- [ ] 設置種子資料 (徽章、預設問題等)
- [ ] 配置遷移自動化

---

## 階段三：認證系統

### 3.1 OAuth 2.0 整合
- [ ] Google OAuth 整合
- [ ] Apple Sign-In 整合
- [ ] OAuth 回調處理
- [ ] 用戶創建/關聯邏輯

### 3.2 JWT 管理
- [ ] Access Token 生成 (jose 5)
- [ ] Refresh Token 機制
- [ ] Token 驗證中介軟體
- [ ] Token 黑名單 (KV 儲存)

### 3.3 Session 管理
- [ ] Session 創建與存儲 (KV)
- [ ] Session 過期處理
- [ ] 多裝置 Session 管理

### 3.4 密碼安全 (備用登入)
- [ ] 密碼雜湊 (bcryptjs)
- [ ] 密碼重設流程
- [ ] 安全問題驗證

---

## 階段四：API 端點實作

### 4.1 認證 API (`/api/v1/auth`)
- [ ] `POST /auth/google` - Google OAuth 登入
- [ ] `POST /auth/apple` - Apple Sign-In
- [ ] `POST /auth/refresh` - Token 刷新
- [ ] `POST /auth/logout` - 登出
- [ ] `POST /auth/revoke` - 撤銷所有 Session

### 4.2 用戶 API (`/api/v1/users`)
- [ ] `GET /users/me` - 取得當前用戶資訊
- [ ] `PATCH /users/me` - 更新用戶資訊
- [ ] `GET /users/me/settings` - 取得用戶設定
- [ ] `PATCH /users/me/settings` - 更新用戶設定
- [ ] `GET /users/me/onboarding` - 取得 Onboarding 進度
- [ ] `PATCH /users/me/onboarding` - 更新 Onboarding 進度
- [ ] `GET /users/me/export` - 匯出用戶資料 (GDPR)
- [ ] `DELETE /users/me` - 刪除帳號 (GDPR)
- [ ] `PATCH /users/me/privacy` - 更新隱私設定

### 4.3 意義羅盤 API (`/api/v1/compass`)
- [ ] `GET /compass/questions` - 取得羅盤問題
- [ ] `POST /compass/entries` - 提交羅盤回答
- [ ] `GET /compass/entries` - 取得歷史回答
- [ ] `GET /compass/results` - 取得分析結果
- [ ] `POST /compass/analyze` - 觸發分析計算

### 4.4 價值觀 API (`/api/v1/values`)
- [ ] `GET /values/templates` - 取得價值觀範本
- [ ] `GET /values` - 取得用戶價值觀排序
- [ ] `PUT /values` - 更新價值觀排序
- [ ] `GET /values/history` - 價值觀歷史變化

### 4.5 三軌藍圖 API (`/api/v1/blueprints`)
- [ ] `GET /blueprints` - 取得所有藍圖
- [ ] `POST /blueprints` - 創建新藍圖
- [ ] `GET /blueprints/:id` - 取得單一藍圖
- [ ] `PATCH /blueprints/:id` - 更新藍圖
- [ ] `DELETE /blueprints/:id` - 刪除藍圖
- [ ] `GET /blueprints/:id/milestones` - 取得里程碑
- [ ] `POST /blueprints/:id/milestones` - 新增里程碑
- [ ] `PATCH /blueprints/:id/milestones/:mid` - 更新里程碑
- [ ] `DELETE /blueprints/:id/milestones/:mid` - 刪除里程碑

### 4.6 習慣追蹤 API (`/api/v1/habits`)
- [ ] `GET /habits` - 取得所有習慣
- [ ] `POST /habits` - 創建新習慣
- [ ] `GET /habits/:id` - 取得單一習慣
- [ ] `PATCH /habits/:id` - 更新習慣
- [ ] `DELETE /habits/:id` - 刪除習慣
- [ ] `POST /habits/:id/check-in` - 打卡
- [ ] `POST /habits/:id/makeup` - 補卡
- [ ] `GET /habits/:id/logs` - 取得打卡記錄
- [ ] `GET /habits/:id/streak` - 取得連續統計
- [ ] `GET /habits/stats` - 整體統計資料

### 4.7 反思日記 API (`/api/v1/reflections`)
- [ ] `GET /reflections` - 取得反思列表
- [ ] `POST /reflections` - 創建反思
- [ ] `GET /reflections/:id` - 取得單一反思
- [ ] `PATCH /reflections/:id` - 更新反思
- [ ] `DELETE /reflections/:id` - 刪除反思
- [ ] `GET /reflections/weekly` - 取得週回顧列表
- [ ] `POST /reflections/weekly` - 創建週回顧
- [ ] `GET /reflections/moods` - 取得心情記錄

### 4.8 成就系統 API (`/api/v1/badges`)
- [ ] `GET /badges` - 取得所有徽章定義
- [ ] `GET /badges/mine` - 取得已獲得徽章
- [ ] `GET /badges/progress` - 取得徽章進度
- [ ] `POST /badges/check` - 檢查並頒發新徽章

### 4.9 通知 API (`/api/v1/notifications`)
- [ ] `POST /notifications/register` - 註冊裝置 Token
- [ ] `DELETE /notifications/unregister` - 取消註冊
- [ ] `GET /notifications/preferences` - 取得通知偏好
- [ ] `PATCH /notifications/preferences` - 更新通知偏好

---

## 階段五：背景任務與排程

### 5.1 定時任務
- [ ] 每日習慣提醒推播
- [ ] 反思時間提醒
- [ ] 週回顧提醒 (週日)
- [ ] 連續打卡里程碑通知

### 5.2 徽章檢查任務
- [ ] 首次完成類徽章檢查
- [ ] 連續打卡徽章檢查
- [ ] 里程碑達成徽章檢查

### 5.3 資料維護任務
- [ ] 過期 Session 清理
- [ ] 資料備份排程
- [ ] 統計資料預計算

---

## 階段六：推播通知整合

### 6.1 Firebase Cloud Messaging
- [ ] FCM 服務設置
- [ ] Web Push 通知
- [ ] Android 推播

### 6.2 Apple Push Notification
- [ ] APNs 憑證配置
- [ ] iOS 推播實作

### 6.3 通知範本
- [ ] 習慣提醒通知
- [ ] 反思提醒通知
- [ ] 成就獲得通知
- [ ] 週回顧提醒

---

## 階段七：安全性實作

### 7.1 傳輸安全
- [ ] TLS 1.3 確認 (Cloudflare 管理)
- [ ] HSTS 標頭配置

### 7.2 資料安全
- [ ] 敏感資料 AES-256 加密 (Web Crypto API)
- [ ] 加密金鑰管理
- [ ] 資料庫欄位加密

### 7.3 API 安全
- [ ] Rate Limiting 配置
  - 認證 API: 10 req/min
  - 一般 API: 100 req/min
- [ ] SQL Injection 防護 (Prepared Statements)
- [ ] CORS 白名單配置
- [ ] Request 驗證 (Zod)

### 7.4 GDPR 合規
- [ ] 資料匯出功能實作
- [ ] 帳號刪除功能 (30 天緩衝期)
- [ ] 隱私設定 API
- [ ] 資料處理日誌

---

## 階段八：監控與日誌

### 8.1 日誌系統
- [ ] 請求日誌記錄
- [ ] 錯誤日誌記錄
- [ ] 結構化日誌格式

### 8.2 監控指標
- [ ] API 回應時間
- [ ] 錯誤率追蹤
- [ ] 資料庫查詢性能

### 8.3 告警設置
- [ ] 錯誤率閾值告警
- [ ] 延遲閾值告警

---

## 階段九：測試

### 9.1 單元測試
- [ ] 中介軟體測試
- [ ] 工具函數測試
- [ ] 驗證邏輯測試

### 9.2 整合測試
- [ ] API 端點測試
- [ ] 資料庫操作測試
- [ ] 認證流程測試

### 9.3 E2E 測試
- [ ] 完整用戶流程測試
- [ ] OAuth 流程測試

---

## 階段十：部署與 CI/CD

### 10.1 CI/CD Pipeline
- [ ] GitHub Actions 配置
- [ ] PR 檢查 (Lint + Test)
- [ ] 自動部署到 Preview
- [ ] 生產環境部署

### 10.2 環境配置
- [ ] Preview 環境 (api-preview.lifedesign.app)
- [ ] Production 環境 (api.lifedesign.app)
- [ ] 環境變數管理

### 10.3 Worker 維護
- [ ] Keep-alive 排程 (每 5 分鐘)
- [ ] Cold Start 優化

---

## 優先級說明

| 優先級 | 說明 | 預計完成 |
|--------|------|----------|
| P0 | MVP 必須功能 | Q1 2026 |
| P1 | 重要功能 | Q2 2026 |
| P2 | 後續迭代 | Q3 2026+ |

### P0 任務 (MVP)
- 階段一全部
- 階段二：2.1-2.4
- 階段三全部
- 階段四：4.1-4.7
- 階段七：7.1-7.3

### P1 任務
- 階段二：2.5-2.6
- 階段四：4.8-4.9
- 階段五全部
- 階段六全部
- 階段七：7.4

### P2 任務
- 階段八、九、十

---

## API 版本控制

- 當前版本: `v1`
- 版本路徑: `/api/v1/*`
- 版本棄用策略: 新版本發布後，舊版本維護 6 個月

---

## 技術債務追蹤

| 項目 | 描述 | 狀態 |
|------|------|------|
| - | - | - |

---

## 更新日誌

| 日期 | 更新內容 | 負責人 |
|------|----------|--------|
| 2026-01-28 | 初始任務清單建立 | - |
