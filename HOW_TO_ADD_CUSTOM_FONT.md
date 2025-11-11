# How to Add Custom Font for Margarita Bernal

## Step 1: Place Your Font Files

1. Copy your custom font files to the `public/fonts/` directory
2. Supported formats (in order of preference):
   - `.woff2` (best - smallest file size)
   - `.woff` (good fallback)
   - `.ttf` (fallback)

**Example file names:**
- `MargaritaBernal-Regular.woff2`
- `MargaritaBernal-Bold.woff2`
- `MargaritaBernal-Italic.woff2`

## Step 2: Add @font-face Declaration

Open `app/globals.css` and add your font declaration after the existing fonts:

```css
/* Margarita Bernal Custom Font */
@font-face {
  font-family: 'Margarita Bernal';
  src: url('/fonts/MargaritaBernal-Regular.woff2') format('woff2'),
       url('/fonts/MargaritaBernal-Regular.woff') format('woff'),
       url('/fonts/MargaritaBernal-Regular.ttf') format('truetype');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

/* Add additional weights/styles as needed */
@font-face {
  font-family: 'Margarita Bernal';
  src: url('/fonts/MargaritaBernal-Bold.woff2') format('woff2'),
       url('/fonts/MargaritaBernal-Bold.woff') format('woff'),
       url('/fonts/MargaritaBernal-Bold.ttf') format('truetype');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}
```

## Step 3: Use the Font in Components

### Option A: Add to Tailwind Config (Recommended)

1. Open `tailwind.config.js`
2. Add to the `fontFamily` section:

```js
fontFamily: {
  sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
  'margarita': ['Margarita Bernal', 'system-ui', 'sans-serif'], // Add this
},
```

3. Use in components:
```jsx
<h1 className="font-margarita">MARGARITA BERNAL</h1>
```

### Option B: Use CSS Class

Add to `app/globals.css`:

```css
.font-margarita {
  font-family: 'Margarita Bernal', system-ui, sans-serif;
}
```

Then use:
```jsx
<h1 className="font-margarita">MARGARITA BERNAL</h1>
```

### Option C: Inline Style

```jsx
<h1 style={{ fontFamily: "'Margarita Bernal', system-ui, sans-serif" }}>
  MARGARITA BERNAL
</h1>
```

## Step 4: Apply to Hero Title

To use it in the ScrollHero component, update `components/ScrollHero.tsx`:

```tsx
<h1
  className="adrianna-extended" // Change this
  style={{
    fontFamily: "'Margarita Bernal', 'Adrianna Extended', system-ui, sans-serif", // Add your font first
    // ... rest of styles
  }}
>
  {title}
</h1>
```

## Quick Checklist

- [ ] Font files placed in `public/fonts/`
- [ ] @font-face declarations added to `app/globals.css`
- [ ] Font applied to desired components
- [ ] Test in browser to verify font loads correctly

## Notes

- Use `.woff2` format when possible (best compression)
- Always include fallback fonts in your font-family stack
- `font-display: swap` ensures text is visible while font loads
- Font files should be optimized (use tools like Font Squirrel's Webfont Generator)

