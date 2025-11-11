# 🚀 How to Run the Portfolio in Your Browser

## Step 1: Install Node.js (Required First!)

**Node.js is NOT installed on your computer yet.** You need to install it first.

### Download and Install Node.js:

1. **Go to**: https://nodejs.org/
2. **Download** the **LTS version** (recommended, long-term support)
3. **Run the installer** and follow the setup wizard
4. **IMPORTANT**: Make sure to check "Add to PATH" during installation
5. **Restart your terminal/command prompt** after installation

### Verify Installation:

After installing, open a NEW terminal and run:
```bash
node --version
npm --version
```

You should see version numbers (like v20.x.x and 10.x.x)

---

## Step 2: Install Project Dependencies

Once Node.js is installed, open terminal in this project folder and run:

```bash
npm install
```

**Wait for it to finish** - This downloads all required packages (Next.js, React, Framer Motion, etc.)
- Takes 1-3 minutes
- You'll see lots of text scrolling
- Wait for the prompt to return

---

## Step 3: Start the Development Server

Run this command:

```bash
npm run dev
```

You should see:
```
✓ Ready in X seconds
○ Local:        http://localhost:3000
```

**Keep this terminal window open!** The server needs to keep running.

---

## Step 4: Open in Browser

1. **Open your web browser** (Chrome, Firefox, Edge, etc.)
2. **Type in the address bar**: `http://localhost:3000`
3. **Press Enter**

You should now see your portfolio! 🎉

---

## What You'll See

- Dark background with animated gradients
- "Lennox Montgomery" title
- Navigation bar at the top
- Smooth scrolling sections
- Animated photos and text as you scroll

---

## ⚠️ Important Notes

- **Keep the terminal open** - Closing it stops the server
- **Don't close the browser tab** - Refresh (F5) to see changes
- **To stop the server**: Press `Ctrl + C` in the terminal

---

## 🆘 Troubleshooting

### "npm is not recognized"
- Node.js is not installed or not in PATH
- Reinstall Node.js and restart terminal
- Make sure to check "Add to PATH" during installation

### "Port 3000 already in use"
- Another app is using port 3000
- Use a different port: `npm run dev -- -p 3001`
- Then open: `http://localhost:3001`

### Blank page in browser
- Check terminal for errors
- Check browser console (F12) for errors
- Make sure `npm install` completed successfully

### "Cannot find module"
- Run `npm install` again
- Delete `node_modules` folder and run `npm install` again

---

## Quick Command Summary

```bash
# 1. Install dependencies (first time only)
npm install

# 2. Start the server
npm run dev

# 3. Open browser to: http://localhost:3000

# 4. To stop server: Press Ctrl+C in terminal
```

---

## Need Help?

If you're stuck:
1. Check the terminal for error messages
2. Check browser console (Press F12, look at Console tab)
3. Make sure Node.js is properly installed
4. Try restarting your terminal after installing Node.js


