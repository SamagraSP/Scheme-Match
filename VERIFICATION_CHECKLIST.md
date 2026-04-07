# ✅ Integration Verification Checklist

## Backend Verification
- [x] Django migrations completed successfully (21 migrations)
- [x] SQLite database configured in settings.py
- [x] CORS headers installed and configured for localhost:5173
- [x] JWT authentication middleware enabled
- [x] API endpoints registered in urls.py
- [x] Models updated with correct field names (location, not state)
- [x] Views updated with correct field mapping

## Frontend Verification
- [x] API service created (src/services/api.js)
- [x] Axios client configured with JWT interceptors
- [x] Login page integrated with backend
- [x] Register page integrated with backend
- [x] Dashboard fetches policies from backend
- [x] All routes configured in App.jsx
- [x] Error handling implemented
- [x] Loading states implemented
- [x] Token storage via localStorage

## Files Created/Modified

### Created:
- `src/services/api.js` - Centralized API client
- `INTEGRATION_GUIDE.md` - Integration documentation

### Modified:
- `src/App.jsx` - Added all routes
- `src/documents/Login.jsx` - Import authAPI, fixed axios
- `src/documents/Register.jsx` - Import authAPI, location field, error handling
- `src/pages/Dashboard.jsx` - Import policyAPI, fetch on mount
- `matchscheme/settings.py` - SQLite database configuration
- `api/views.py` - Fixed register function field mapping
- `api/models.py` - Fixed agriculture typo

## Testing the Integration

### Step 1: Start Backend
```powershell
cd Backend\matchscheme
..\backendvenv\Scripts\Activate.ps1
python manage.py runserver
# Should see: "Starting development server at http://127.0.0.1:8000/"
```

### Step 2: Start Frontend
```powershell
cd Frontend\goodwill
npm run dev
# Should see: "VITE ... ready in XXX ms"
```

### Step 3: Test Registration Flow
1. Open `http://localhost:5173`
2. Click Register
3. Fill out form with test data
4. Submit
5. Should redirect to login on success
6. Check browser console for any errors

### Step 4: Test Login Flow
1. Click Login
2. Enter credentials used in registration
3. Submit
4. Should redirect to dashboard on success
5. Verify JWT token in localStorage

### Step 5: Test Dashboard
1. Verify policies are loaded from backend
2. Check console for any API errors
3. Verify theme toggle still works
4. Test form input and scheme matching

## Common Issues & Solutions

### Dashboard won't load policies
- Check Django server is running
- Check CORS_ALLOWED_ORIGINS is correct
- Check browser console for Network errors
- Verify `Authorization: Bearer <token>` header is sent

### Registration fails
- Check all required fields are filled
- Check field names match backend expectations (especially `location`)
- Check Django console for validation errors

### Login fails
- Verify user was created during registration
- Check email/password case sensitivity
- Check for typos in credentials

### Token refresh doesn't work
- Verify refresh token is stored in localStorage
- Check JWT library compatibility
- Check Django JWT settings

## Database Schema

### Policy Model
- title, description, category, region
- annual_income_limit, tags, last_date
- documents, link

### UserProfile Model  
- user (FK to User), name, age, gender
- occupation, income, location, category

## Next: Run the Servers
Execute the verification steps above to test the full integration!
