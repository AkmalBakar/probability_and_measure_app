#!/bin/bash
# One-time setup script for a fresh Ubuntu 24.04 EC2 instance
# Usage: ssh into instance, clone repo, then run: bash scripts/aws-setup.sh

set -euo pipefail

echo "=== MA411 Study App - EC2 Setup ==="

# System updates
echo "--- Updating system packages ---"
sudo apt-get update && sudo apt-get upgrade -y

# Install Node.js 20 LTS via NodeSource
echo "--- Installing Node.js 20 LTS ---"
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

echo "Node version: $(node --version)"
echo "npm version: $(npm --version)"

# Install pm2 globally
echo "--- Installing pm2 ---"
sudo npm install -g pm2

# Install nginx
echo "--- Installing nginx ---"
sudo apt-get install -y nginx

# Create app directory
sudo mkdir -p /var/www/ma411-study
sudo chown ubuntu:ubuntu /var/www/ma411-study

# Determine repo root (parent of scripts/)
REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"

# Install nginx config
echo "--- Configuring nginx ---"
sudo cp "$REPO_ROOT/deploy/nginx-ma411.conf" /etc/nginx/sites-available/ma411-study
sudo ln -sf /etc/nginx/sites-available/ma411-study /etc/nginx/sites-enabled/ma411-study
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl restart nginx
sudo systemctl enable nginx

# Set up pm2 to start on boot
echo "--- Configuring pm2 startup ---"
sudo env PATH="$PATH:/usr/bin" pm2 startup systemd -u ubuntu --hp /home/ubuntu

echo ""
echo "=== Setup complete! ==="
echo "Next steps:"
echo "  1. From your local machine, run: ./scripts/deploy.sh <EC2_IP> <KEY_PATH>"
echo "  2. Visit http://<EC2_IP> in your browser"
