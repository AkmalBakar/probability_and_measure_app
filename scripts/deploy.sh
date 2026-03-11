#!/bin/bash
# Deploy the MA411 Study App to an EC2 instance from your local machine.
# Builds locally (to avoid OOM on t2.micro), then syncs to the server.
#
# Usage: ./scripts/deploy.sh <EC2_HOST_OR_IP> [KEY_PATH]
# Example: ./scripts/deploy.sh 54.123.45.67 ~/.ssh/ma411-study-key.pem

set -euo pipefail

EC2_HOST="${1:?Usage: deploy.sh <EC2_HOST_OR_IP> [KEY_PATH]}"
KEY_PATH="${2:-$HOME/.ssh/ma411-study-key.pem}"
EC2_USER="ubuntu"
REMOTE_DIR="/var/www/ma411-study"
SSH_OPTS="-i $KEY_PATH -o StrictHostKeyChecking=accept-new"

# Determine repo root (parent of scripts/)
REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"

echo "=== Deploying MA411 Study App to $EC2_HOST ==="

# Build locally
echo "--- Building React app locally ---"
cd "$REPO_ROOT/app"
npm install
npm run build
cd "$REPO_ROOT"

# Sync app/ to EC2 (exclude node_modules and data/ to preserve progress)
echo "--- Syncing files to EC2 ---"
rsync -avz --delete \
  -e "ssh $SSH_OPTS" \
  --exclude='node_modules' \
  --exclude='data/' \
  "$REPO_ROOT/app/" \
  "$EC2_USER@$EC2_HOST:$REMOTE_DIR/app/"

# Copy pm2 ecosystem config
scp $SSH_OPTS \
  "$REPO_ROOT/deploy/ecosystem.config.cjs" \
  "$EC2_USER@$EC2_HOST:$REMOTE_DIR/ecosystem.config.cjs"

# Install production deps and restart on remote
echo "--- Installing dependencies and restarting on EC2 ---"
ssh $SSH_OPTS "$EC2_USER@$EC2_HOST" << 'ENDSSH'
  cd /var/www/ma411-study/app
  npm install --omit=dev
  cd /var/www/ma411-study
  pm2 startOrRestart ecosystem.config.cjs
  pm2 save
  echo "--- App status ---"
  pm2 status
ENDSSH

echo ""
echo "=== Deployed! App is live at http://$EC2_HOST ==="
