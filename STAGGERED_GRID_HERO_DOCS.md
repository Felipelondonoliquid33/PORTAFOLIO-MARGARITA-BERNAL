# 🎬 Staggered Grid and Animated Hero Title Scroll Effect

## Overview

This component implements two interactive scroll-based effects:

1. **Staggered Grid Animation** - A 4x3 grid (12 images) that animates in sequence as you scroll
2. **Hero Title Sticky Exit** - A sticky title at the bottom that animates to the right and fades out on scroll

---

## ✨ Features

### 1. Staggered Grid Animation
- **Grid Layout**: 4 columns × 3 rows (12 images total, customizable)
- **Animation**: Each image fades in, scales up, and slides from below
- **Stagger Delay**: 40-80ms between each cell (adjustable)
- **Scroll Trigger**: Animates when grid enters viewport (80% from top)
- **Smooth Easing**: Power2.out for natural motion

### 2. Hero Title Sticky Exit
- **Sticky Position**: Title stays at bottom of hero section
- **Scroll Animation**: Moves horizontally to the right and fades out
- **Smooth Scrub**: Scroll-linked animation (scrub: true)
- **Responsive**: Adapts to screen width

---

## 📦 Files Created

1. **`components/StaggeredGridHero.tsx`** - React component (Next.js)
2. **`blackboard-standalone.html`** - Standalone HTML for Blackboard Ultra
3. **Integrated into `app/page.tsx`** - Added as a section

---

## 🚀 Usage

### React/Next.js Component

```tsx
import StaggeredGridHero from '@/components/StaggeredGridHero'

<StaggeredGridHero
  title="Lennox Montgomery"
  gridColumns={4}
  gridRows={3}
  imageUrls={[
    'https://image1.jpg',
    'https://image2.jpg',
    // ... 12 images total
  ]}
/>
```

### Standalone HTML (Blackboard Ultra)

Use the `blackboard-standalone.html` file - it's ready to copy/paste into Blackboard Ultra with:
- ✅ All inline styles
- ✅ Embedded JavaScript
- ✅ CDN GSAP libraries
- ✅ No external dependencies
- ✅ Accessibility features

---

## ⚙️ Customization

### Adjust Stagger Timing

In the component or HTML, modify the `stagger.amount`:

```javascript
stagger: {
  amount: 0.8, // Change to 0.4 for faster, 1.2 for slower
  from: 'start',
}
```

### Change Grid Size

```tsx
<StaggeredGridHero
  gridColumns={3}  // Change columns
  gridRows={4}      // Change rows
/>
```

### Adjust Title Exit Speed

Modify the `end` value in ScrollTrigger:

```javascript
scrollTrigger: {
  trigger: '#hero-section',
  start: 'top top',
  end: 'bottom top', // Change to '+=200%' for longer animation
  scrub: true,
}
```

### Change Animation Easing

```javascript
ease: 'power2.out' // Try: 'power1.out', 'power3.out', 'expo.out'
```

---

## 🎨 Styling Options

### Background Color
```css
background: #f7f7f7; /* Change to any color */
```

### Title Styling
```css
font-size: clamp(2rem, 6vw, 4rem);
font-weight: 700;
background: rgba(255, 255, 255, 0.95);
```

### Grid Gap
```css
gap: 1rem; /* Increase for more space between images */
```

### Image Border Radius
```css
border-radius: 12px; /* Change for rounded corners */
```

---

## ♿ Accessibility Features

- ✅ **ARIA labels** on all sections
- ✅ **Semantic HTML** structure
- ✅ **Alt text** on all images
- ✅ **Reduced motion** support
- ✅ **Keyboard navigation** friendly
- ✅ **Screen reader** compatible

---

## 📱 Responsive Design

The grid automatically adapts:
- **Desktop**: 4 columns
- **Tablet**: 2 columns (max-width: 768px)
- **Mobile**: 1 column (max-width: 480px)

---

## 🔧 Technical Details

### GSAP ScrollTrigger
- Uses `scrub: true` for smooth scroll-linked animations
- `anticipatePin: 1` prevents flickering
- `toggleActions: 'play none none none'` ensures one-time animation

### Performance Optimizations
- `will-change: transform, opacity` for GPU acceleration
- `backface-visibility: hidden` for smoother rendering
- Lazy loading images
- Efficient re-renders

### Browser Support
- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support
- Mobile browsers: Full support

---

## 🐛 Troubleshooting

### Images not animating?
- Check that GSAP ScrollTrigger is loaded
- Verify images are loading (check network tab)
- Ensure scroll trigger start point is correct

### Title not moving?
- Check that `scrub: true` is set
- Verify ScrollTrigger is registered
- Check browser console for errors

### Blinking/flickering?
- Add `anticipatePin: 1` to ScrollTrigger
- Ensure `will-change` properties are set
- Check for conflicting CSS transitions

### Grid not responsive?
- Verify CSS grid is supported
- Check media queries are correct
- Test on different screen sizes

---

## 📝 Code Structure

### React Component Structure
```
StaggeredGridHero.tsx
├── State management (images array)
├── useEffect (image generation)
├── useEffect (GSAP animations)
└── JSX (HTML structure)
```

### HTML Structure
```
<section id="hero-section">
  <h1 id="hero-title">Title</h1>
  <div id="image-grid">
    <div class="grid-image">...</div>
  </div>
</section>
```

---

## 🎓 Best Practices

1. **Image Optimization**: Use compressed images (under 500KB)
2. **Stagger Timing**: Keep between 0.4-1.2 seconds total
3. **Grid Size**: Don't exceed 6 columns on desktop
4. **Title Length**: Keep titles under 30 characters for best effect
5. **Performance**: Test on lower-end devices
6. **Accessibility**: Always test with screen readers

---

## 📚 Resources

- [GSAP ScrollTrigger Docs](https://greensock.com/docs/v3/Plugins/ScrollTrigger)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [CSS Grid Guide](https://css-tricks.com/snippets/css/complete-guide-grid/)

---

## ✅ Checklist for Deployment

- [ ] Images optimized and loaded
- [ ] GSAP libraries included (CDN or npm)
- [ ] ScrollTrigger registered
- [ ] Accessibility tested
- [ ] Responsive design verified
- [ ] Performance tested
- [ ] Browser compatibility checked
- [ ] Reduced motion support added

---

## 🎯 Quick Start

1. **For Next.js**: Import and use `<StaggeredGridHero />`
2. **For Blackboard**: Copy `blackboard-standalone.html` content
3. **Customize**: Adjust grid size, timing, and images
4. **Test**: Scroll to see animations
5. **Deploy**: Ready to go!

---

The component is fully functional and ready to use! 🚀


