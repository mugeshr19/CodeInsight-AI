# Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Step 1: Clone the Repository
```bash
git clone <your-repo-url>
cd full_stack_project-concept-connector
```

### Step 2: Backend Setup

```bash
# Navigate to backend
cd backend

# Update application.properties with your credentials:
# - MongoDB URI: Your MongoDB Atlas connection string
# - Groq API Key: Get from https://console.x.ai/
# - JWT Secret: Your secure secret key

# Build and run (requires Java 17+ and Maven)
mvn clean install
mvn spring-boot:run

# Backend will start on http://localhost:8080
```

### Step 3: Frontend Setup

```bash
# Open new terminal
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev

# Frontend will start on http://localhost:5173
```

### Step 4: Test the Application

1. Open browser: `http://localhost:5173`
2. Click "Get Started" to register
3. Fill in your details and register
4. You'll be redirected to the dashboard
5. Enter a problem and paste your code
6. Click "Analyze Code"
7. View the AI-powered analysis results!

---

## 📋 Prerequisites

### Required Software
- **Java 17 or higher** - [Download](https://www.oracle.com/java/technologies/downloads/)
- **Maven 3.6+** - [Download](https://maven.apache.org/download.cgi)
- **Node.js 18+** - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)

### Check Installations
```bash
# Check Java
java -version

# Check Maven
mvn -version

# Check Node.js
node -version

# Check npm
npm -version
```

---

## 🎯 What's Already Configured

✅ MongoDB Atlas connection  
✅ Groq API (xAI) integration  
✅ JWT authentication  
✅ CORS settings  
✅ All dependencies  
✅ Database models  
✅ API endpoints  
✅ React components  
✅ Styling with TailwindCSS  

---

## 🧪 Test the API Directly

### Register a User
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Login
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

Copy the token from the response and use it in the next request.

### Analyze Code
```bash
curl -X POST http://localhost:8080/api/analyze \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "problemTitle": "Two Sum",
    "problemDescription": "Find two numbers that add up to target",
    "code": "public int[] twoSum(int[] nums, int target) { for(int i=0; i<nums.length; i++) { for(int j=i+1; j<nums.length; j++) { if(nums[i] + nums[j] == target) return new int[]{i,j}; } } return null; }",
    "language": "java"
  }'
```

---

## 🎨 Features to Try

1. **Code Analysis**
   - Submit different algorithms
   - Try Java, Python, or C++
   - See complexity analysis

2. **Dashboard**
   - View all your submissions
   - Track your progress

3. **Analytics**
   - See weak topics distribution
   - View complexity trends
   - Check improvement score

4. **Profile**
   - View your statistics
   - See most weak topics
   - Track improvement

---

## 🐛 Common Issues

### Backend won't start
- **Issue**: Port 8080 already in use
- **Solution**: Kill the process or change port in `application.properties`

### Frontend won't start
- **Issue**: Port 5173 already in use
- **Solution**: Kill the process or it will auto-assign new port

### MongoDB connection fails
- **Issue**: Network access not configured
- **Solution**: The provided URI should work. If not, check MongoDB Atlas network settings

### Groq API fails
- **Issue**: API key invalid or rate limited
- **Solution**: The provided key should work. If not, get a new key from xAI

---

## 📱 Mobile Testing

The app is fully responsive. Test on mobile by:
1. Find your local IP: `ipconfig` (Windows) or `ifconfig` (Mac/Linux)
2. Update CORS in `application.properties` to include your IP
3. Access from mobile: `http://YOUR_IP:5173`

---

## 🔥 Hot Tips

1. **Monaco Editor**: Full-featured code editor with syntax highlighting
2. **Real-time Analysis**: AI analyzes your code in seconds
3. **No Full Solutions**: Get hints, not answers (great for learning!)
4. **Track Progress**: See your improvement over time
5. **Beautiful UI**: Modern glassmorphism design

---

## 📚 Next Steps

1. ✅ Get the app running locally
2. ✅ Test all features
3. ✅ Submit different code samples
4. ✅ Check analytics dashboard
5. 📖 Read API_TESTING.md for API details
6. 🚀 Read DEPLOYMENT.md to deploy to production
7. 💼 Add to your portfolio with screenshots

---

## 💡 Sample Code to Test

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

### Python - Fibonacci (Inefficient)
```python
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)
```

### C++ - Bubble Sort
```cpp
void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n-1; i++) {
        for (int j = 0; j < n-i-1; j++) {
            if (arr[j] > arr[j+1]) {
                swap(arr[j], arr[j+1]);
            }
        }
    }
}
```

---

## 🎓 Learning Outcomes

By using this project, you'll understand:
- Time & space complexity
- Algorithm optimization
- Common DSA patterns
- Your weak areas
- How to improve

---

## 🤝 Need Help?

- Check README.md for detailed documentation
- Check API_TESTING.md for API examples
- Check DEPLOYMENT.md for deployment guide
- Open an issue on GitHub

---

**Happy Coding! 🚀**
