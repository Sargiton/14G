# Deploy Guide

## 1) Push to GitHub

```bash
# In project root
git init
git remote add origin https://github.com/Sargiton/14G.git

# Ignore secrets/sessions
copy .env.example .env  # then fill TELEGRAM_TOKEN, TG_OWNER_IDS

git add .
git commit -m "Initial commit"
git branch -M main
git push -u origin main
```

## 2) Ubuntu 24.04 server (1 GB RAM)

```bash
# Update system
sudo apt update && sudo apt -y upgrade

# Install Node.js 20 LTS + build tools
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt -y install nodejs build-essential git ffmpeg imagemagick

# Install PM2 globally
sudo npm i -g pm2

# Clone repo
cd /opt
sudo git clone https://github.com/Sargiton/14G.git
sudo chown -R $USER:$USER 14G
cd 14G

# Configure env
cp .env.example .env
nano .env  # set TELEGRAM_TOKEN and TG_OWNER_IDS

# Install deps
npm ci || npm i

# Create logs dir
mkdir -p logs

# Start with PM2 (ecosystem provided)
pm2 start ecosystem.config.js
pm2 save
pm2 startup systemd -u $USER --hp $HOME
```

## 3) Pair WhatsApp

- Check logs: `pm2 logs whatsapp-bot`
- Scan QR from terminal or get `qr.png` from project root
- Optionally enable QR server by setting `global.obtenerQrWeb = 1` in code and visiting server IP:PORT

## 4) Useful PM2 commands

```bash
pm2 list
pm2 logs whatsapp-bot
pm2 restart whatsapp-bot
pm2 stop whatsapp-bot
pm2 delete whatsapp-bot
```
