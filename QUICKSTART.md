# Quick Start Guide

## Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Features Overview

### 🎬 Section Transitions
- **Hero Section**: Fade in from center with scale
- **About Section**: Slide in from right with scale
- **Projects Section**: Slide in from left with scale
- **Contact Section**: Fade up with scale

Each transition uses custom cubic-bezier easing for smooth, cinematic motion.

### 📸 Photo Animations
- **Initial**: Scale from 0.9 to 1.0 with fade-in
- **Hover**: Parallax 3D rotation effect or scale/brightness change
- **Staggered**: Photos appear sequentially with timing offsets

### ✍️ Content Reveal
- **Text Blocks**: Slide up and fade in with staggered word animations
- **Headings**: Animated with custom delays
- **Paragraphs**: Word-by-word reveal for dramatic effect

### 🎯 Interactive Elements
- **Navigation**: Active section indicator with smooth transitions
- **Buttons**: Hover effects with scale, shadow, and gradient animations
- **Forms**: Smooth focus transitions with accessibility support

### ♿ Accessibility
- Respects `prefers-reduced-motion` media query
- Keyboard navigation support
- Focus states for all interactive elements
- Semantic HTML structure

## Customization

### Changing Animation Speeds
Edit the transition durations in:
- `app/page.tsx` - Section variants
- `components/AnimatedPhoto.tsx` - Photo animations
- `components/AnimatedText.tsx` - Text animations

### Adjusting Colors
Modify the color scheme in:
- `app/globals.css` - CSS variables
- `tailwind.config.js` - Theme colors

### Adding New Sections
1. Create a new component in `components/`
2. Import and add to `app/page.tsx`
3. Add a new variant in `getSectionVariants()`
4. Update navigation in `components/Navigation.tsx`

## Performance Tips

- Images are optimized with Next.js Image component
- Animations use GPU-accelerated transforms
- Scroll triggers are optimized with GSAP ScrollTrigger
- Reduced motion support for better performance on low-end devices

## Browser Support

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support (may need vendor prefixes for some animations)

## Troubleshooting

### Animations not working?
- Check browser console for errors
- Ensure all dependencies are installed
- Verify GSAP ScrollTrigger is registered

### Images not loading?
- Check image URLs are accessible
- Verify Next.js image configuration
- Check network tab for 404 errors

### Performance issues?
- Enable reduced motion in system settings
- Check for too many simultaneous animations
- Consider reducing animation complexity on mobile


