# AWS EC2 Deployment Guide

## Prerequisites

- An AWS account
- A local machine with `rsync`, `ssh`, `node`, and `npm` installed

## 1. AWS Console Setup

### Create a Key Pair

1. Go to **EC2 Dashboard → Key Pairs → Create key pair**
2. Name: `ma411-study-key`
3. Type: RSA, Format: `.pem`
4. Download the file and move it to `~/.ssh/`:
   ```bash
   mv ~/Downloads/ma411-study-key.pem ~/.ssh/
   chmod 400 ~/.ssh/ma411-study-key.pem
   ```

### Create a Security Group

1. Go to **EC2 Dashboard → Security Groups → Create security group**
2. Name: `ma411-study-sg`
3. Add inbound rules:
   | Type  | Port | Source            |
   |-------|------|-------------------|
   | SSH   | 22   | My IP             |
   | HTTP  | 80   | 0.0.0.0/0, ::/0   |
   | HTTPS | 443  | 0.0.0.0/0, ::/0   |
4. Outbound: leave as default (all traffic)

### Launch the Instance

1. Go to **EC2 Dashboard → Launch Instance**
2. **AMI**: Ubuntu 24.04 LTS (search "ubuntu" and pick the latest Canonical LTS)
3. **Instance type**: `t2.micro` (free tier eligible)
4. **Key pair**: `ma411-study-key`
5. **Security group**: `ma411-study-sg`
6. **Storage**: 8 GB gp3 (default)
7. Click **Launch Instance**

### (Optional) Allocate an Elastic IP

An Elastic IP gives you a stable public IP that survives instance stop/start.

1. Go to **EC2 → Elastic IPs → Allocate Elastic IP address**
2. Associate it with your instance
3. Free as long as it's associated with a running instance

## 2. First-Time Instance Setup

SSH into the instance and run the setup script:

```bash
# SSH in
ssh -i ~/.ssh/ma411-study-key.pem ubuntu@<EC2_IP>

# Clone the repo
git clone https://github.com/AkmalBakar/probability_and_measure_app.git

# Run setup
cd probability_and_measure_app
bash scripts/aws-setup.sh
```

This installs Node.js 20, pm2, nginx, and configures everything.

## 3. Deploy the App

From your **local machine** (not the EC2 instance):

```bash
./scripts/deploy.sh <EC2_IP> ~/.ssh/ma411-study-key.pem
```

This will:
1. Build the React app locally
2. Sync files to the EC2 instance via rsync
3. Install production dependencies on the server
4. Start (or restart) the app via pm2

Visit `http://<EC2_IP>` — the app should be live.

## 4. Common Operations

### SSH into the instance

```bash
ssh -i ~/.ssh/ma411-study-key.pem ubuntu@<EC2_IP>
```

### Check app status

```bash
ssh -i ~/.ssh/ma411-study-key.pem ubuntu@<EC2_IP> "pm2 status"
```

### View logs

```bash
ssh -i ~/.ssh/ma411-study-key.pem ubuntu@<EC2_IP> "pm2 logs ma411-study --lines 50"
```

### Restart the app

```bash
ssh -i ~/.ssh/ma411-study-key.pem ubuntu@<EC2_IP> "pm2 restart ma411-study"
```

### Redeploy after code changes

Just run the deploy script again:

```bash
./scripts/deploy.sh <EC2_IP> ~/.ssh/ma411-study-key.pem
```

Your study progress (`data/progress.json`) is preserved across deployments.

### Backup your progress

```bash
scp -i ~/.ssh/ma411-study-key.pem \
  ubuntu@<EC2_IP>:/var/www/ma411-study/app/data/progress.json \
  ./progress-backup.json
```

## 5. (Optional) HTTPS with Let's Encrypt

If you point a domain at the EC2 instance (via Route 53 or any DNS provider):

1. Update `server_name _;` in `/etc/nginx/sites-available/ma411-study` to `server_name yourdomain.com;`
2. Run:
   ```bash
   sudo apt-get install -y certbot python3-certbot-nginx
   sudo certbot --nginx -d yourdomain.com
   ```
3. Certbot auto-configures nginx for SSL and sets up automatic renewal.

## Cost Estimate

| Resource       | Free Tier (12 months)   | After Free Tier |
|----------------|-------------------------|-----------------|
| t2.micro       | 750 hrs/month free      | ~$8.50/month    |
| 8 GB gp3 EBS   | 30 GB free              | ~$0.64/month    |
| Elastic IP     | Free (while associated) | Free            |
| Data transfer  | 100 GB/month free       | Negligible      |
| **Total**      | **$0/month**            | **~$9/month**   |
