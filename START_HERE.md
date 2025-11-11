# 🚀 START HERE - Get Your Portfolio Running

## Step 1: Install Node.js (if not already installed)

1. Go to https://nodejs.org/
2. Download and install the LTS version
3. Verify installation:
   ```bash
   node --version
   npm --version
   ```

## Step 2: Install Dependencies

Open your terminal in this project folder and run:

```bash
npm install
```

This will install all required packages (Next.js, React, Framer Motion, GSAP, etc.)

**Wait for it to complete** - this may take 1-2 minutes.

## Step 3: Start the Development Server

```bash
npm run dev
```

You should see:
```
✓ Ready in X seconds
○ Local:        http://localhost:3000
```

## Step 4: Open in Browser

1. Open your web browser
2. Go to: **http://localhost:3000**
3. You should see the portfolio homepage!

## ✅ What You Should See

- Dark background with gradient effects
- "Lennox Montgomery" title
- Navigation bar at the top
- Smooth scrolling sections
- Animated content as you scroll

## ❌ If Nothing Shows

1. **Check the terminal** - Are there any error messages?
2. **Check browser console** - Press F12, look for errors
3. **Verify Node.js** - Run `node --version` to confirm it's installed
4. **Try a different port** - If 3000 is busy:
   ```bash
   npm run dev -- -p 3001
   ```

## 🛠️ Common Issues

### "npm is not recognized"
- Node.js is not installed or not in PATH
- Reinstall Node.js and restart terminal

### "Port 3000 already in use"
- Another app is using port 3000
- Use a different port: `npm run dev -- -p 3001`

### "Module not found"
- Dependencies not installed
- Run `npm install` again

### Blank page
- Check browser console (F12) for errors
- Check terminal for build errors
- Make sure all files are saved

## 📝 Next Steps

Once it's running:
- Customize content in `components/` folder
- Change colors in `app/globals.css`
- Add your own images
- Modify animations in component files

## 🆘 Still Having Issues?

Check `TROUBLESHOOTING.md` for detailed solutions.


