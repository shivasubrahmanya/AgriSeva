# AgriSeva Deployment Guide

## GitHub + Vercel Deployment

### Prerequisites
- GitHub account
- Vercel account (connected to GitHub)

### Step 1: Push to GitHub
1. Create a new repository on GitHub
2. Push your code:
   ```bash
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/agriseva.git
   git push -u origin main
   ```

### Step 2: Deploy Backend (FastAPI)
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository
4. Set **Root Directory** to `backend`
5. Framework Preset: **Other**
6. Build Command: `pip install -r requirements.txt`
7. Output Directory: Leave empty
8. Install Command: `pip install -r requirements.txt`
9. Deploy and copy the backend URL

### Step 3: Deploy Frontend (React)
1. Create another Vercel project
2. Import the same GitHub repository
3. Set **Root Directory** to `frontend`
4. Framework Preset: **Create React App**
5. Add Environment Variables:
   - `REACT_APP_API_URL`: Your backend URL from Step 2
6. Deploy

### Step 4: Update CORS Settings
Update your backend `main.py` CORS settings with your frontend URL:
```python
allow_origins=[
    "http://localhost:3000",
    "https://your-frontend-url.vercel.app",  # Add your actual frontend URL
],
```

### Environment Variables Setup
- Backend: No environment variables needed for basic setup
- Frontend: Set `REACT_APP_API_URL` in Vercel dashboard

### Automatic Deployments
Once connected, every push to `main` branch will trigger automatic deployments on both frontend and backend.

## Alternative: Single Repository, Two Projects
You can deploy both frontend and backend from the same repository by creating two separate Vercel projects with different root directories.

## Troubleshooting
- If backend deployment fails, check the build logs
- Ensure all dependencies are in `requirements.txt`
- For frontend issues, check that `REACT_APP_API_URL` is set correctly
