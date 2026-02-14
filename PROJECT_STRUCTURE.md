# Complete Project Structure

```
full_stack_project-concept-connector/
│
├── backend/                                    # Spring Boot Backend
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/codeinsight/
│   │   │   │   ├── CodeInsightApplication.java    # Main application class
│   │   │   │   │
│   │   │   │   ├── controller/                    # REST Controllers
│   │   │   │   │   ├── AuthController.java        # Auth endpoints
│   │   │   │   │   ├── AnalysisController.java    # Analysis endpoints
│   │   │   │   │   └── UserController.java        # User endpoints
│   │   │   │   │
│   │   │   │   ├── service/                       # Business Logic
│   │   │   │   │   ├── AuthService.java           # Authentication logic
│   │   │   │   │   ├── AnalysisService.java       # Code analysis logic
│   │   │   │   │   └── UserService.java           # User operations
│   │   │   │   │
│   │   │   │   ├── repository/                    # Data Access Layer
│   │   │   │   │   ├── UserRepository.java        # User CRUD
│   │   │   │   │   └── SubmissionRepository.java  # Submission CRUD
│   │   │   │   │
│   │   │   │   ├── model/                         # Entity Models
│   │   │   │   │   ├── User.java                  # User entity
│   │   │   │   │   └── Submission.java            # Submission entity
│   │   │   │   │
│   │   │   │   ├── dto/                           # Data Transfer Objects
│   │   │   │   │   ├── RegisterRequest.java       # Registration DTO
│   │   │   │   │   ├── LoginRequest.java          # Login DTO
│   │   │   │   │   ├── AuthResponse.java          # Auth response DTO
│   │   │   │   │   ├── AnalyzeRequest.java        # Analysis request DTO
│   │   │   │   │   └── ApiResponse.java           # Generic response wrapper
│   │   │   │   │
│   │   │   │   ├── security/                      # Security Layer
│   │   │   │   │   ├── JwtUtil.java               # JWT token utility
│   │   │   │   │   └── JwtAuthenticationFilter.java # JWT filter
│   │   │   │   │
│   │   │   │   ├── config/                        # Configuration
│   │   │   │   │   └── SecurityConfig.java        # Security configuration
│   │   │   │   │
│   │   │   │   ├── analyzer/                      # Static Analysis
│   │   │   │   │   └── StaticAnalyzer.java        # Code complexity analyzer
│   │   │   │   │
│   │   │   │   ├── groq/                          # AI Integration
│   │   │   │   │   └── GroqService.java           # Groq API service
│   │   │   │   │
│   │   │   │   └── exception/                     # Exception Handling
│   │   │   │       └── GlobalExceptionHandler.java # Global error handler
│   │   │   │
│   │   │   └── resources/
│   │   │       └── application.properties         # Application config
│   │   │
│   │   └── test/                                  # Test files (optional)
│   │
│   └── pom.xml                                    # Maven dependencies
│
├── frontend/                                   # React Frontend
│   ├── public/                                # Static assets
│   │
│   ├── src/
│   │   ├── components/                        # Reusable Components
│   │   │   ├── Navbar.jsx                     # Navigation bar
│   │   │   └── ProtectedRoute.jsx             # Route protection
│   │   │
│   │   ├── pages/                             # Page Components
│   │   │   ├── LandingPage.jsx                # Home/landing page
│   │   │   ├── LoginPage.jsx                  # Login page
│   │   │   ├── RegisterPage.jsx               # Registration page
│   │   │   ├── DashboardPage.jsx              # Code submission dashboard
│   │   │   ├── ResultPage.jsx                 # Analysis results
│   │   │   ├── AnalyticsPage.jsx              # Analytics & charts
│   │   │   └── ProfilePage.jsx                # User profile
│   │   │
│   │   ├── context/                           # React Context
│   │   │   └── AuthContext.jsx                # Authentication context
│   │   │
│   │   ├── services/                          # API Services
│   │   │   └── api.js                         # Axios API configuration
│   │   │
│   │   ├── App.jsx                            # Main app component
│   │   ├── main.jsx                           # Entry point
│   │   └── index.css                          # Global styles
│   │
│   ├── index.html                             # HTML template
│   ├── package.json                           # NPM dependencies
│   ├── vite.config.js                         # Vite configuration
│   ├── tailwind.config.js                     # Tailwind configuration
│   └── postcss.config.js                      # PostCSS configuration
│
├── .gitignore                                 # Git ignore rules
├── .env.example                               # Environment variables template
├── README.md                                  # Main documentation
├── QUICKSTART.md                              # Quick start guide
├── API_TESTING.md                             # API testing guide
├── DEPLOYMENT.md                              # Deployment guide
└── PROJECT_SUMMARY.md                         # Project summary

```

---

## 📊 File Count Summary

### Backend (Java)
- **Controllers**: 3 files
- **Services**: 3 files
- **Repositories**: 2 files
- **Models**: 2 files
- **DTOs**: 5 files
- **Security**: 2 files
- **Config**: 1 file
- **Analyzer**: 1 file
- **Groq**: 1 file
- **Exception**: 1 file
- **Main**: 1 file
- **Total**: 22 Java files

### Frontend (React)
- **Components**: 2 files
- **Pages**: 7 files
- **Context**: 1 file
- **Services**: 1 file
- **Config**: 5 files
- **Total**: 16 JavaScript/JSX files

### Documentation
- **README.md**: Main documentation
- **QUICKSTART.md**: Setup guide
- **API_TESTING.md**: API examples
- **DEPLOYMENT.md**: Deployment guide
- **PROJECT_SUMMARY.md**: Architecture overview
- **Total**: 5 documentation files

### Configuration
- **pom.xml**: Maven dependencies
- **package.json**: NPM dependencies
- **application.properties**: Backend config
- **vite.config.js**: Build config
- **tailwind.config.js**: Style config
- **.gitignore**: Git rules
- **.env.example**: Environment template
- **Total**: 7 configuration files

---

## 🎯 Key Files Explained

### Backend Core Files

**CodeInsightApplication.java**
- Spring Boot main application entry point
- Bootstraps the entire backend

**SecurityConfig.java**
- Configures Spring Security
- Sets up JWT authentication
- Defines CORS policies
- Protects endpoints

**JwtUtil.java**
- Generates JWT tokens
- Validates tokens
- Extracts user information

**StaticAnalyzer.java**
- Analyzes code structure
- Detects loops and recursion
- Estimates complexity
- Identifies patterns

**GroqService.java**
- Integrates with Groq AI API
- Sends code for analysis
- Parses AI responses
- Handles errors gracefully

### Frontend Core Files

**App.jsx**
- Main React component
- Sets up routing
- Wraps with AuthProvider

**AuthContext.jsx**
- Manages authentication state
- Provides login/logout functions
- Persists user data

**api.js**
- Configures Axios
- Sets up interceptors
- Defines API endpoints
- Handles authentication headers

**DashboardPage.jsx**
- Code submission interface
- Monaco code editor
- Problem input forms
- Analysis trigger

**ResultPage.jsx**
- Displays analysis results
- Shows complexity
- Lists weak concepts
- Provides suggestions

**AnalyticsPage.jsx**
- Visualizes data with charts
- Shows progress metrics
- Displays trends

---

## 🔗 File Dependencies

### Backend Flow
```
Request → Controller → Service → Repository → MongoDB
                    ↓
                Analyzer → Groq API
                    ↓
                Response
```

### Frontend Flow
```
User → Page Component → API Service → Backend
                    ↓
                Context (Auth)
                    ↓
                UI Update
```

---

## 📦 Package Dependencies

### Backend (pom.xml)
- spring-boot-starter-web
- spring-boot-starter-data-mongodb
- spring-boot-starter-security
- spring-boot-starter-validation
- spring-boot-starter-webflux
- jjwt (JWT library)
- lombok

### Frontend (package.json)
- react & react-dom
- react-router-dom
- axios
- framer-motion
- recharts
- @monaco-editor/react
- tailwindcss
- vite

---

## 🎨 Styling Structure

### TailwindCSS Classes Used
- Layout: flex, grid, container
- Spacing: p-*, m-*, gap-*
- Colors: bg-*, text-*
- Effects: hover:*, transition
- Responsive: md:*, lg:*

### Custom CSS
- `.glass`: Glassmorphism effect
- `.gradient-bg`: Gradient backgrounds
- Global styles in `index.css`

---

## 🔐 Security Files

**JwtAuthenticationFilter.java**
- Intercepts all requests
- Validates JWT tokens
- Sets authentication context

**SecurityConfig.java**
- Configures security rules
- Defines public/protected routes
- Sets up password encoding

**ProtectedRoute.jsx**
- Frontend route protection
- Redirects unauthenticated users
- Wraps protected pages

---

## 📊 Data Flow

### Registration Flow
```
RegisterPage → api.js → AuthController → AuthService
    → UserRepository → MongoDB → JWT Token → AuthContext
```

### Analysis Flow
```
DashboardPage → api.js → AnalysisController → AnalysisService
    → StaticAnalyzer + GroqService → SubmissionRepository
    → MongoDB → ResultPage
```

### Analytics Flow
```
AnalyticsPage → api.js → UserController → UserService
    → SubmissionRepository → MongoDB → Charts Display
```

---

## 🚀 Build & Run Commands

### Backend
```bash
cd backend
mvn clean install    # Build
mvn spring-boot:run  # Run
```

### Frontend
```bash
cd frontend
npm install          # Install dependencies
npm run dev          # Development server
npm run build        # Production build
```

---

## 📝 Notes

- All backend files use Java 17 features
- Frontend uses React 18 with hooks
- MongoDB uses NoSQL document structure
- JWT tokens expire after 24 hours
- Groq API uses xAI's Grok model
- CORS configured for localhost development
- Production deployment requires environment variables

---

**This structure represents a complete, production-ready full-stack application! 🎉**
