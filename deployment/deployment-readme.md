# 🚀 Deployment Guide — Angular Admin Panel (AWS EC2 + NGINX)

This document explains step-by-step how to deploy the Angular Ecommerce Admin Panel to AWS using EC2 and NGINX.

It covers:

* EC2 setup
* Security groups
* SSH access
* NGINX installation
* Angular build deployment
* SPA routing configuration

---

# 📋 Prerequisites

Before deployment, ensure:

* AWS account created
* Angular project working locally
* Angular CLI installed
* SSH key pair downloaded (`.pem`)
* Security group configured

---

# 1️⃣ Launch EC2 Instance

Go to:

```
AWS Console → EC2 → Launch Instance
```

### Configuration

* **Name:** angular-admin-server
* **AMI:** Ubuntu Server 22.04 LTS
* **Instance type:** t2.micro (Free tier)
* **Key pair:** Create/download `.pem`
* **Storage:** Default (8 GB)

---

# 2️⃣ Configure Security Group

Inbound rules required:

| Type  | Port | Source               |
| ----- | ---- | -------------------- |
| SSH   | 22   | My IP                |
| HTTP  | 80   | 0.0.0.0/0            |
| HTTPS | 443  | 0.0.0.0/0 (optional) |

This allows:

* SSH access
* Public web access

---

# 3️⃣ Connect to EC2 via SSH

Navigate to key location locally:

```bash
cd ~/Downloads
```

Fix permissions:

```bash
chmod 400 angular-admin-key.pem
```

SSH into server:

```bash
ssh -i angular-admin-key.pem ubuntu@<PUBLIC-IP>
```

---

# 4️⃣ Update Server Packages

```bash
sudo apt update
sudo apt upgrade -y
```

(Optional kernel reboot prompt can be ignored.)

---

# 5️⃣ Install NGINX

```bash
sudo apt install nginx -y
```

Start service:

```bash
sudo systemctl start nginx
```

Enable auto-start:

```bash
sudo systemctl enable nginx
```

---

# 6️⃣ Verify NGINX Installation

Inside EC2:

```bash
curl http://localhost
```

Browser test:

```
http://<PUBLIC-IP>
```

You should see:

```
Welcome to nginx!
```

⚠️ Use HTTP, not HTTPS (SSL not configured yet).

---

# 7️⃣ Build Angular App (Local Machine)

Run:

```bash
ng build --configuration production
```

Build output:

```
dist/<project-name>/browser/
```

Example:

```
dist/ecommerce-admin/browser/
```

---

# 8️⃣ Upload Angular Build to EC2

Direct upload to `/var/www/html` fails due to permissions.

So upload to home directory first:

```bash
scp -i angular-admin-key.pem -r \
dist/ecommerce-admin/browser \
ubuntu@<PUBLIC-IP>:~
```

---

# 9️⃣ Move Build to NGINX Root

SSH into EC2:

```bash
ssh -i angular-admin-key.pem ubuntu@<PUBLIC-IP>
```

Remove default site:

```bash
sudo rm -rf /var/www/html/*
```

Copy Angular build:

```bash
sudo cp -r ~/browser/* /var/www/html/
```

---

# 🔟 Fix Permissions

```bash
sudo chown -R www-data:www-data /var/www/html
sudo chmod -R 755 /var/www/html
```

Ensures NGINX can serve files.

---

# 1️⃣1️⃣ Configure SPA Routing

Edit NGINX config:

```bash
sudo nano /etc/nginx/sites-available/default
```

Replace server block with:

```nginx
server {

  listen 80;
  server_name _;

  root /var/www/html;
  index index.html;

  location / {
    try_files $uri
               $uri/
               /index.html;
  }

}
```

Save & exit:

```
CTRL + O → Enter → CTRL + X
```

---

# 1️⃣2️⃣ Restart NGINX

```bash
sudo systemctl restart nginx
```

---

# 1️⃣3️⃣ Verify Deployment

Open browser:

```
http://<PUBLIC-IP>
```

Angular admin panel should load.

Test SPA routes:

```
/dashboard
/products
/users
/carts
```

Refresh page to confirm routing works.

---

# 🧠 Troubleshooting

| Issue                    | Cause                 | Fix                  |
| ------------------------ | --------------------- | -------------------- |
| SSH hangs                | Port 22 blocked       | Fix SG rule          |
| Site timeout             | Port 80 blocked       | Allow HTTP           |
| Permission denied SCP    | Root directory write  | Upload to home first |
| NGINX page still visible | Files not replaced    | Remove default HTML  |
| Blank screen             | Build/base href issue | Rebuild app          |
| Refresh 404              | Missing try_files     | Update config        |

---

# 🔐 Notes

* HTTPS not configured yet
* Domain mapping pending
* Backend APIs not deployed
* This setup hosts static Angular only

---

# 📈 Future Enhancements

Planned infra upgrades:

* Node + Express backend deployment
* NGINX reverse proxy
* MongoDB hosting
* Domain purchase & DNS mapping
* Let’s Encrypt SSL (HTTPS)
* CI/CD auto deployment
* Docker containerization

---

# ✅ Deployment Status

✔ EC2 provisioned
✔ SSH configured
✔ Security groups configured
✔ NGINX installed
✔ Angular build deployed
✔ SPA routing configured
✔ Public access verified

---

This completes Angular production deployment on AWS EC2 using NGINX.
