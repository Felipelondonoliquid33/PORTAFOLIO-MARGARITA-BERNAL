# 🚀 Project Setup Guide

Complete guide to set up this portfolio project on a new machine.

## Prerequisites

Before you begin, make sure you have the following installed:

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**

### Verify Installation

Open your terminal and run:
```bash
node --version
npm --version
```

You should see version numbers (e.g., v20.x.x and 10.x.x)

---

## Step-by-Step Setup

### 1. Transfer Project Files

Copy the entire project folder to your new machine. Make sure to include:
- ✅ All files in the root directory
- ✅ `app/` folder
- ✅ `components/` folder
- ✅ `hooks/` folder
- ✅ `utils/` folder
- ✅ Configuration files (`package.json`, `tsconfig.json`, `tailwind.config.js`, etc.)

**Do NOT copy:**
- ❌ `node_modules/` folder (will be regenerated)
- ❌ `.next/` folder (build cache, will be regenerated)

---

### 2. Navigate to Project Directory

Open terminal/command prompt and navigate to the project folder:

```bash
cd "path/to/ANTOHER PORTAFOLIO IDEA"
```

---

### 3. Install Dependencies

Run this command to install all required packages:

```bash
npm install
```

**What this does:**
- Downloads all dependencies listed in `package.json`
- Creates the `node_modules/` folder
- Takes 1-3 minutes depending on your internet speed

**Wait for completion** - You'll know it's done when the command prompt returns.

---

### 4. Start Development Server

Run the development server:

```bash
npm run dev
```

You should see output like:
```
✓ Ready in X seconds
○ Local:        http://localhost:3000
```

---

### 5. Open in Browser

1. Open your web browser (Chrome, Firefox, Safari, Edge)
2. Navigate to: `http://localhost:3000`
3. You should see the portfolio!

---

## Available Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server (after building)
npm start

# Run linter
npm run lint
```

---

## Project Structure

```
ANTOHER PORTAFOLIO IDEA/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Main page
│   └── globals.css        # Global styles
├── components/             # React components
│   ├── ScrollHero.tsx     # Scroll-pinned hero
│   ├── ScrollPhotoGrid.tsx # Layout formation grid
│   ├── About.tsx          # About section
│   └── ...                # Other components
├── hooks/                  # Custom React hooks
├── utils/                  # Utility functions
├── package.json           # Dependencies & scripts
├── tsconfig.json          # TypeScript config
├── tailwind.config.js     # Tailwind CSS config
└── next.config.js        # Next.js config
```

---

## Troubleshooting

### "npm is not recognized"
- Node.js is not installed or not in PATH
- Reinstall Node.js and restart terminal
- Make sure to check "Add to PATH" during installation

### "Port 3000 already in use"
- Another application is using port 3000
- Use a different port: `npm run dev -- -p 3001`
- Then open: `http://localhost:3001`

### "Cannot find module" errors
- Dependencies not installed properly
- Run `npm install` again
- If that doesn't work, delete `node_modules` and `package-lock.json`, then run `npm install`

### Blank page in browser
- Check terminal for error messages
- Open browser console (F12) and check for errors
- Make sure `npm install` completed successfully

### Permission errors (Mac/Linux)
- Run: `chmod +x node_modules/.bin/*`
- Or use `sudo npm install` (not recommended)

---

## Key Features

### ScrollHero Component
- Horizontal scroll animations
- Mirrored text effects
- Scroll-pinned section

### ScrollPhotoGrid Component
- Transitions from scattered to organized layout
- Scroll-synchronized animations
- GPU-accelerated transforms
- Supports 30+ items at 60fps

### Other Components
- Smooth section transitions
- Photo animations with parallax
- Staggered text reveals
- Responsive navigation

---

## Configuration Files

All configuration is ready to go:
- ✅ `package.json` - Dependencies and scripts
- ✅ `tsconfig.json` - TypeScript configuration
- ✅ `tailwind.config.js` - Tailwind CSS setup
- ✅ `next.config.js` - Next.js settings
- ✅ `.gitignore` - Git ignore rules

---

## Next Steps

1. ✅ Project should be running at `http://localhost:3000`
2. Customize images in `app/page.tsx`
3. Modify content in component files
4. Adjust animations in component files

---

## Need Help?

- Check the terminal for error messages
- Check browser console (F12 → Console tab)
- Review component files for configuration options
- All components have inline documentation

---

## Production Build

To create a production build:

```bash
npm run build
npm start
```

This creates an optimized version in the `.next/` folder.

---

**That's it! Your project should now be running on the new machine.** 🎉

