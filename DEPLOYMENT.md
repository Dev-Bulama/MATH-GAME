# 🚀 Deployment Guide

Complete guide to deploying the Dyscalculia-Friendly Math Game to various platforms.

## 📋 Prerequisites

Before deploying, ensure you have:
- ✅ All files in the repository
- ✅ `requirements.txt` with dependencies
- ✅ `app.py` tested locally
- ✅ `.streamlit/config.toml` configured

## 🌟 Streamlit Cloud (Recommended - Free & Easy)

Streamlit Cloud is the easiest way to deploy this game, and it's free!

### Step-by-Step Instructions:

#### 1. Prepare Your Repository

```bash
# Make sure everything is committed
git add .
git commit -m "Ready for deployment"
git push origin main
```

#### 2. Sign Up for Streamlit Cloud

1. Go to [streamlit.io/cloud](https://streamlit.io/cloud)
2. Click "Sign up" (use GitHub account)
3. Authorize Streamlit to access your repositories

#### 3. Deploy Your App

1. Click "New app"
2. Select your repository
3. Choose branch (usually `main` or `master`)
4. Set main file path: `app.py`
5. Click "Deploy!"

#### 4. Wait for Deployment

- Usually takes 2-5 minutes
- Watch the deployment logs
- Once complete, you'll get a public URL

#### 5. Share Your Game

Your game will be available at:
```
https://[your-app-name].streamlit.app
```

### Streamlit Cloud Features:

✅ **Free tier includes:**
- 1 GB RAM
- 1 CPU
- Free subdomain
- Automatic HTTPS
- Automatic redeployment on git push

❌ **Limitations:**
- App sleeps after inactivity (wakes on visit)
- Limited to 3 apps on free tier

### Updating Your Deployed App:

Simply push to your repository:
```bash
git add .
git commit -m "Update game"
git push origin main
```

Streamlit Cloud will automatically redeploy!

---

## 🐳 Docker Deployment

For more control and self-hosting options.

### Create Dockerfile:

```dockerfile
# Save as: Dockerfile
FROM python:3.9-slim

WORKDIR /app

# Copy requirements
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy application
COPY . .

# Expose Streamlit port
EXPOSE 8501

# Health check
HEALTHCHECK CMD curl --fail http://localhost:8501/_stcore/health

# Run the app
ENTRYPOINT ["streamlit", "run", "app.py", "--server.port=8501", "--server.address=0.0.0.0"]
```

### Build and Run:

```bash
# Build image
docker build -t math-game .

# Run container
docker run -p 8501:8501 math-game
```

### Access:
Navigate to `http://localhost:8501`

---

## ☁️ Heroku Deployment

### Prerequisites:
- Heroku account (free tier available)
- Heroku CLI installed

### Files Needed:

#### 1. Create `setup.sh`:

```bash
mkdir -p ~/.streamlit/

echo "\
[server]\n\
headless = true\n\
port = $PORT\n\
enableCORS = false\n\
\n\
" > ~/.streamlit/config.toml
```

#### 2. Create `Procfile`:

```
web: sh setup.sh && streamlit run app.py
```

### Deploy:

```bash
# Login to Heroku
heroku login

# Create app
heroku create your-math-game

# Deploy
git push heroku main

# Open app
heroku open
```

---

## 🔷 Google Cloud Run

### Prerequisites:
- Google Cloud account
- gcloud CLI installed

### Steps:

#### 1. Create Dockerfile (see Docker section above)

#### 2. Deploy:

```bash
# Set project
gcloud config set project YOUR_PROJECT_ID

# Build and deploy
gcloud run deploy math-game \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

#### 3. Access:
Google Cloud will provide a URL like:
```
https://math-game-xxxxx-uc.a.run.app
```

---

## 🌐 Azure Web Apps

### Prerequisites:
- Azure account
- Azure CLI installed

### Steps:

```bash
# Create resource group
az group create --name math-game-rg --location eastus

# Create app service plan
az appservice plan create \
  --name math-game-plan \
  --resource-group math-game-rg \
  --sku FREE \
  --is-linux

# Create web app
az webapp create \
  --resource-group math-game-rg \
  --plan math-game-plan \
  --name your-math-game \
  --runtime "PYTHON|3.9"

# Deploy code
az webapp up \
  --resource-group math-game-rg \
  --name your-math-game
```

---

## 🏠 Self-Hosting (Your Own Server)

### Using systemd (Linux):

#### 1. Create service file:

```ini
# Save as: /etc/systemd/system/math-game.service

[Unit]
Description=Dyscalculia Math Game
After=network.target

[Service]
User=www-data
WorkingDirectory=/var/www/math-game
ExecStart=/usr/bin/streamlit run app.py --server.port=8501
Restart=always

[Install]
WantedBy=multi-user.target
```

#### 2. Enable and start:

```bash
sudo systemctl enable math-game
sudo systemctl start math-game
```

### Using nginx as reverse proxy:

```nginx
# Add to nginx config

server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:8501;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
    }
}
```

---

## 📊 Comparison of Platforms

| Platform | Difficulty | Cost | Best For |
|----------|-----------|------|----------|
| **Streamlit Cloud** | ⭐ Easy | Free | Quick sharing, testing |
| **Heroku** | ⭐⭐ Medium | Free tier | Simple deployment |
| **Google Cloud Run** | ⭐⭐⭐ Medium | Pay per use | Scalability |
| **Azure** | ⭐⭐⭐ Medium | Free tier | Enterprise |
| **Docker** | ⭐⭐⭐⭐ Hard | Varies | Control, portability |
| **Self-host** | ⭐⭐⭐⭐⭐ Hard | Server cost | Full control |

---

## 🔒 Security Considerations

### For Public Deployment:

1. **No Secrets in Code**
   - Game doesn't store personal data
   - No authentication needed
   - Safe for public access

2. **Rate Limiting**
   - Consider adding if traffic is very high
   - Most platforms include basic protection

3. **HTTPS**
   - All major platforms provide automatic HTTPS
   - Essential for any public-facing app

### For School/Organization:

1. **Access Control**
   - Use platform's authentication if needed
   - Consider IP whitelisting for school networks

2. **Data Privacy**
   - Game uses session state only (no database)
   - Progress resets on browser close
   - Compliant with student privacy laws

---

## 🐛 Troubleshooting Deployment

### "Application Error" on Platform:

**Check:**
1. Requirements installed correctly
2. Python version compatible (3.8+)
3. Port configuration correct
4. Logs for specific errors

**Solution:**
```bash
# Check logs (Heroku example)
heroku logs --tail

# Check logs (Streamlit Cloud)
# View in dashboard under "Manage app" → "Logs"
```

### "ModuleNotFoundError":

**Cause:** Missing dependency in requirements.txt

**Solution:**
```bash
# Add to requirements.txt
echo "streamlit>=1.28.0" > requirements.txt
```

### App Loads but Doesn't Work:

**Check:**
1. Browser console for JavaScript errors
2. Streamlit version compatibility
3. File permissions
4. Path issues (use absolute paths)

### Slow Performance:

**Solutions:**
- Upgrade to paid tier (more resources)
- Optimize code (already optimized in this game)
- Use caching (not needed for this app)
- Choose closer region to users

---

## 📈 Monitoring Your Deployment

### Streamlit Cloud:

Dashboard shows:
- App status (running/sleeping)
- Deployment logs
- Resource usage
- Viewer count

### Other Platforms:

Set up monitoring for:
- **Uptime:** Ensure app is accessible
- **Response time:** User experience metric
- **Error rate:** Catch issues quickly
- **Resource usage:** Optimize as needed

### Tools:
- UptimeRobot (free uptime monitoring)
- Google Analytics (usage tracking)
- Platform-specific dashboards

---

## 🎓 Making It Available to Students

### For Teachers:

#### Option 1: Direct Link
Deploy to Streamlit Cloud and share link:
```
https://math-learning-game.streamlit.app
```

#### Option 2: QR Code
Generate QR code linking to your deployment:
- Use qr-code-generator.com
- Print and post in classroom
- Easy mobile access

#### Option 3: Embed in LMS
Add to Google Classroom, Canvas, etc.:
```html
<iframe src="https://your-game.streamlit.app" width="100%" height="800px"></iframe>
```

### For Parents:

1. **Bookmark the URL** in browser
2. **Add to home screen** on mobile/tablet
3. **Set as homepage** for easy access
4. **Share via email/message** with other parents

---

## 🔄 Maintenance

### Regular Updates:

```bash
# Update Streamlit
pip install --upgrade streamlit

# Update requirements.txt
pip freeze > requirements.txt

# Test locally
streamlit run app.py

# Deploy
git add .
git commit -m "Update dependencies"
git push origin main
```

### Monitoring Usage:

- Check platform analytics
- Monitor for errors
- Read user feedback
- Plan improvements

---

## 📞 Getting Help

### Platform-Specific Support:

- **Streamlit:** [discuss.streamlit.io](https://discuss.streamlit.io)
- **Heroku:** [help.heroku.com](https://help.heroku.com)
- **Google Cloud:** [cloud.google.com/support](https://cloud.google.com/support)
- **Azure:** [azure.microsoft.com/support](https://azure.microsoft.com/support)

### Community Resources:

- Stack Overflow (tag: streamlit)
- Reddit: r/streamlit
- GitHub Issues (for code bugs)

---

## ✅ Pre-Deployment Checklist

Before going live:

- [ ] Test all 6 levels locally
- [ ] Test on different browsers
- [ ] Test on mobile device
- [ ] Verify all badges work
- [ ] Check scoring calculation
- [ ] Test replay functionality
- [ ] Verify level unlocking
- [ ] Check responsive design
- [ ] Review accessibility
- [ ] Read all text for typos
- [ ] Test reset function
- [ ] Verify requirements.txt complete
- [ ] Commit all changes to git
- [ ] Write clear commit messages

---

**Ready to deploy and help students learn math! 🚀**

*Remember: Start with Streamlit Cloud for easiest deployment!*
