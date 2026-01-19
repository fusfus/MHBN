#!/bin/bash

# 使用方式: ./ship_it.sh "提交標題" "AI的詳細思考紀錄內容..."

TITLE="$1"
DETAILS="$2"
TIMESTAMP=$(date "+%Y-%m-%d %H:%M:%S")
LOG_FILE="AI_DEV_LOG.md"

# 1. 如果 Log 檔案不存在，建立它
if [ ! -f "$LOG_FILE" ]; then
    echo "# Project HandFlow - AI Development Log" > "$LOG_FILE"
    echo "紀錄 AI 的開發思路、實作計畫與詳細步驟。" >> "$LOG_FILE"
    echo "---" >> "$LOG_FILE"
fi

# 2. 將詳細的 Plan/Walkthrough 寫入 Log 檔案 (寫在最上方或是追加在下方，這裡示範追加)
echo "" >> "$LOG_FILE"
echo "## [${TIMESTAMP}] ${TITLE}" >> "$LOG_FILE"
echo "" >> "$LOG_FILE"
echo "${DETAILS}" >> "$LOG_FILE"
echo "" >> "$LOG_FILE"
echo "---" >> "$LOG_FILE"

# 3. 執行 Git 動作
git add .
git commit -m "${TITLE}"
git push origin main

echo "✅ 成功更新日誌並推送到 GitHub！"