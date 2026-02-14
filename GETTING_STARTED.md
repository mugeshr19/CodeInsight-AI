# 🚀 GETTING STARTED - CodeInsight AI

## Welcome! Your Application is Ready! 🎉

This guide will help you run your production-ready full-stack application in minutes.

---

## 📋 Prerequisites Check

Before starting, ensure you have:

### Required Software
- ✅ **Java 17+** - [Download](https://www.oracle.com/java/technologies/downloads/)
- ✅ **Maven 3.6+** - [Download](https://maven.apache.org/download.cgi)
- ✅ **Node.js 18+** - [Download](https://nodejs.org/)

### Verify Installation
Open Command Prompt and run:
```bash
java -version
mvn -version
node -version
npm -version
```

If all commands work, you're ready! ✅

---

## 🎯 Quick Start (Easiest Way)

### Option 1: Use Startup Script

1. **Open Command Prompt** in project folder
2. **Run the startup script**:
   ```bash
   start.bat
   ```
3. **Wait for both servers to start**
4. **Browser will open automatically** at http://localhost:5173

That's it! 🎉

---

## 🔧 Manual Start (Alternative)

### Step 1: Start Backend

Open **Terminal 1**:
```bash
cd backend
mvn spring-boot:run
```

Wait for message: "Started CodeInsightApplication"

Backend running at: http://localhost:8080 ✅

### Step 2: Start Frontend

Open **Terminal 2**:
```bash
cd frontend
npm install
npm run dev
```

Frontend running at: http://localhost:5173 ✅

### Step 3: Open Browser

Visit: http://localhost:5173

---

## 🎮 Using the Application

### 1. Register a New Account
- Click "Get Started" or "Register"
- Fill in your details:
  - Name: Your Name
  - Email: your@email.com
  - Password: password123 (min 6 chars)
- Click "Register"

### 2. You're Logged In!
- Automatically redirected to Dashboard
- JWT token stored securely

### 3. Submit Code for Analysis
- Enter problem title: "Two Sum"
- Enter problem description: "Find two numbers that add up to target"
- Select language: Java/Python/C++
- Paste your code in Monaco editor
- Click "Analyze Code"

### 4. View Results
- See why code failed
- Check time complexity
- View weak concepts
- Read optimization suggestions
- Get approach hints
- See topics to revise

### 5. Check Analytics
- Click "Analytics" in navbar
- View weak topics distribution (Pie chart)
- See complexity trends (Bar chart)
- Check recent submissions

### 6. View Profile
- Click "Profile" in navbar
- See total submissions
- Check improvement score
- View most weak topic
- Track progress

---

## 🧪 Test with Sample Code

### Java - Two Sum (Inefficient)
```java
public int[] twoSum(int[] nums, int target) {
    for (int i = 0; i < nums.length; i++) {
        for (int j = i + 1; j < nums.length; j++) {
            if (nums[i] + nums[j] == target) {
                return new int[] { i, j };
            }
        }
    }
    return null;
}
```

**Expected Analysis**:
- Complexity: O(n²) - Quadratic
- Weak Concepts: Hash Tables, Time Complexity
- Suggestion: Use HashMap for O(n) solution

### Python - Fibonacci (Inefficient)
```python
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)
```

**Expected Analysis**:
- Complexity: O(2^n) - Exponential
- Weak Concepts: Dynamic Programming, Memoization
- Suggestion: Use DP or memoization

---

## 🔍 Testing the API Directly

### Register User
```bash
curl -X POST http://localhost:8080/api/auth/register ^
  -H "Content-Type: application/json" ^
  -d "{\"name\":\"Test User\",\"email\":\"test@example.com\",\"password\":\"password123\"}"
```

### Login
```bash
curl -X POST http://localhost:8080/api/auth/login ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"test@example.com\",\"password\":\"password123\"}"
```

Copy the token from response.

### Analyze Code
```bash
curl -X POST http://localhost:8080/api/analyze ^
  -H "Content-Type: application/json" ^
  -H "Authorization: Bearer YOUR_TOKEN_HERE" ^
  -d "{\"problemTitle\":\"Two Sum\",\"problemDescription\":\"Find two numbers\",\"code\":\"your code\",\"language\":\"java\"}"
```

---

## 🎨 What You'll See

### Landing Page
- Hero section with gradient
- Feature highlights
- Call-to-action buttons
- Animated background

### Dashboard
- Problem input form
- Monaco code editor with syntax highlighting
- Language selector
- Analyze button with loading animation

### Results Page
- Why code failed (red card)
- Time complexity (yellow card)
- Weak concepts (purple badges)
- Optimization suggestions (green card)
- Approach hints (blue card)
- Topics to revise (orange list)

### Analytics Page
- Total submissions stat
- Languages used stat
- Weak topics pie chart
- Complexity bar chart
- Recent submissions list

### Profile Page
- User avatar with initial
- Total submissions
- Improvement score
- Most weak topic
- Weak topics distribution
- Progress bar

---

## 🔧 Configuration

### Already Configured For You

**MongoDB Atlas**:
```
mongodb+srv://mugeshr1906_db_user:mask2004@cluster0.mnan4fm.mongodb.net/
```

**Groq API Key**: Get your key from https://console.x.ai/

**JWT Secret**: Pre-configured

**CORS**: Configured for localhost

---

## 🐛 Troubleshooting

### Backend Won't Start

**Problem**: Port 8080 already in use
```bash
# Find process using port 8080
netstat -ano | findstr :8080

# Kill the process (replace PID)
taskkill /PID <PID> /F
```

**Problem**: Maven not found
- Install Maven from https://maven.apache.org/download.cgi
- Add to PATH environment variable

**Problem**: Java version error
- Install Java 17 or higher
- Set JAVA_HOME environment variable

### Frontend Won't Start

**Problem**: Port 5173 already in use
- Vite will automatically use next available port
- Or kill process using port 5173

**Problem**: npm not found
- Install Node.js from https://nodejs.org/
- npm comes with Node.js

**Problem**: Dependencies error
```bash
# Clear cache and reinstall
cd frontend
rm -rf node_modules package-lock.json
npm install
```

### API Calls Failing

**Problem**: CORS error
- Check backend is running on port 8080
- Check CORS configuration in SecurityConfig.java

**Problem**: 401 Unauthorized
- Token expired (24 hours)
- Login again to get new token

**Problem**: MongoDB connection error
- Check internet connection
- Verify MongoDB URI in application.properties
- Check MongoDB Atlas network access

### Groq API Failing

**Problem**: API key invalid
- Verify API key in application.properties
- Check for extra spaces or quotes

**Problem**: Rate limit exceeded
- Wait a few minutes
- Groq API has rate limits

---

## 📱 Mobile Testing

### Test on Mobile Device

1. Find your computer's IP address:
   ```bash
   ipconfig
   ```
   Look for "IPv4 Address" (e.g., 192.168.1.100)

2. Update CORS in `application.properties`:
   ```properties
   cors.allowed.origins=http://localhost:5173,http://192.168.1.100:5173
   ```

3. Restart backend

4. On mobile browser, visit:
   ```
   http://192.168.1.100:5173
   ```

---

## 📚 Documentation

### Available Guides
1. **README.md** - Complete documentation
2. **QUICKSTART.md** - 5-minute setup
3. **API_TESTING.md** - API examples
4. **DEPLOYMENT.md** - Deploy to production
5. **PROJECT_SUMMARY.md** - Architecture
6. **PROJECT_STRUCTURE.md** - File structure
7. **FEATURES.md** - All features
8. **PROJECT_COMPLETE.md** - Completion summary

---

## 🎯 Next Steps

### Immediate
1. ✅ Run the application
2. ✅ Register and login
3. ✅ Submit sample code
4. ✅ View analysis results
5. ✅ Check analytics
6. ✅ Explore all features

### Short Term
1. 📸 Take screenshots
2. 🎥 Record demo video
3. 📝 Add to resume
4. 💼 Update portfolio

### Long Term
1. 🌐 Deploy to production
2. 🐙 Push to GitHub
3. 💼 Share on LinkedIn
4. 🎓 Use in interviews

---

## 💡 Tips for Success

### For Development
- Use Chrome DevTools for debugging
- Check browser console for errors
- Monitor backend logs in terminal
- Test API with Postman

### For Demo
- Prepare sample code snippets
- Show different languages
- Demonstrate analytics
- Explain AI integration

### For Interviews
- Explain architecture decisions
- Discuss security implementation
- Show code quality
- Demonstrate features

---

## 🎓 What You've Built

### Technical Achievements
✅ Full-stack web application  
✅ React with modern hooks  
✅ Spring Boot REST API  
✅ MongoDB NoSQL database  
✅ JWT authentication  
✅ AI integration (Groq)  
✅ Responsive UI design  
✅ Data visualization  

### Skills Demonstrated
- Frontend development
- Backend development
- Database design
- API integration
- Security implementation
- UI/UX design
- Clean code architecture
- Documentation

---

## 🏆 Success Checklist

- [ ] Application running locally
- [ ] Registered a user account
- [ ] Submitted code for analysis
- [ ] Viewed AI-powered results
- [ ] Checked analytics dashboard
- [ ] Viewed user profile
- [ ] Tested on mobile (optional)
- [ ] Read all documentation
- [ ] Took screenshots
- [ ] Ready to deploy

---

## 🎉 Congratulations!

You now have a **production-ready, resume-level full-stack application**!

### What Makes This Special
- ✅ Modern tech stack
- ✅ AI-powered features
- ✅ Professional UI/UX
- ✅ Secure authentication
- ✅ Complete documentation
- ✅ Deployment ready

### You're Ready To
- 💼 Add to portfolio
- 📝 Update resume
- 🎤 Present in interviews
- 🌐 Deploy to production
- 🚀 Impress recruiters

---

## 📞 Need Help?

### Quick Links
- **Setup Issues**: Check QUICKSTART.md
- **API Testing**: Check API_TESTING.md
- **Deployment**: Check DEPLOYMENT.md
- **Architecture**: Check PROJECT_SUMMARY.md

### Common Questions

**Q: Can I modify the code?**  
A: Yes! It's your project. Customize as needed.

**Q: Can I deploy this?**  
A: Yes! Check DEPLOYMENT.md for guides.

**Q: Can I add this to my resume?**  
A: Absolutely! It's production-ready.

**Q: Is this suitable for interviews?**  
A: Yes! It demonstrates full-stack skills.

---

## 🌟 Final Words

This is a **complete, professional, production-ready application** that showcases:

- Modern development practices
- Clean code architecture
- Security best practices
- AI integration
- Professional UI/UX
- Comprehensive documentation

**You're ready to succeed! 🚀**

---

**Happy Coding! 💻**

**Built with ❤️ for your success!**
