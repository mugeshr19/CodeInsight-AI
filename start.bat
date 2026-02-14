@echo off
echo ========================================
echo   CodeInsight AI - Startup Script
echo ========================================
echo.

echo Checking prerequisites...
echo.

REM Check Java
java -version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Java is not installed or not in PATH
    echo Please install Java 17 or higher
    pause
    exit /b 1
)
echo [OK] Java is installed

REM Check Maven
mvn -version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Maven is not installed or not in PATH
    echo Please install Maven 3.6 or higher
    pause
    exit /b 1
)
echo [OK] Maven is installed

REM Check Node
node -v >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed or not in PATH
    echo Please install Node.js 18 or higher
    pause
    exit /b 1
)
echo [OK] Node.js is installed

REM Check npm
npm -v >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] npm is not installed or not in PATH
    pause
    exit /b 1
)
echo [OK] npm is installed

echo.
echo All prerequisites are met!
echo.
echo ========================================
echo   Starting Backend (Spring Boot)
echo ========================================
echo.

cd backend
start "CodeInsight Backend" cmd /k "mvn spring-boot:run"
cd ..

echo Backend starting on http://localhost:8080
echo.
echo Waiting 10 seconds for backend to initialize...
timeout /t 10 /nobreak >nul

echo.
echo ========================================
echo   Starting Frontend (React + Vite)
echo ========================================
echo.

cd frontend

REM Check if node_modules exists
if not exist "node_modules\" (
    echo Installing frontend dependencies...
    call npm install
)

start "CodeInsight Frontend" cmd /k "npm run dev"
cd ..

echo.
echo ========================================
echo   CodeInsight AI is Starting!
echo ========================================
echo.
echo Backend:  http://localhost:8080
echo Frontend: http://localhost:5173
echo.
echo Both servers are running in separate windows.
echo Close those windows to stop the servers.
echo.
echo Press any key to open the application in browser...
pause >nul

start http://localhost:5173

echo.
echo Application opened in browser!
echo.
echo To stop the application:
echo 1. Close the backend terminal window
echo 2. Close the frontend terminal window
echo.
pause
