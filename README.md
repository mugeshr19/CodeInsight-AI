# CodeInsight AI - Intelligent Code Optimizer & Learning Analyzer

A production-ready full-stack web application that analyzes student-submitted DSA code and provides AI-powered optimization suggestions, weak concept detection, and personalized learning insights.

## 🚀 Features

- **Code Analysis**: Submit DSA code and get instant AI-powered feedback
- **Complexity Detection**: Automatic time & space complexity estimation
- **Weak Concept Identification**: Identify areas needing improvement
- **Optimization Suggestions**: Get hints and approaches (not full solutions)
- **Analytics Dashboard**: Track progress with interactive charts
- **User Profile**: View statistics and improvement scores
- **JWT Authentication**: Secure user authentication and authorization

## 🛠️ Tech Stack

### Frontend
- React 18 with Vite
- TailwindCSS for styling
- Framer Motion for animations
- Monaco Editor for code editing
- Recharts for data visualization
- Axios for API calls
- React Router for navigation

### Backend
- Spring Boot 3.2.0 (Java 17)
- Spring Security with JWT
- MongoDB Atlas
- Groq API (xAI) for AI analysis
- Lombok for boilerplate reduction
- WebFlux for reactive API calls

### Database
- MongoDB Atlas (Cloud)

## 📁 Project Structure

```
full_stack_project-concept-connector/
├── backend/
│   ├── src/main/java/com/codeinsight/
│   │   ├── controller/       # REST controllers
│   │   ├── service/          # Business logic
│   │   ├── repository/       # MongoDB repositories
│   │   ├── model/            # Entity models
│   │   ├── dto/              # Data transfer objects
│   │   ├── security/         # JWT security
│   │   ├── analyzer/         # Static code analyzer
│   │   ├── groq/             # Groq API integration
│   │   ├── config/           # Configuration classes
│   │   └── exception/        # Exception handlers
│   ├── src/main/resources/
│   │   └── application.properties
│   └── pom.xml
├── frontend/
│   ├── src/
│   │   ├── components/       # Reusable components
│   │   ├── pages/            # Page components
│   │   ├── context/          # React context
│   │   ├── services/         # API services
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## 🔧 Setup Instructions

### Prerequisites
- Java 17 or higher
- Node.js 18 or higher
- Maven 3.6+
- MongoDB Atlas account
- Groq API key (xAI)

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Update `application.properties` with your credentials:
```properties
spring.data.mongodb.uri=YOUR_MONGODB_URI
jwt.secret=YOUR_JWT_SECRET
groq.api.key=YOUR_GROQ_API_KEY
```

3. Build and run:
```bash
mvn clean install
mvn spring-boot:run
```

Backend will run on `http://localhost:8080`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Update API base URL in `src/services/api.js` if needed

4. Run development server:
```bash
npm run dev
```

Frontend will run on `http://localhost:5173`

## 🔐 Environment Variables

### Backend (.env or application.properties)
```properties
spring.data.mongodb.uri=mongodb+srv://username:password@cluster.mongodb.net/
spring.data.mongodb.database=codeinsight
jwt.secret=your-secret-key-here
jwt.expiration=86400000
groq.api.key=your-groq-api-key
groq.api.url=https://api.x.ai/v1/chat/completions
groq.model=grok-beta
cors.allowed.origins=http://localhost:5173
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:8080/api
```

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Analysis
- `POST /api/analyze` - Analyze code (Protected)

### User
- `GET /api/user/profile` - Get user profile (Protected)
- `GET /api/submissions/user/{userId}` - Get user submissions (Protected)

## 🧪 Sample API Requests

### Register
```json
POST /api/auth/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Login
```json
POST /api/auth/login
{
  "email": "john@example.com",
  "password": "password123"
}
```

### Analyze Code
```json
POST /api/analyze
Headers: Authorization: Bearer <token>
{
  "problemTitle": "Two Sum",
  "problemDescription": "Find two numbers that add up to target",
  "code": "public int[] twoSum(int[] nums, int target) { ... }",
  "language": "java"
}
```

## 🚀 Deployment

### Frontend (Vercel)
1. Push code to GitHub
2. Import project in Vercel
3. Set build command: `npm run build`
4. Set output directory: `dist`
5. Add environment variables

### Backend (Render/Railway)
1. Push code to GitHub
2. Create new Web Service
3. Set build command: `mvn clean install`
4. Set start command: `java -jar target/codeinsight-backend-1.0.0.jar`
5. Add environment variables

### Database
- MongoDB Atlas is already cloud-hosted
- Ensure IP whitelist is configured

## 🎨 UI Features

- **Glassmorphism Design**: Modern glass effect cards
- **Dark Theme**: Eye-friendly dark mode
- **Smooth Animations**: Framer Motion transitions
- **Responsive Layout**: Mobile-first design
- **Interactive Charts**: Recharts visualizations
- **Code Editor**: Monaco Editor integration

## 🔒 Security Features

- JWT-based authentication
- Password hashing with BCrypt
- CORS configuration
- Protected routes
- Input validation
- Global exception handling

## 📊 Analytics Features

- Weak topics distribution (Pie chart)
- Complexity trend analysis (Bar chart)
- Submission history timeline
- Improvement score calculation
- Most frequent mistakes tracking

## 🤝 Contributing

This is a portfolio project. Feel free to fork and customize for your needs.

## 📝 License

MIT License - feel free to use for learning and portfolio purposes.

## 👨‍💻 Author

Built as a production-ready full-stack portfolio project demonstrating:
- Modern React development
- Spring Boot backend architecture
- AI integration (Groq API)
- MongoDB database design
- JWT authentication
- Clean code principles
- Professional UI/UX design

## 🐛 Known Issues

- Groq API rate limits may apply
- Large code submissions may take longer to analyze

## 🔮 Future Enhancements

- Code comparison feature
- Peer code review
- Leaderboard system
- More language support
- Real-time collaboration
- Code execution sandbox

## 📞 Support

For issues or questions, please open an issue on GitHub.

---

**Note**: This is a portfolio project showcasing full-stack development skills with modern technologies and best practices.
