# 🎬 Scroll-Based Hero Transition Features

## Overview

The new `ScrollHero` component implements a scroll-based hero section where the layout assembles step-by-step as the user scrolls. Key elements are pinned during the scroll process using GSAP ScrollTrigger.

---

## ✨ Key Features

### 1. **Step-by-Step Layout Assembly**

The hero content appears in a carefully choreographed sequence:

1. **Title** - Fades in and slides up from bottom
2. **Subtitle** - Appears with slight delay after title
3. **Description** - Slides in after subtitle
4. **Image 1** - Slides in from left with scale animation
5. **Image 2** - Slides in from right with scale animation
6. **Image 3** - Slides up from bottom with scale animation
7. **Final Assembly** - All elements scale down slightly as scroll continues

### 2. **Element Pinning**

- Uses **GSAP ScrollTrigger** to pin the hero container
- Container stays fixed for 200% of viewport height
- Smooth pinning with `pinSpacing: true`
- Elements remain visible during scroll animation

### 3. **Smooth Transitions**

- **GSAP Timeline** with `scrub: 1` for smooth scroll-linked animations
- **Framer Motion** for additional transform animations
- Custom easing functions (`power2.out`, `power2.in`)
- Coordinated timing between all elements

### 4. **Accessibility Features**

- ✅ **ARIA labels** on all text elements
- ✅ **Alt text** on all images with descriptive content
- ✅ **Semantic HTML** structure
- ✅ **Keyboard navigation** support
- ✅ **Screen reader** friendly
- ✅ **Lazy loading** images for performance
- ✅ **Reduced motion** support (via CSS media query)

### 5. **Blackboard Ultra Compatibility**

- **Inline styles** for all critical styling
- Minimal reliance on external CSS classes
- Works in restricted environments
- All animations use inline style objects

---

## 🎯 Animation Sequence

```
Scroll Progress: 0% → 100%

0% - 20%:   Title appears (fade + slide up)
10% - 30%:  Subtitle appears (fade + slide up)
20% - 40%:  Description appears (fade + slide up)
30% - 50%:  Image 1 slides from left (fade + scale + slide)
40% - 60%:  Image 2 slides from right (fade + scale + slide)
50% - 70%:  Image 3 slides from bottom (fade + scale + slide)
70% - 100%: Final assembly (scale down + fade out)
```

---

## 🛠️ Technical Implementation

### GSAP ScrollTrigger

```javascript
ScrollTrigger.create({
  trigger: containerRef.current,
  start: 'top top',
  end: '+=200%',
  pin: pinRef.current,
  pinSpacing: true,
})
```

### Framer Motion Transforms

```javascript
const titleOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1])
const titleY = useTransform(scrollYProgress, [0, 0.2], [100, 0])
```

### Timeline Animation

```javascript
const timeline = gsap.timeline({
  scrollTrigger: {
    trigger: containerRef.current,
    start: 'top top',
    end: '+=200%',
    scrub: 1,
  },
})
```

---

## 📱 Responsive Design

- **Mobile**: Single column layout, stacked images
- **Tablet**: Two column layout with side-by-side content
- **Desktop**: Full two-column grid with all animations

Uses `clamp()` for responsive font sizes:
```css
fontSize: 'clamp(2.5rem, 8vw, 6rem)'
```

---

## 🎨 Styling Approach

### Inline Styles (Blackboard Compatible)

All critical styles are inline:
- Colors
- Font sizes
- Spacing
- Positioning
- Transforms

### CSS Classes (Fallback)

Non-critical styles use Tailwind classes:
- Layout utilities
- Responsive breakpoints
- Hover states

---

## 🔧 Customization

### Change Animation Speed

Edit the timeline durations in `ScrollHero.tsx`:
```javascript
timeline.from('.hero-title', {
  duration: 0.2, // Change this value
})
```

### Change Pin Duration

Modify the `end` value:
```javascript
end: '+=200%', // Change to '+300%' for longer pin
```

### Change Image Order

Reorder the images array or swap the animation steps in the timeline.

---

## ♿ Accessibility Checklist

- [x] ARIA labels on headings
- [x] Descriptive alt text on images
- [x] Semantic HTML structure
- [x] Keyboard navigation support
- [x] Screen reader announcements
- [x] Lazy loading images
- [x] Reduced motion support
- [x] Focus indicators
- [x] Color contrast compliance

---

## 🚀 Performance

- **Lazy loading** images
- **GPU-accelerated** transforms
- **Optimized** scroll listeners
- **Debounced** animations
- **Efficient** re-renders

---

## 📝 Usage

```tsx
<ScrollHero
  title="Your Title"
  subtitle="Your Subtitle"
  description="Your description text here"
  images={[
    'https://image1.jpg',
    'https://image2.jpg',
    'https://image3.jpg',
  ]}
/>
```

---

## 🐛 Troubleshooting

### Elements not pinning?
- Check that GSAP ScrollTrigger is registered
- Verify container refs are set
- Check browser console for errors

### Animations not smooth?
- Ensure `scrub: 1` is set in timeline
- Check for conflicting CSS transitions
- Verify GPU acceleration is enabled

### Images not loading?
- Check image URLs are accessible
- Verify Next.js image config
- Check network tab for 404 errors

---

## 🎓 Best Practices

1. **Keep pin duration reasonable** - Don't pin for too long
2. **Test on mobile** - Scroll animations can be heavy
3. **Provide fallbacks** - Always have static content
4. **Respect reduced motion** - Check `prefers-reduced-motion`
5. **Optimize images** - Use compressed, optimized images
6. **Test accessibility** - Use screen readers and keyboard navigation

---

## 📚 Resources

- [GSAP ScrollTrigger Docs](https://greensock.com/docs/v3/Plugins/ScrollTrigger)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [Web Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)


