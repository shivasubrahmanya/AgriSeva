# AgriSeva Deployment Guide

## GitHub + Vercel Deployment

### Prerequisites
- GitHub account
- Vercel account (connected to GitHub)

### Current Project Structure
AgriSeva/
├── src/                    # React frontend source
├── public/                 # Public assets
├── backend/               # FastAPI backend
├── package.json           # Frontend dependencies
├── vercel.json           # Frontend deployment config
├── backend/vercel.json   # Backend deployment config
└── README.md

### Step 1: Deploy Frontend (React App)
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository: `shivasubrahmanya/AgriSeva`
4. **Root Directory**: Leave as root (default)
5. **Framework Preset**: Create React App (auto-detected)
6. **Build Command**: `npm run build` (auto-detected)
7. **Output Directory**: `build` (auto-detected)
8. Deploy and copy the frontend URL

### Step 2: Deploy Backend (FastAPI)
1. Create another Vercel project
2. Import the same GitHub repository
3. Set **Root Directory** to `backend`
4. **Framework Preset**: Other
5. **Build Command**: `pip install -r requirements.txt`
6. Deploy and copy the backend URL

### Step 3: Connect Frontend to Backend
1. Go to your frontend Vercel project
2. Go to **Settings** → **Environment Variables**
3. Add: `REACT_APP_API_URL` = your backend URL from Step 2
4. Redeploy the frontend

### Step 4: Update CORS Settings
Update your backend `main.py` CORS settings:
```python
allow_origins=[
    "http://localhost:3000",
    "https://your-frontend-url.vercel.app",  # Add your actual frontend URL
],
```

### Environment Variables Setup
- **Frontend**: `REACT_APP_API_URL` (set in Vercel dashboard)
- **Backend**: No environment variables needed for basic setup

### Automatic Deployments
Every push to `main` branch triggers automatic deployments on both projects.

## Why This Structure is Better
- Frontend in root = easier Vercel deployment
- Separate backend folder = clean separation
- Single repository = easier management
- Auto-detection of React app by Vercel

## Troubleshooting
- If frontend deployment fails, check build logs in Vercel
- Ensure `package.json` is in root directory
- For backend issues, check that `requirements.txt` is in backend folder
