# MatchScheme Backend & Frontend Integration Guide

## ✅ Completed Integration Steps

### 1. **Backend Setup**
- ✅ Fixed model field mismatch between `state` and `location`
- ✅ Fixed typo: `agiriculture` → `agriculture`
- ✅ Switched from Djongo (MongoDB) to SQLite for compatibility
- ✅ Ran migrations successfully
- ✅ CORS configured for `http://localhost:5173` (frontend dev server)
- ✅ JWT authentication endpoints ready

### 2. **Frontend Setup**
- ✅ Created centralized API service (`src/services/api.js`)
  - Axios client with JWT interceptors
  - Auto token refresh on 401 errors
  - Organized endpoints: `authAPI`, `policyAPI`, `userProfileAPI`

- ✅ Updated all authentication pages:
  - **Login.jsx**: Uses `authAPI.login()`, stores JWT tokens
  - **Register.jsx**: Uses `authAPI.register()`, fixed `state` → `location` field
  - Added error handling and loading states

- ✅ Updated Dashboard:
  - Fetches policies from backend on mount
  - Uses `policyAPI.getAll()`
  - Field consistency: `location` instead of `state`

- ✅ Updated App.jsx with complete routing:
  - `/` → Hero (landing page)
  - `/login` → Login page
  - `/register` → Registration page
  - `/dashboard` → Dashboard with schemes

## 🚀 How to Run the Application

### Backend (Django)
```powershell
# Navigate to backend
cd Backend\matchscheme

# Activate virtual environment
..\backendvenv\Scripts\Activate.ps1

# Start Django development server
python manage.py runserver
```
Backend runs on: **http://localhost:8000**

### Frontend (React + Vite)
```powershell
# Navigate to frontend
cd Frontend\goodwill

# Install dependencies (if not done)
npm install

# Start development server
npm run dev
```
Frontend runs on: **http://localhost:5173**

## 📡 API Endpoints

### Authentication
- `POST /api/auth/login/` - Login with email & password
- `POST /api/auth/register/` - Register new user
- `POST /api/auth/refresh/` - Refresh JWT token

### Policies
- `GET /api/policies/` - Get all policies
- `GET /api/policies/{id}/` - Get specific policy
- `POST /api/policies/` - Create policy (admin)
- `PUT /api/policies/{id}/` - Update policy (admin)
- `DELETE /api/policies/{id}/` - Delete policy (admin)

### User Profiles
- `GET /api/user-profiles/` - Get all profiles
- `GET /api/user-profiles/{id}/` - Get specific profile
- `POST /api/user-profiles/` - Create profile
- `PUT /api/user-profiles/{id}/` - Update profile
- `DELETE /api/user-profiles/{id}/` - Delete profile

## 🔑 Key Features

✅ **JWT Authentication**
- Tokens stored in localStorage
- Automatic token refresh on 401
- Authorization header automatically added

✅ **Error Handling**
- User-friendly error messages
- Network error handling
- Form validation feedback

✅ **State Management**
- Centralized API service
- Consistent field naming between frontend and backend
- Loading states during API calls

## ⚙️ Database

Currently using **SQLite** (`db.sqlite3`) for development.

To switch back to MongoDB later:
1. Update djongo to v2.0+ (compatible with Django 5.2)
2. Uncomment MongoDB config in `settings.py`
3. Update field names if needed

## 📝 User Registration Fields

When registering, users must provide:
- **name** - Full name
- **email** - Email address
- **password** - Password
- **age** - Age (number)
- **gender** - Gender (male/female/other)
- **location** - Location/State (string)
- **category** - Category (gen/obc/sc/st)
- **occupation** - Occupation (farmer/student/etc)
- **income** - Annual income (number)

## 🐛 Troubleshooting

### CORS Errors
- Ensure Django server is running on port 8000
- Verify `CORS_ALLOWED_ORIGINS` includes your frontend URL
- Check frontend is accessing `http://localhost:8000/api/...`

### Authentication Issues
- Tokens stored correctly in localStorage?
- Check browser DevTools → Application → Local Storage
- Token format: `Bearer <token>` in Authorization header

### Database Errors
- If migrations fail, check SQLite is writable
- Run: `python manage.py migrate`

## 📚 Next Steps

1. Add more API endpoints for policy matching algorithm
2. Implement password reset functionality
3. Add user profile detail pages
4. Deploy to production (update CORS_ALLOWED_ORIGINS)
5. Consider upgrading to PostgreSQL or proper MongoDB setup
