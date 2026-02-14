# Deployment Guide

## 🚀 Deployment Options

### Frontend Deployment (Vercel)

#### Prerequisites
- GitHub account
- Vercel account (free tier available)

#### Steps

1. **Push code to GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/codeinsight-ai.git
git push -u origin main
```

2. **Deploy to Vercel**
- Go to [vercel.com](https://vercel.com)
- Click "New Project"
- Import your GitHub repository
- Configure build settings:
  - Framework Preset: `Vite`
  - Root Directory: `frontend`
  - Build Command: `npm run build`
  - Output Directory: `dist`

3. **Environment Variables**
Add in Vercel dashboard:
```
VITE_API_URL=https://your-backend-url.com/api
```

4. **Deploy**
- Click "Deploy"
- Wait for build to complete
- Your app will be live at `https://your-app.vercel.app`

---

### Backend Deployment (Render)

#### Prerequisites
- GitHub account
- Render account (free tier available)

#### Steps

1. **Prepare for deployment**

Create `Dockerfile` in backend directory:
```dockerfile
FROM maven:3.8.5-openjdk-17 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

FROM openjdk:17-jdk-slim
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
```

2. **Deploy to Render**
- Go to [render.com](https://render.com)
- Click "New +" → "Web Service"
- Connect your GitHub repository
- Configure:
  - Name: `codeinsight-backend`
  - Environment: `Docker`
  - Region: Choose closest to you
  - Branch: `main`
  - Root Directory: `backend`

3. **Environment Variables**
Add in Render dashboard:
```
SPRING_DATA_MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/
SPRING_DATA_MONGODB_DATABASE=codeinsight
JWT_SECRET=your-secret-key-here
JWT_EXPIRATION=86400000
GROQ_API_KEY=your-groq-api-key
GROQ_API_URL=https://api.x.ai/v1/chat/completions
GROQ_MODEL=grok-beta
CORS_ALLOWED_ORIGINS=https://your-frontend.vercel.app
```

4. **Deploy**
- Click "Create Web Service"
- Wait for build and deployment
- Your API will be live at `https://your-app.onrender.com`

---

### Backend Deployment (Railway)

#### Alternative to Render

1. **Deploy to Railway**
- Go to [railway.app](https://railway.app)
- Click "New Project" → "Deploy from GitHub repo"
- Select your repository
- Railway will auto-detect Spring Boot

2. **Configure**
- Add environment variables (same as Render)
- Set root directory to `backend`
- Railway will automatically build and deploy

3. **Custom Domain** (Optional)
- Go to Settings → Domains
- Add custom domain or use Railway subdomain

---

### Database (MongoDB Atlas)

#### Already Configured
Your MongoDB Atlas is already set up with the connection string provided.

#### Additional Configuration

1. **Network Access**
- Go to MongoDB Atlas dashboard
- Network Access → Add IP Address
- Add `0.0.0.0/0` for production (allows all IPs)
- Or add specific IPs of your hosting services

2. **Database Users**
- Ensure your database user has read/write permissions
- Password should be URL-encoded in connection string

3. **Backup** (Recommended)
- Enable automated backups in Atlas
- Set backup schedule

---

## 🔒 Security Checklist

### Before Deployment

- [ ] Change JWT secret to a strong random string
- [ ] Use environment variables for all secrets
- [ ] Enable HTTPS on both frontend and backend
- [ ] Configure CORS to allow only your frontend domain
- [ ] Set MongoDB network access properly
- [ ] Use strong database passwords
- [ ] Enable rate limiting (optional)
- [ ] Add input validation on all endpoints
- [ ] Test all API endpoints
- [ ] Remove console.log statements from production code

---

## 🧪 Testing Deployment

### Frontend
1. Visit your Vercel URL
2. Test registration and login
3. Test code analysis
4. Check analytics and profile pages
5. Verify all API calls work

### Backend
1. Test API endpoints using Postman
2. Verify JWT authentication
3. Check MongoDB connections
4. Test Groq API integration
5. Monitor logs for errors

---

## 📊 Monitoring

### Vercel
- View deployment logs in Vercel dashboard
- Monitor function execution times
- Check analytics for traffic

### Render/Railway
- View application logs in dashboard
- Monitor CPU and memory usage
- Set up alerts for downtime

### MongoDB Atlas
- Monitor database performance
- Check query performance
- Set up alerts for high usage

---

## 🔄 CI/CD Setup

### Automatic Deployments

Both Vercel and Render/Railway support automatic deployments:

1. **Push to GitHub**
```bash
git add .
git commit -m "Update feature"
git push origin main
```

2. **Automatic Build**
- Vercel and Render will automatically detect changes
- Build and deploy new version
- Zero downtime deployment

---

## 🐛 Troubleshooting

### Frontend Issues

**Build fails:**
- Check Node.js version (use 18+)
- Verify all dependencies are installed
- Check for TypeScript errors

**API calls fail:**
- Verify VITE_API_URL is correct
- Check CORS configuration on backend
- Ensure backend is running

### Backend Issues

**Build fails:**
- Check Java version (use 17+)
- Verify Maven dependencies
- Check for compilation errors

**MongoDB connection fails:**
- Verify connection string
- Check network access in Atlas
- Ensure database user has permissions

**Groq API fails:**
- Verify API key is correct
- Check API rate limits
- Monitor API response times

---

## 💰 Cost Estimation

### Free Tier Limits

**Vercel (Frontend):**
- 100 GB bandwidth/month
- Unlimited deployments
- Free SSL

**Render (Backend):**
- 750 hours/month (free tier)
- Sleeps after 15 min inactivity
- 512 MB RAM

**Railway (Backend):**
- $5 free credit/month
- Pay as you go after

**MongoDB Atlas:**
- 512 MB storage (free tier)
- Shared cluster
- No credit card required

### Upgrade Recommendations

For production with real users:
- Vercel Pro: $20/month
- Render Standard: $7/month
- MongoDB M10: $57/month

---

## 🎯 Post-Deployment

1. **Update README** with live URLs
2. **Add to Portfolio** with screenshots
3. **Share on LinkedIn** with project details
4. **Monitor Performance** regularly
5. **Collect User Feedback**
6. **Plan Future Updates**

---

## 📝 Custom Domain Setup

### Frontend (Vercel)
1. Buy domain from Namecheap/GoDaddy
2. Add domain in Vercel settings
3. Update DNS records as instructed
4. Wait for SSL certificate

### Backend (Render/Railway)
1. Add custom domain in settings
2. Update DNS CNAME record
3. SSL automatically provisioned

---

## ✅ Final Checklist

- [ ] Frontend deployed and accessible
- [ ] Backend deployed and accessible
- [ ] Database connected and working
- [ ] All environment variables set
- [ ] CORS configured correctly
- [ ] JWT authentication working
- [ ] Groq API integration working
- [ ] All pages load correctly
- [ ] Mobile responsive
- [ ] SSL certificates active
- [ ] Error handling working
- [ ] Logs being captured
- [ ] Performance acceptable

---

**Congratulations! Your CodeInsight AI application is now live! 🎉**
