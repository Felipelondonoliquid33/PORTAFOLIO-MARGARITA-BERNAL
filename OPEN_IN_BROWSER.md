# 🌐 Open Your Portfolio in Browser

## Step 1: Install Node.js (Required First!)

Node.js is not installed on your computer. You need to install it to run the project.

### Quick Install:

1. **Download Node.js**: 
   - Go to: https://nodejs.org/
   - Click the **LTS version** (recommended, long-term support)
   - This will download an installer (`.msi` file)

2. **Run the Installer**:
   - Double-click the downloaded file
   - Click "Next" through the installation wizard
   - **IMPORTANT**: Make sure "Add to PATH" is checked (it should be by default)
   - Click "Install"
   - Wait for installation to complete

3. **Restart Your Terminal**:
   - Close this terminal/PowerShell window
   - Open a NEW terminal/PowerShell window
   - This is important so it recognizes Node.js

4. **Verify Installation**:
   - In the new terminal, run:
   ```bash
   node --version
   npm --version
   ```
   - You should see version numbers (like `v20.x.x` and `10.x.x`)

---

## Step 2: Install Project Dependencies

Once Node.js is installed, open terminal in your project folder and run:

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

## ⚠️ Troubleshooting

### "npm is not recognized"
- Node.js is not installed or not in PATH
- Reinstall Node.js and **restart your terminal**
- Make sure to check "Add to PATH" during installation

### "Port 3000 already in use"
- Another app is using port 3000
- Use a different port: `npm run dev -- -p 3001`
- Then open: `http://localhost:3001`

### Blank page in browser
- Check terminal for errors
- Check browser console (Press F12, look at Console tab)
- Make sure `npm install` completed successfully

### "Cannot find module"
- Run `npm install` again
- Delete `node_modules` folder and run `npm install` again

---

## Quick Command Summary

```bash
# 1. Install dependencies (first time only, after Node.js is installed)
npm install

# 2. Start the server
npm run dev

# 3. Open browser to: http://localhost:3000

# 4. To stop server: Press Ctrl+C in terminal
```

