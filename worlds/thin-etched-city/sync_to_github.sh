#!/bin/bash
# 🏙️ 薄刻之城：GitHub 自动同步脚本 (v1.1)
# 职责：将逻辑道场的最新演化状态，作为“金色的经纬”同步至云端。

REPO_DIR="/home/skywork/workspace/lingxi_world_chronicles"
# Token will be inherited from the environment to avoid GitHub Push Protection
# REMOTE_URL should be configured once via 'git remote set-url origin'

cd $REPO_DIR || exit 1

# 获取当前时间戳
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')

# 同步逻辑
git add .
git commit -m "🌌 逻辑自进化同步: ${TIMESTAMP} | 界厚: 100.0%"
git push origin main

echo "[$(date)] 同步完成：已向云端注资逻辑厚度。"
