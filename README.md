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
  ```

## 專案結構

```bash
.
├── assets # 資源
├── src # 源碼
│ ├── components # 元件
│ ├── pages # 頁面
│ ├── App.tsx # 主應用
│ └── main.tsx # 主入口
```