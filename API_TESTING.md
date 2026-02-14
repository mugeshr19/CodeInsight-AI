# API Testing Guide

## Base URL
```
http://localhost:8080/api
```

## 1. Register User

**Endpoint:** `POST /api/auth/register`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "password123"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Registration successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "userId": "65abc123def456789",
    "name": "John Doe",
    "email": "john.doe@example.com"
  }
}
```

## 2. Login User

**Endpoint:** `POST /api/auth/login`

**Request Body:**
```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "userId": "65abc123def456789",
    "name": "John Doe",
    "email": "john.doe@example.com"
  }
}
```

## 3. Analyze Code

**Endpoint:** `POST /api/analyze`

**Headers:**
```
Authorization: Bearer <your-jwt-token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "problemTitle": "Two Sum Problem",
  "problemDescription": "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
  "code": "public int[] twoSum(int[] nums, int target) {\n    for (int i = 0; i < nums.length; i++) {\n        for (int j = i + 1; j < nums.length; j++) {\n            if (nums[i] + nums[j] == target) {\n                return new int[] { i, j };\n            }\n        }\n    }\n    return null;\n}",
  "language": "java"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Analysis completed",
  "data": {
    "id": "65abc789def123456",
    "userId": "65abc123def456789",
    "problemTitle": "Two Sum Problem",
    "problemDescription": "Given an array...",
    "code": "public int[] twoSum...",
    "language": "java",
    "detectedComplexity": "O(n²) - Quadratic",
    "weakConcepts": [
      "Hash Tables",
      "Time Complexity Optimization",
      "Space-Time Tradeoff"
    ],
    "whyFailed": "The code uses nested loops which results in O(n²) time complexity. For large arrays, this becomes inefficient.",
    "optimizationSuggestion": "Consider using a hash map to store previously seen numbers and their indices. This would reduce time complexity to O(n).",
    "approachHint": "Think about trading space for time. Can you store information about numbers you've already seen to avoid the inner loop?",
    "topicsToRevise": [
      "Hash Tables and Hash Maps",
      "Time Complexity Analysis",
      "Two Pointer Technique",
      "Array Traversal Optimization"
    ],
    "createdAt": "2024-01-15T10:30:00"
  }
}
```

## 4. Get User Profile

**Endpoint:** `GET /api/user/profile`

**Headers:**
```
Authorization: Bearer <your-jwt-token>
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Success",
  "data": {
    "name": "John Doe",
    "email": "john.doe@example.com",
    "totalSubmissions": 15,
    "mostWeakTopic": "Dynamic Programming",
    "improvementScore": 73.5,
    "weakTopicsDistribution": {
      "Dynamic Programming": 8,
      "Graph Algorithms": 5,
      "Tree Traversal": 3,
      "Hash Tables": 2
    }
  }
}
```

## 5. Get User Submissions

**Endpoint:** `GET /api/submissions/user/{userId}`

**Headers:**
```
Authorization: Bearer <your-jwt-token>
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Success",
  "data": [
    {
      "id": "65abc789def123456",
      "userId": "65abc123def456789",
      "problemTitle": "Two Sum Problem",
      "problemDescription": "Given an array...",
      "code": "public int[] twoSum...",
      "language": "java",
      "detectedComplexity": "O(n²) - Quadratic",
      "weakConcepts": ["Hash Tables", "Time Complexity"],
      "whyFailed": "Nested loops cause O(n²) complexity",
      "optimizationSuggestion": "Use hash map for O(n) solution",
      "approachHint": "Trade space for time",
      "topicsToRevise": ["Hash Tables", "Time Complexity"],
      "createdAt": "2024-01-15T10:30:00"
    }
  ]
}
```

## Error Responses

**400 Bad Request:**
```json
{
  "success": false,
  "message": "Validation failed",
  "data": null
}
```

**401 Unauthorized:**
```json
{
  "success": false,
  "message": "Invalid credentials",
  "data": null
}
```

**403 Forbidden:**
```json
{
  "success": false,
  "message": "Unauthorized access",
  "data": null
}
```

**500 Internal Server Error:**
```json
{
  "success": false,
  "message": "An unexpected error occurred",
  "data": null
}
```

## Testing with cURL

### Register
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'
```

### Login
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
```

### Analyze Code
```bash
curl -X POST http://localhost:8080/api/analyze \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{"problemTitle":"Two Sum","problemDescription":"Find two numbers","code":"your code here","language":"java"}'
```

### Get Profile
```bash
curl -X GET http://localhost:8080/api/user/profile \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## Testing with Postman

1. Import the endpoints into Postman
2. Create an environment variable for `baseUrl` = `http://localhost:8080/api`
3. Create an environment variable for `token` after login
4. Use `{{baseUrl}}` and `{{token}}` in your requests

## Notes

- All protected endpoints require JWT token in Authorization header
- Token format: `Bearer <token>`
- Token expires after 24 hours (86400000 ms)
- Passwords are hashed with BCrypt
- MongoDB stores all data
