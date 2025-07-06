# API Configuration Guide

This guide explains how to use the centralized API configuration system in the RA Global Education Platform frontend.

## 📁 File Structure

```
src/
├── config/
│   └── index.ts           # Main configuration file
├── lib/
│   ├── api.ts            # Centralized API client
│   ├── auth-api.ts       # Authentication API service
│   └── environment-switcher.ts  # Development environment switcher
└── .env                  # Environment variables
```

## 🔧 Configuration Files

### 1. Environment Variables (`.env`)

```bash
# API Configuration
VITE_API_URL=http://localhost:1337/api
VITE_API_TIMEOUT=10000
VITE_API_VERSION=v1

# App Configuration
VITE_APP_NAME=RA Global Education Platform
VITE_DEFAULT_LANGUAGE=en
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_NOTIFICATIONS=true

# File Upload Settings
VITE_MAX_FILE_SIZE=10485760
VITE_ALLOWED_FILE_TYPES=image/jpeg,image/png,image/webp,application/pdf
```

### 2. Central Configuration (`src/config/index.ts`)

This file reads environment variables and provides a typed configuration object:

```typescript
import config from '@/config';

// Access API URL
console.log(config.api.baseUrl);

// Access app settings
console.log(config.app.name);

// Check environment
if (config.isDevelopment) {
  // Development-only code
}
```

### 3. API Client (`src/lib/api.ts`)

Centralized Axios instance with:
- Automatic token injection
- Global error handling
- Request/response interceptors
- Environment-aware configuration

## 🚀 Usage Examples

### Basic API Calls

```typescript
import { apiHelpers, API_ENDPOINTS } from '@/lib/api';

// GET request
const users = await apiHelpers.get(API_ENDPOINTS.USERS.LIST);

// POST request
const newUser = await apiHelpers.post(API_ENDPOINTS.USERS.CREATE, userData);

// File upload with progress
const uploadResult = await apiHelpers.uploadFile(file, (progress) => {
  console.log(`Upload progress: ${progress}%`);
});
```

### Authentication

```typescript
import { authService } from '@/lib/auth-api';

// Login
const { jwt, user } = await authService.login({
  identifier: 'user@example.com',
  password: 'password'
});

// Get current user
const currentUser = await authService.getCurrentUser();
```

## 🔄 Environment Switching

### For Development

The platform includes a development environment switcher for easy testing:

```javascript
// In browser console (development only):

// Switch to staging
switchToEnvironment('staging');

// Switch to production
switchToEnvironment('production');

// Switch back to development
switchToEnvironment('development');

// Show current configuration
showEnvironmentConfig();

// Clear environment override
clearDevEnvironment();
```

### For Production Deployment

1. **Development**: Set `VITE_API_URL=http://localhost:1337/api`
2. **Staging**: Set `VITE_API_URL=https://staging-api.raglobal.com/api`
3. **Production**: Set `VITE_API_URL=https://api.raglobal.com/api`

## 📋 Available API Endpoints

```typescript
import { API_ENDPOINTS } from '@/lib/api';

// Authentication
API_ENDPOINTS.AUTH.LOGIN           // /auth/local
API_ENDPOINTS.AUTH.REGISTER        // /auth/local/register
API_ENDPOINTS.AUTH.FORGOT_PASSWORD // /auth/forgot-password

// Users
API_ENDPOINTS.USERS.ME            // /users/me
API_ENDPOINTS.USERS.PROFILE       // /users/me?populate=profile

// Courses
API_ENDPOINTS.COURSES.LIST        // /courses
API_ENDPOINTS.COURSES.DETAIL(id)  // /courses/:id

// And many more...
```

## 🛠️ Adding New Endpoints

1. Add to `API_ENDPOINTS` in `src/lib/api.ts`:

```typescript
export const API_ENDPOINTS = {
  // ...existing endpoints...
  
  // New feature
  LESSONS: {
    LIST: '/lessons',
    DETAIL: (id: string) => `/lessons/${id}`,
    CREATE: '/lessons',
  },
};
```

2. Create a service file:

```typescript
// src/lib/lesson-api.ts
import { apiHelpers, API_ENDPOINTS } from './api';

export const lessonService = {
  async getLessons() {
    return await apiHelpers.get(API_ENDPOINTS.LESSONS.LIST);
  },
  
  async getLesson(id: string) {
    return await apiHelpers.get(API_ENDPOINTS.LESSONS.DETAIL(id));
  },
};
```

## 🔐 Authentication Flow

The API client automatically handles:

1. **Token Storage**: Stored in `localStorage` with configurable key
2. **Token Injection**: Added to all requests via interceptor
3. **Auto-Logout**: On 401 responses, clears token and redirects
4. **Error Handling**: Global error handling for all API calls

## 🚨 Error Handling

The API client includes global error handling:

- **401 Unauthorized**: Auto-logout and redirect to login
- **403 Forbidden**: Redirect to unauthorized page
- **404 Not Found**: Log error and continue
- **500 Server Error**: Log error and show user-friendly message
- **Network Errors**: Handle offline scenarios

## 📝 Best Practices

1. **Always use the centralized API client** instead of creating new Axios instances
2. **Use API_ENDPOINTS constants** instead of hardcoded URLs
3. **Use apiHelpers** for consistent error handling
4. **Test with different environments** using the environment switcher
5. **Keep sensitive data in environment variables**, never in code

## 🔧 Configuration Changes

To change the API URL for the entire application:

1. **Quick Development Switch**: Use browser console commands
2. **Environment Change**: Update `.env` file and restart dev server
3. **Production Deployment**: Set environment variables in hosting platform

This centralized approach ensures that all API calls use consistent configuration and can be easily modified from a single location.
