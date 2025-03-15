
# Kdan Frontend

## 目錄
- [Kdan Frontend](#kdan-frontend)
  - [目錄](#目錄)
  - [系統需求](#系統需求)
  - [安裝與執行](#安裝與執行)
  - [專案結構](#專案結構)
  - [功能](#功能)

## 系統需求
- Node.js >= 18
- pnpm

## 安裝與執行

1. 確保你的系統已安裝符合版本要求的 Node.js
  ```bash
  node -v # 確認 Node.js 版本
  ```

2. 安裝 pnpm（如果尚未安裝）
  ```bash
  npm install -g pnpm
  ```

3. 安裝專案依賴
  ```bash
  pnpm install # 或使用簡寫 pnpm i
  ```

4. 執行專案
  ```bash
  pnpm dev # 開發環境
  pnpm build # 建置生產環境
  pnpm preview # 預覽生產環境
  pnpm test # 執行測試
  ```

## 專案結構

```bash
.
├── assets # 資源
├── src # 源碼
│ ├── components # 元件
│ ├── constants # 常量
│ ├── hooks-api # 使用 useSWR 的 hooks做成的 api hooks
│ ├── kdan-ui # 自定義元件
│ ├── pages # 頁面
│ ├── types # 型別
│ ├── utils # 工具函式
│ ├── App.tsx # 主應用
│ └── main.tsx # 主入口
├── .env # 環境變量
```

## 功能
- 藥局營業查詢
- 藥局口罩查詢
- 口罩數量篩選
- 消費排行榜
- 交易統計報表
- 智慧搜尋
- 購買口罩