# AgriSeva Deployment Guide

## GitHub + Vercel Deployment

### Prerequisites
- GitHub account
- Vercel account (connected to GitHub)

### Current Project Structure
AgriSeva/
├── frontend/              # React frontend application
│   ├── src/              # React source files
│   ├── public/           # Public assets
│   ├── package.json      # Frontend dependencies
│   └── .env.production   # Production environment variables
├── backend/              # FastAPI backend
│   ├── main.py          # FastAPI application
│   ├── requirements.txt # Backend dependencies
│   └── vercel.json      # Backend deployment config
├── ml-models/           # Machine learning models
├── vercel.json          # Root deployment config
└── README.md

### Step 1: Deploy Backend (FastAPI) First
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository: `shivasubrahmanya/AgriSeva`
4. **Root Directory**: Set to `backend` 
5. **Framework Preset**: Other
6. **Project Name**: `agriseva-backend` (or your choice)
7. **Build Command**: Leave empty
8. **Output Directory**: Leave empty
9. Deploy and **copy the backend URL**
   - Example: `https://agriseva-backend-shivasubrahmanya.vercel.app`

### Step 2: Deploy Frontend (React App)
1. Create **another Vercel project**
2. Import the **same GitHub repository**: `shivasubrahmanya/AgriSeva`
3. **Root Directory**: Set to `frontend` 
4. **Framework Preset**: Create React App (auto-detected)
5. **Project Name**: `agriseva` (or your choice)
6. **Build Command**: `npm run build` (auto-detected)
7. **Output Directory**: `build` (auto-detected)
8. **Environment Variables** - Add this:
   ```
   Key: REACT_APP_API_URL
   Value: https://agriseva-backend-shivasubrahmanya.vercel.app
   ```
   (Use your actual backend URL from Step 1)
9. Deploy

### Step 3: Update CORS Settings
After both deployments, update your `backend/main.py`:
```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://agriseva-shivasubrahmanya.vercel.app",  # Your frontend URL
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### Step 4: Test Your Deployment
1. **Frontend URL**: `https://agriseva-shivasubrahmanya.vercel.app`
2. **Backend URL**: `https://agriseva-backend-shivasubrahmanya.vercel.app`
3. **API Test**: Visit `https://agriseva-backend-shivasubrahmanya.vercel.app/` to see API response

### Automatic Deployments 
- Every push to `main` branch automatically deploys both projects
- Frontend and backend deploy independently
- Zero configuration needed after initial setup

### Environment Variables
- **Frontend**: `REACT_APP_API_URL` (set in Vercel dashboard)
- **Backend**: No environment variables needed for basic setup

### Troubleshooting
- **Frontend 404**: Ensure root directory is set to `frontend`
- **Backend 500**: Check deployment logs and ensure `requirements.txt` is correct
- **CORS Errors**: Update CORS origins with your actual frontend URL
- **API Connection**: Verify `REACT_APP_API_URL` matches your backend URL

### Project URLs (Replace with your actual URLs)
- **Frontend**: `https://agriseva-shivasubrahmanya.vercel.app`
- **Backend**: `https://agriseva-backend-shivasubrahmanya.vercel.app`
