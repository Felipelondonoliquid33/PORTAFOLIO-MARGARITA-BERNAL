# Troubleshooting Guide

## "Not showing anything" - Common Issues

### 1. Dependencies Not Installed
**Problem**: The page is blank because required packages aren't installed.

**Solution**:
```bash
# Make sure you have Node.js installed first
# Then run:
npm install

# Or if using yarn:
yarn install
```

### 2. Development Server Not Running
**Problem**: You need to start the Next.js dev server.

**Solution**:
```bash
npm run dev
# Then open http://localhost:3000 in your browser
```

### 3. TypeScript/Build Errors
**Problem**: TypeScript compilation errors preventing render.

**Solution**:
- Check the terminal for error messages
- Make sure all files are saved
- Try deleting `.next` folder and rebuilding:
  ```bash
  rm -rf .next
  npm run dev
  ```

### 4. Browser Console Errors
**Problem**: JavaScript errors in browser console.

**Solution**:
- Open browser DevTools (F12)
- Check Console tab for errors
- Common issues:
  - Missing dependencies (install with `npm install`)
  - Image loading errors (check network tab)
  - GSAP/ScrollTrigger errors (should have fallbacks now)

### 5. Port Already in Use
**Problem**: Port 3000 is already in use.

**Solution**:
```bash
# Use a different port
npm run dev -- -p 3001
```

### 6. Missing Environment Setup
**Problem**: Next.js needs proper configuration.

**Solution**:
- Make sure `next.config.js` exists
- Verify `package.json` has all dependencies
- Check `tsconfig.json` is properly configured

## Quick Test

To verify the setup works, try this minimal test:

1. **Check if Node.js is installed**:
   ```bash
   node --version
   npm --version
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start dev server**:
   ```bash
   npm run dev
   ```

4. **Open browser**:
   Navigate to `http://localhost:3000`

5. **Check browser console**:
   - Press F12
   - Look for any red errors
   - Check Network tab for failed requests

## Still Not Working?

If the page is still blank:

1. **Check the terminal output** - Next.js shows errors there
2. **Check browser console** - JavaScript errors appear there
3. **Verify file structure** - Make sure all files are in the correct locations
4. **Try a simple test** - Create a basic `app/page.tsx` with just:
   ```tsx
   export default function Home() {
     return <div>Hello World</div>
   }
   ```

If this works, the issue is with the components. If it doesn't, there's a Next.js setup issue.

## Common Error Messages

### "Module not found"
- Run `npm install` to install dependencies

### "Cannot find module '@/components/...'"
- Check `tsconfig.json` has the path alias configured
- Verify files exist in the `components` folder

### "GSAP ScrollTrigger not available"
- This is a warning, not an error
- The page should still work with fallback animations
- Install dependencies: `npm install`

### "Image optimization error"
- Check `next.config.js` has image domains configured
- Verify image URLs are accessible


