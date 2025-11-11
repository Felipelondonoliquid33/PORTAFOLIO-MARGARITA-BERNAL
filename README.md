# Portfolio Homepage - Visual Storytelling Experience

A visually stunning portfolio homepage with smooth section transitions, photo animations, and interactive storytelling elements.

## Features

- **Smooth Section Transitions**: Fade, slide, and scale animations between sections using Framer Motion
- **Scroll-Pinned Hero**: Horizontal scroll animations with mirrored text effects
- **Layout Formation Grid**: Scroll-animated photo grid that transitions from scattered to organized layout
- **Photo Animations**: Scale-up, fade-in effects with parallax hover interactions
- **Content Reveal**: Staggered text animations with slide-up and fade-in effects
- **Smooth Scrolling**: CSS scroll-behavior with GSAP ScrollTrigger integration
- **Responsive Design**: Fully responsive layout that works on all devices
- **Accessibility**: Respects `prefers-reduced-motion` for users who prefer reduced animations

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Framer Motion** - Primary animation library
- **GSAP** - Advanced scroll-triggered animations
- **Tailwind CSS** - Utility-first CSS framework

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Main page with section transitions
│   └── globals.css         # Global styles
├── components/
│   ├── Hero.tsx            # Hero section
│   ├── ScrollHero.tsx      # Scroll-pinned hero with horizontal animations
│   ├── About.tsx           # About section
│   ├── ScrollPhotoGrid.tsx # Scroll-animated photo grid (layout formation)
│   ├── Projects.tsx        # Projects section
│   ├── Contact.tsx         # Contact form
│   ├── Navigation.tsx      # Navigation bar
│   ├── AnimatedText.tsx    # Text animation component
│   └── AnimatedPhoto.tsx   # Photo animation component
└── hooks/
    └── useSectionTransition.ts  # Section tracking hook
```

## Animation Details

### Section Transitions
- Each section uses Framer Motion variants for enter/exit animations
- Combined fade, slide, and scale effects
- Custom cubic-bezier easing for smooth motion

### Photo Animations
- Initial: Scale from 0.9 to 1 with fade-in
- Hover: Parallax effect with 3D rotation or scale/brightness change
- Staggered entrance animations for sequential appearance

### Content Reveal
- Text blocks animate with slide-up and fade-in
- Staggered delays for each word/line
- Intersection Observer triggers animations on scroll

## Accessibility

- Respects `prefers-reduced-motion` media query
- Semantic HTML structure
- Keyboard navigation support
- Focus states for interactive elements

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT


