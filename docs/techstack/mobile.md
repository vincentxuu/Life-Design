# Mobile App 技術棧

## 核心框架

| 技術 | 版本 | 用途 | 選用理由 |
|------|------|------|----------|
| **React Native** | 0.76.x | 跨平台 Mobile 框架 | 與 Web 共享邏輯、熱門生態系 |
| **Expo** | 52.x | React Native 開發工具鏈 | 簡化開發流程、OTA 更新 |
| **TypeScript** | 5.x | 型別安全 | 全專案型別共享 |

## 平台支援

| 平台 | 最低版本 | 說明 |
|------|----------|------|
| **iOS** | 14.0+ | iPhone 6s 以上 |
| **Android** | 10 (API 29)+ | 2019 年後裝置 |

## UI 框架

| 技術 | 版本 | 用途 | 選用理由 |
|------|------|------|----------|
| **React Native Paper** | 5.x | Material Design 元件 | 美觀、無障礙支援 |
| **React Native Reanimated** | 3.x | 高效能動畫 | 60fps 流暢動畫 |
| **React Native Gesture Handler** | 2.x | 手勢處理 | 卡片拖放、滑動操作 |
| **React Navigation** | 6.x | 導航管理 | 標準 Mobile 導航模式 |

### UI 元件對應

| 功能 | Web (Radix UI) | Mobile (RN Paper) |
|------|---------------|------------------|
| 按鈕 | Button | Button |
| 對話框 | Dialog | Dialog |
| 進度條 | Progress | ProgressBar |
| 核取方塊 | Checkbox | Checkbox |
| 切換開關 | Switch | Switch |
| 滑桿 | Slider | Slider (custom) |
| 卡片拖放 | @dnd-kit | react-native-gesture-handler |

## 狀態管理

| 技術 | 版本 | 用途 |
|------|------|------|
| **Zustand** | 5.x | 全域客戶端狀態 |
| **TanStack Query** | 5.x | 伺服器狀態與快取 |
| **MMKV** | 2.x | 高效能本地儲存 |

### 狀態持久化

```typescript
// 使用 MMKV 取代 AsyncStorage
// 效能提升 10x+

import { MMKV } from 'react-native-mmkv'

const storage = new MMKV()

// Zustand 持久化中介軟體
const zustandStorage = {
  getItem: (name) => storage.getString(name),
  setItem: (name, value) => storage.set(name, value),
  removeItem: (name) => storage.delete(name),
}
```

## 認證

| 技術 | 用途 |
|------|------|
| **@react-native-google-signin/google-signin** | Google OAuth |
| **@invertase/react-native-apple-authentication** | Apple Sign-In |
| **react-native-keychain** | 安全儲存 Token |

### 認證流程

```
┌──────────────────┐
│    App 啟動      │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  檢查 Keychain   │──── Token 存在 ───▶ 驗證 Token ──▶ 進入主畫面
│  是否有 Token    │
└────────┬─────────┘
         │
    Token 不存在
         │
         ▼
┌──────────────────┐
│   顯示登入畫面   │
│  Google / Apple  │
└──────────────────┘
```

## 推播通知

| 技術 | 用途 |
|------|------|
| **@react-native-firebase/messaging** | FCM 推播 (Android) |
| **@notifee/react-native** | 本地通知 + 客製化 |
| **expo-notifications** | Expo 通知整合 |

### 推播場景

```typescript
// 習慣提醒
{
  id: 'habit-reminder',
  title: '今天也辛苦了 ✨',
  body: '記得完成你的習慣打卡',
  schedule: { hour: 21, minute: 0 }
}

// 週回顧提醒
{
  id: 'weekly-review',
  title: '週回顧時間 📝',
  body: '回顧這一週的成長與學習',
  schedule: { weekday: 7, hour: 18, minute: 0 } // 週日 18:00
}
```

## 離線支援

| 技術 | 用途 |
|------|------|
| **MMKV** | 本地資料儲存 |
| **@react-native-community/netinfo** | 網路狀態偵測 |
| **TanStack Query** | 離線佇列與同步 |

### 離線策略

```
┌──────────────────┐
│    用戶操作      │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐     離線
│   檢查網路狀態   │────────────▶ 儲存至本地佇列
└────────┬─────────┘              (MMKV)
         │                           │
      在線                           │
         │                           ▼
         ▼                    ┌──────────────┐
┌──────────────────┐          │  網路恢復時  │
│   同步至伺服器   │◀─────────│  批次同步    │
└──────────────────┘          └──────────────┘
```

## 安全性

| 功能 | 實作方式 |
|------|----------|
| Token 儲存 | react-native-keychain (加密) |
| 敏感資料加密 | react-native-aes-crypto |
| 生物辨識 | expo-local-authentication |
| SSL Pinning | react-native-ssl-pinning |

## 專案結構

```
apps/mobile/
├── src/
│   ├── screens/                # 畫面
│   │   ├── auth/               # 認證相關
│   │   │   ├── LoginScreen.tsx
│   │   │   └── RegisterScreen.tsx
│   │   ├── onboarding/         # 新用戶引導
│   │   │   ├── WelcomeScreen.tsx
│   │   │   └── CompassIntroScreen.tsx
│   │   ├── explore/            # 自我探索
│   │   │   ├── CompassScreen.tsx
│   │   │   ├── ValuesScreen.tsx
│   │   │   └── StrengthsScreen.tsx
│   │   ├── design/             # 目標設定
│   │   │   ├── BlueprintScreen.tsx
│   │   │   └── GoalsScreen.tsx
│   │   ├── habits/             # 習慣追蹤
│   │   │   ├── HabitsScreen.tsx
│   │   │   └── HabitDetailScreen.tsx
│   │   ├── reflect/            # 反思日記
│   │   │   ├── ReflectionScreen.tsx
│   │   │   ├── GratitudeScreen.tsx
│   │   │   └── WeeklyReviewScreen.tsx
│   │   ├── profile/            # 個人檔案
│   │   └── settings/           # 設定
│   │
│   ├── components/             # 元件
│   │   ├── compass/            # 意義羅盤
│   │   ├── habits/             # 習慣相關
│   │   ├── reflection/         # 反思相關
│   │   └── shared/             # 共用元件
│   │
│   ├── navigation/             # 導航
│   │   ├── RootNavigator.tsx   # 根導航
│   │   ├── AuthNavigator.tsx   # 認證導航
│   │   ├── MainNavigator.tsx   # 主要導航
│   │   └── TabNavigator.tsx    # 底部 Tab
│   │
│   ├── hooks/                  # 自訂 Hooks
│   ├── services/               # API 服務
│   ├── store/                  # Zustand stores
│   ├── utils/                  # 工具函式
│   └── theme/                  # 主題設定
│
├── assets/                     # 靜態資源
├── app.json                    # Expo 配置
├── eas.json                    # EAS Build 配置
└── package.json
```

## 導航結構

```
RootNavigator
├── AuthNavigator (未登入)
│   ├── Login
│   └── Register
│
└── MainNavigator (已登入)
    ├── OnboardingNavigator (首次使用)
    │   ├── Welcome
    │   ├── CompassIntro
    │   ├── CompassExplore
    │   ├── FirstHabit
    │   └── Complete
    │
    └── TabNavigator
        ├── Dashboard (首頁)
        ├── Explore (探索)
        │   ├── Compass
        │   ├── Values
        │   └── Strengths
        ├── Habits (習慣)
        │   ├── HabitList
        │   └── HabitDetail
        ├── Reflect (反思)
        │   ├── Daily
        │   ├── Gratitude
        │   └── Weekly
        └── Profile (個人)
            ├── Badges
            ├── Stats
            └── Settings
```

## 開發與部署

### Expo EAS Build

| 環境 | Profile | 用途 |
|------|---------|------|
| Development | `development` | 本地開發、除錯 |
| Preview | `preview` | 內部測試 |
| Production | `production` | App Store / Play Store |

### 常用指令

```bash
cd apps/mobile

# 開發
npx expo start                    # 啟動 Expo Dev Server
npx expo start --ios              # iOS Simulator
npx expo start --android          # Android Emulator

# 建置
eas build --profile development   # 開發版本
eas build --profile preview       # 預覽版本
eas build --profile production    # 正式版本

# 提交
eas submit --platform ios         # 提交至 App Store
eas submit --platform android     # 提交至 Play Store

# OTA 更新
eas update --branch preview       # 推送 OTA 更新
```

## 無障礙 (Accessibility)

| 功能 | 實作方式 |
|------|----------|
| 螢幕閱讀器支援 | accessibilityLabel, accessibilityHint |
| 大字體支援 | 使用相對字體大小 |
| 高對比模式 | useColorScheme hook |
| 減少動畫 | AccessibilityInfo.isReduceMotionEnabled |

## 效能最佳化

1. **Hermes Engine**: 啟用 Hermes JavaScript 引擎
2. **Reanimated 3**: 使用 worklet 執行動畫
3. **FlatList 優化**: 使用 getItemLayout, initialNumToRender
4. **圖片優化**: 使用 expo-image 替代 Image
5. **Bundle 分割**: 使用 Metro 的 lazy imports

## 測試

| 工具 | 用途 |
|------|------|
| **Jest** | 單元測試 |
| **React Native Testing Library** | 元件測試 |
| **Detox** | E2E 測試 |
| **Maestro** | UI 自動化測試 |
