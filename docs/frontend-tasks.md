# 前端任務清單

> **專案**: LifeDesign 人生設計助手
> **版本**: v1.0
> **建立日期**: 2026-01-28
> **狀態**: 規劃中

---

## 階段一：專案初始化與基礎架構

### 1.1 Monorepo 設置
- [ ] 初始化 pnpm workspace
- [ ] 創建 `apps/web` - Next.js 15 應用
- [ ] 創建 `apps/mobile` - React Native Expo 應用
- [ ] 創建 `packages/shared` - 共用型別與工具
- [ ] 創建 `packages/ui` - 共用 UI 元件庫
- [ ] 配置 TypeScript 5.x 專案設定
- [ ] 配置 ESLint + Prettier 規則
- [ ] 配置 Husky pre-commit hooks

### 1.2 共用套件 (packages/shared)
- [ ] 定義共用型別 (User, Compass, Blueprint, Habit, Reflection 等)
- [ ] 實作 Zod Schema 驗證
- [ ] 建立 API 請求工具函數
- [ ] 建立日期/時間處理工具
- [ ] 建立常數定義檔 (顏色、間距、徽章等)

### 1.3 UI 元件庫 (packages/ui)
- [ ] 配置 TailwindCSS 4.x
- [ ] 整合 Radix UI 無障礙元件
- [ ] 建立設計 Token 系統 (顏色、字型、間距)
- [ ] 建立基礎元件：
  - [ ] Button (Primary, Secondary, Ghost, Destructive)
  - [ ] Input / TextArea
  - [ ] Select / Dropdown
  - [ ] Checkbox / Radio
  - [ ] Modal / Dialog
  - [ ] Toast / Notification
  - [ ] Card / Panel
  - [ ] Avatar
  - [ ] Badge
  - [ ] Progress Bar
  - [ ] Skeleton Loader

---

## 階段二：Web 應用開發 (apps/web)

### 2.1 專案配置
- [ ] 配置 Next.js 15 App Router
- [ ] 設置 React 19 Server Components
- [ ] 配置 next-intl 國際化 (繁中、簡中、英文)
- [ ] 設置 Zustand 狀態管理 stores
- [ ] 配置 TanStack Query 資料快取
- [ ] 設置 Framer Motion 動畫

### 2.2 Zustand Stores 實作
- [ ] `authStore` - 認證狀態管理
- [ ] `onboardingStore` - Onboarding 進度
- [ ] `compassStore` - 意義羅盤資料
- [ ] `blueprintStore` - 三軌人生藍圖
- [ ] `habitStore` - 習慣追蹤
- [ ] `reflectionStore` - 反思日記
- [ ] `settingsStore` - 用戶設定
- [ ] `uiStore` - UI 狀態 (側邊欄、主題等)

### 2.3 認證模組
- [ ] 登入頁面 (Google OAuth / Apple Sign-In)
- [ ] 註冊流程
- [ ] 忘記密碼流程
- [ ] Token 管理與自動刷新
- [ ] 登出功能

### 2.4 Onboarding 流程
- [ ] 歡迎頁面
- [ ] 用戶目標選擇 (職涯轉換/畢業規劃/中年重啟/自我成長)
- [ ] 意義羅盤引導式完成
- [ ] 第一個習慣設定引導
- [ ] 完成頁面與個人化首頁解鎖

### 2.5 核心功能頁面

#### 2.5.1 首頁 (Dashboard)
- [ ] 每日概覽卡片
- [ ] 習慣打卡快捷區
- [ ] 今日反思提醒
- [ ] 連續打卡天數顯示
- [ ] 最近徽章獲得

#### 2.5.2 意義羅盤 (Compass)
- [ ] 四面向問卷介面：
  - [ ] 熱情 (你愛做的事)
  - [ ] 使命 (世界需要的)
  - [ ] 專業 (你擅長的)
  - [ ] 職業 (能賺錢的)
- [ ] D3.js 四圓交集視覺化圖表
- [ ] 分析結果頁面
- [ ] 歷史記錄比較

#### 2.5.3 三軌人生藍圖 (Blueprint)
- [ ] 三版本設計介面：
  - [ ] 版本 A：延續現況的最佳發展
  - [ ] 版本 B：假設 A 不存在的替代方案
  - [ ] 版本 C：無限制的理想生活
- [ ] 里程碑時間軸設定
- [ ] 進度追蹤視圖
- [ ] 版本比較功能

#### 2.5.4 價值觀排序 (Values)
- [ ] 價值觀卡片拖曳排序介面
- [ ] 前五名核心價值觀確認
- [ ] 價值觀與目標對齊檢視

#### 2.5.5 習慣追蹤器 (Habits)
- [ ] 習慣列表頁面
- [ ] 新增習慣表單 (微習慣原則)
- [ ] 每日打卡介面
- [ ] 連續打卡統計 (3/7/21/66/100 天里程碑)
- [ ] 習慣完成率圖表 (Recharts)
- [ ] 彈性補卡功能 (每週 1 次)

#### 2.5.6 每日反思 (Reflections)
- [ ] 反思日記編輯器
- [ ] 引導式反思問題
- [ ] 感恩日記區塊
- [ ] 心情記錄選擇器
- [ ] 歷史反思瀏覽

#### 2.5.7 週回顧 (Weekly Review)
- [ ] 一週習慣完成總覽
- [ ] 目標進度檢視
- [ ] 下週計畫設定
- [ ] 週報產生功能

#### 2.5.8 成就系統 (Achievements)
- [ ] 徽章展示頁面
- [ ] 已獲得 vs 未解鎖徽章
- [ ] 獲得徽章動畫效果
- [ ] 成就進度條

### 2.6 設定頁面
- [ ] 個人資料編輯
- [ ] 通知偏好設定
- [ ] 隱私設定 (GDPR)
- [ ] 資料匯出功能
- [ ] 帳號刪除功能
- [ ] 語言切換
- [ ] 深色/淺色主題切換

### 2.7 離線支援 (PWA)
- [ ] 配置 Workbox Service Worker
- [ ] IndexedDB 離線資料儲存 (Dexie.js)
- [ ] 離線時的打卡同步機制
- [ ] 安裝 PWA 提示

---

## 階段三：Mobile 應用開發 (apps/mobile)

### 3.1 專案配置
- [ ] 初始化 Expo 52 專案
- [ ] 配置 React Native 0.76
- [ ] 設置 React Native Paper 主題
- [ ] 配置 React Navigation 6
- [ ] 設置 MMKV 本地儲存
- [ ] 配置 TanStack Query 離線支援

### 3.2 導航結構
- [ ] 底部 Tab 導航 (首頁/羅盤/習慣/反思/設定)
- [ ] Stack 導航配置
- [ ] Deep Linking 設定

### 3.3 認證模組
- [ ] Google Sign-In 整合
- [ ] Apple Sign-In 整合
- [ ] react-native-keychain Token 安全存儲
- [ ] 生物辨識登入 (Face ID / 指紋)

### 3.4 核心功能頁面
- [ ] 首頁 Dashboard
- [ ] 意義羅盤 (適配行動版 UI)
- [ ] 三軌藍圖
- [ ] 價值觀排序 (拖曳手勢)
- [ ] 習慣追蹤器
- [ ] 每日反思
- [ ] 週回顧
- [ ] 成就系統
- [ ] 設定頁面

### 3.5 推播通知
- [ ] Firebase Cloud Messaging 整合
- [ ] 習慣提醒本地通知 (Notifee)
- [ ] 反思提醒通知
- [ ] 週回顧提醒

### 3.6 性能優化
- [ ] 啟用 Hermes JavaScript 引擎
- [ ] React Native Reanimated 動畫優化
- [ ] FlatList 虛擬化優化
- [ ] 圖片優化 (expo-image)

### 3.7 測試
- [ ] Jest 單元測試設置
- [ ] React Native Testing Library 整合
- [ ] Detox E2E 測試配置

---

## 階段四：測試與品質保證

### 4.1 Web 測試
- [ ] Vitest 單元測試配置
- [ ] @testing-library/react 元件測試
- [ ] Playwright E2E 測試
- [ ] 測試覆蓋率報告

### 4.2 無障礙測試
- [ ] WCAG 2.1 AA 合規檢查
- [ ] 螢幕閱讀器測試
- [ ] 鍵盤導航測試
- [ ] 顏色對比度檢查

### 4.3 性能測試
- [ ] Lighthouse 分數優化 (目標 90+)
- [ ] Core Web Vitals 優化
- [ ] Bundle 大小分析

---

## 階段五：部署準備

### 5.1 Web 部署
- [ ] Cloudflare Pages/Workers 配置
- [ ] 環境變數設定
- [ ] 域名配置 (lifedesign.app)

### 5.2 Mobile 發布
- [ ] EAS Build 配置
- [ ] iOS App Store 準備
- [ ] Android Play Store 準備
- [ ] 應用截圖與描述

---

## 優先級說明

| 優先級 | 說明 | 預計完成 |
|--------|------|----------|
| P0 | MVP 必須功能 | Q1 2026 |
| P1 | 重要功能 | Q2 2026 |
| P2 | 後續迭代 | Q3 2026+ |

### P0 任務 (MVP)
- 階段一全部
- 2.1-2.5 (不含週回顧)
- 3.1-3.4

### P1 任務
- 2.5.7 週回顧
- 2.6 設定頁面
- 2.7 離線支援
- 3.5-3.6

### P2 任務
- 階段四測試
- 階段五部署
- 進階功能 (社群、AI 建議等)

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
