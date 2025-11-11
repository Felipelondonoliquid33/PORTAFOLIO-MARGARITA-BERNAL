# 🚀 Deployment Guide

This guide will help you deploy your Next.js portfolio to the web.

## Option 1: Deploy to Vercel (Recommended - Easiest)

Vercel is made by the creators of Next.js and offers the simplest deployment process.

### Method A: Deploy with GitHub (Recommended)

#### Prerequisites:
1. A GitHub account (free)
2. Git installed on your computer (download: https://git-scm.com/downloads)

#### Step 1: Push to GitHub

1. **Create a GitHub account** (if you don't have one): https://github.com/signup

2. **Create a new repository** on GitHub:
   - Go to https://github.com/new
   - Name it (e.g., "portfolio-website")
   - Choose "Public" or "Private"
   - **Don't** initialize with README (you already have files)
   - Click "Create repository"

3. **Push your code to GitHub** (run these commands in your project folder):

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Portfolio website"

# Add your GitHub repository (replace YOUR_USERNAME and YOUR_REPO_NAME)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Push to GitHub
git branch -M main
git push -u origin main
```

#### Step 2: Deploy to Vercel

1. **Go to Vercel**: https://vercel.com/signup
2. **Sign up with GitHub** (easiest option)
3. **Click "Add New Project"**
4. **Import your GitHub repository**
5. **Configure project**:
   - Framework Preset: **Next.js** (auto-detected)
   - Root Directory: `./` (default)
   - Build Command: `npm run build` (auto-filled)
   - Output Directory: `.next` (auto-filled)
   - Install Command: `npm install` (auto-filled)
6. **Click "Deploy"**
7. **Wait 2-3 minutes** for deployment
8. **Your site will be live!** You'll get a URL like: `https://your-project.vercel.app`

### Method B: Deploy with Vercel CLI (No GitHub Needed)

If you don't want to use GitHub, you can deploy directly from your computer using Vercel CLI.

#### Prerequisites:
1. Node.js installed (download: https://nodejs.org/)
2. A Vercel account (free)

#### Step 1: Install Vercel CLI

Open your terminal in the project folder and run:

```bash
npm install -g vercel
```

#### Step 2: Login to Vercel

```bash
vercel login
```

This will open your browser to authenticate.

#### Step 3: Deploy

```bash
vercel
```

Follow the prompts:
- Set up and deploy? **Yes**
- Which scope? (Select your account)
- Link to existing project? **No**
- Project name? (Press Enter for default)
- Directory? (Press Enter for current directory)

#### Step 4: Production Deploy (Optional)

For production deployment:

```bash
vercel --prod
```

Your site will be live at: `https://your-project.vercel.app`

### Step 3: Custom Domain (Optional)

1. In Vercel dashboard, go to your project
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

---

## Option 2: Deploy to Netlify

### Step 1: Push to GitHub (same as above)

### Step 2: Deploy to Netlify

1. **Go to Netlify**: https://app.netlify.com/signup
2. **Sign up with GitHub**
3. **Click "Add new site" → "Import an existing project"**
4. **Select your GitHub repository**
5. **Configure build settings**:
   - Build command: `npm run build`
   - Publish directory: `.next`
6. **Click "Deploy site"**
7. **Wait for deployment** (2-3 minutes)
8. **Your site is live!** URL: `https://your-project.netlify.app`

---

## Option 3: Deploy to GitHub Pages (Free but Limited)

⚠️ **Note**: GitHub Pages requires static export. You'll need to modify your Next.js config.

### Step 1: Update next.config.js

Add `output: 'export'` to your `next.config.js`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Add this line
  reactStrictMode: true,
  images: {
    unoptimized: true, // Add this for static export
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'source.unsplash.com',
      },
    ],
  },
}

module.exports = nextConfig
```

### Step 2: Update package.json

Add a script for GitHub Pages:

```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint",
  "export": "next build"
}
```

### Step 3: Build and Deploy

1. **Build the site**: `npm run build`
2. **Push to GitHub** (as shown in Option 1)
3. **Go to your repository** on GitHub
4. **Settings** → **Pages**
5. **Source**: Select "GitHub Actions" or "Deploy from a branch"
6. **Branch**: `main` or `master`, folder: `/out` or `/`
7. **Save**
8. **Your site will be at**: `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME`

---

## Quick Comparison

| Platform | Ease | Free Tier | Best For |
|----------|------|-----------|----------|
| **Vercel** | ⭐⭐⭐⭐⭐ | Yes | Next.js projects |
| **Netlify** | ⭐⭐⭐⭐ | Yes | General web apps |
| **GitHub Pages** | ⭐⭐⭐ | Yes | Static sites only |

---

## Troubleshooting

### Build Fails

1. **Check build logs** in your deployment platform
2. **Common issues**:
   - Missing dependencies → Run `npm install` locally first
   - TypeScript errors → Fix errors shown in logs
   - Image optimization issues → Check `next.config.js` image settings

### Images Not Loading

- Make sure `next.config.js` has correct `remotePatterns` for your image sources
- For static export, add `images: { unoptimized: true }`

### Environment Variables

If you add environment variables later:
- **Vercel**: Project Settings → Environment Variables
- **Netlify**: Site Settings → Environment Variables

---

## Recommended: Vercel

For Next.js projects, **Vercel is the best choice** because:
- ✅ Zero configuration needed
- ✅ Automatic deployments on git push
- ✅ Free SSL certificate
- ✅ Global CDN
- ✅ Preview deployments for pull requests
- ✅ Made by Next.js creators

---

## Need Help?

1. Check the deployment platform's documentation
2. Review build logs for specific errors
3. Test your build locally first: `npm run build`

