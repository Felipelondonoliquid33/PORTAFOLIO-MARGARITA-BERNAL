'use client'

import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface ScrollHeroProps {
  title: string
  subtitle: string
  description: string
  images: string[]
  leftImage?: string // Imagen opcional para la sección izquierda
}

export default function ScrollHero({
  title,
  subtitle,
  description,
  images,
  leftImage,
}: ScrollHeroProps) {
  const router = useRouter()
  const containerRef = useRef<HTMLDivElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const subtitleRef = useRef<HTMLDivElement>(null)
  const topRightTextRef = useRef<HTMLDivElement>(null)
  const leftImageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current || !pinRef.current || !titleRef.current || typeof window === 'undefined') return

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      return
    }

    // Detect mobile devices
    const isMobile = window.innerWidth <= 768
    const isPortrait = window.innerHeight > window.innerWidth
    const scrubValue = isMobile ? 0.5 : 1 // Faster scrubbing on mobile
    const pinEnd = isMobile ? '+=100%' : '+=150%' // Shorter pin duration on mobile

    try {
      const ctx = gsap.context(() => {
        if (typeof ScrollTrigger !== 'undefined') {
          // Pin the container during scroll - DISABLED on mobile portrait to avoid stuck scroll
          if (!isPortrait) {
            ScrollTrigger.create({
              trigger: containerRef.current,
              start: 'top top',
              end: pinEnd,
              pin: pinRef.current,
              pinSpacing: true,
              anticipatePin: 1,
              pinReparent: true,
            })
          }

          // Hero Title Animation - horizontal scroll effect (moves right as you scroll down)
          gsap.fromTo(
            titleRef.current,
            {
              x: 0, // Start at left
              opacity: 1,
            },
            {
              x: window.innerWidth, // Move completely to the right (off-screen)
              opacity: 0,
              ease: isMobile ? 'power1.out' : 'power2.inOut',
              scrollTrigger: {
                trigger: containerRef.current,
                start: 'top top',
                end: 'bottom top',
                scrub: scrubValue,
                invalidateOnRefresh: true,
              },
            }
          )

          // Subtitle Animation - follows title horizontally
          if (subtitleRef.current) {
            gsap.fromTo(
              subtitleRef.current,
              {
                x: 0,
                opacity: 1,
              },
              {
                x: window.innerWidth * 0.8,
                opacity: 0,
                ease: isMobile ? 'power1.out' : 'power2.inOut',
                scrollTrigger: {
                  trigger: containerRef.current,
                  start: 'top top',
                  end: 'bottom top',
                  scrub: scrubValue,
                  invalidateOnRefresh: true,
                },
              }
            )
          }

          // Top Right Text Animation - horizontal scroll effect (moves left as you scroll down, mirroring the title)
          if (topRightTextRef.current) {
            gsap.fromTo(
              topRightTextRef.current,
              {
                x: 0, // Start at current position (right side)
                opacity: 1,
              },
              {
                x: -window.innerWidth, // Move completely to the left (off-screen)
                opacity: 0,
                ease: 'power2.inOut',
                scrollTrigger: {
                  trigger: containerRef.current,
                  start: 'top top',
                  end: 'bottom top',
                  scrub: 1, // Smoother scrubbing
                  invalidateOnRefresh: true,
                },
              }
            )
          }

          // Left Image Animation - smooth fade in from left with scroll
          if (leftImageRef.current && leftImage) {
            // Initial state: hidden, positioned off-screen to the left
            gsap.set(leftImageRef.current, {
              opacity: 0,
              x: -100, // Start further to the left
              scale: 0.98,
            })

            // Animate: fade in and slide from left as user scrolls
            gsap.to(leftImageRef.current, {
              opacity: 1,
              x: 0,
              scale: 1,
              duration: 1.5,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: containerRef.current,
                start: 'top top',
                end: 'bottom 60%', // Animation completes when hero is 60% scrolled
                scrub: 1.5, // Smooth, slower scrubbing for subtle effect
                invalidateOnRefresh: true,
              },
            })
          }
        }
      }, containerRef)

      return () => ctx.revert()
    } catch (error) {
      console.warn('GSAP ScrollTrigger not available, using fallback animations')
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      style={{
        // Much shorter on mobile portrait to avoid stuck scroll
        minHeight: typeof window !== 'undefined' && window.innerHeight > window.innerWidth 
          ? '100vh'  // Just one viewport height on portrait
          : '250vh', // Normal scroll distance on landscape/desktop
      }}
    >
      {/* Static Background - doesn't move, prevents blinking */}
      <div
        ref={pinRef}
        className="relative w-full min-h-screen flex items-end justify-start"
        style={{
          position: 'sticky',
          top: 0,
          backgroundColor: '#7a7364',
          zIndex: 1,
          isolation: 'isolate', // Creates new stacking context
          willChange: 'auto', // Prevent unnecessary repaints
          overflow: 'visible', // Allow text to extend beyond container
        }}
      >
        {/* Static background - prevents flickering */}
        <div
          className="absolute inset-0"
          style={{
            background: '#7a7364',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        />

        {/* Left Image Section - Large, transparent PNG with smooth fade from left */}
        {leftImage && (
          <div
            ref={leftImageRef}
            className="absolute hidden md:block"
            style={{
              left: '2%', // Closer to the left edge
              top: '50%',
              transform: 'translateY(-50%)',
              width: 'clamp(400px, 50vw, 800px)', // Much larger - takes almost half the hero
              height: 'clamp(500px, 80vh, 1000px)', // Taller to match hero height
              zIndex: 3,
              opacity: 0, // Initial state for animation
              willChange: 'transform, opacity',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
            }}
          >
            <div
              className="relative w-full h-full"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <img
                src={leftImage}
                alt="Hero artwork"
                className="w-full h-full object-contain" // Changed to contain to preserve PNG transparency
                style={{
                  filter: 'drop-shadow(0 4px 20px rgba(0, 0, 0, 0.3))', // Subtle shadow for depth
                }}
                loading="eager"
              />
            </div>
          </div>
        )}

        {/* Top black strip */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '2px',
            backgroundColor: '#000000',
            zIndex: 10,
          }}
        />

        {/* Bottom black strip */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '4px',
            backgroundColor: '#000000',
            zIndex: 10,
          }}
        />

        {/* Animated interactive text - middle right (moves left on scroll) */}
        <div
          ref={topRightTextRef}
          className="absolute right-4 md:right-[6%] top-[70%] md:top-[50%]"
          style={{
            transform: 'translateY(-50%) translateZ(0)', // Vertical centering + GPU acceleration
            zIndex: 5,
            color: '#d1d5db',
            willChange: 'transform, opacity',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
        >
          <div 
            style={{ 
              marginBottom: '1rem',
              // Optimized for 1920x1080p: at 1920px, 1.2vw = 23px (perfect size)
              fontSize: 'clamp(0.875rem, 1.2vw, 1.25rem)', // Optimized for 1920x1080p
              fontWeight: 400,
              letterSpacing: '0.1em',
              lineHeight: 1.4,
              cursor: 'default',
              transition: 'all 0.3s ease',
            }}
            className="hover:text-white hover:scale-105 transition-all duration-300"
          >
            PINTORA DE SUEÑOS
          </div>
          <div 
            style={{ 
              // Optimized for 1920x1080p: at 1920px, 0.9vw = 17.3px (perfect size)
              fontSize: 'clamp(0.75rem, 0.9vw, 1rem)', // Optimized for 1920x1080p
              fontWeight: 300,
              letterSpacing: '0.08em',
              lineHeight: 1.8,
            }}
          >
            <span 
              onClick={() => {
                router.push('/bio')
              }}
              style={{ 
                cursor: 'pointer', 
                opacity: 0.9,
                transition: 'all 0.3s ease',
                padding: '0.25rem 0.5rem',
                borderRadius: '4px',
              }}
              className="hover:text-white hover:opacity-100 hover:bg-white/10 transition-all duration-300"
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.1)'
                e.currentTarget.style.opacity = '1'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)'
                e.currentTarget.style.opacity = '0.9'
              }}
            >
              BIO
            </span>
            <span style={{ margin: '0 0.75rem', opacity: 0.6 }}>-</span>
            <span 
              onClick={() => {
                const reflectionSection = document.getElementById('reflection-section')
                if (reflectionSection) {
                  reflectionSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }
              }}
              style={{ 
                cursor: 'pointer', 
                opacity: 0.9,
                transition: 'all 0.3s ease',
                padding: '0.25rem 0.5rem',
                borderRadius: '4px',
              }}
              className="hover:text-white hover:opacity-100 hover:bg-white/10 transition-all duration-300"
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.1)'
                e.currentTarget.style.opacity = '1'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)'
                e.currentTarget.style.opacity = '0.9'
              }}
            >
              OBRA.
            </span>
            <span style={{ margin: '0 0.75rem', opacity: 0.6 }}>-</span>
            <span 
              onClick={() => {
                const contactSection = document.querySelector('.section:last-of-type')
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }
              }}
              style={{ 
                cursor: 'pointer', 
                opacity: 0.9,
                transition: 'all 0.3s ease',
                padding: '0.25rem 0.5rem',
                borderRadius: '4px',
              }}
              className="hover:text-white hover:opacity-100 hover:bg-white/10 transition-all duration-300"
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.1)'
                e.currentTarget.style.opacity = '1'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)'
                e.currentTarget.style.opacity = '0.9'
              }}
            >
              REDES SOCIALES
            </span>
          </div>
        </div>

        {/* Large Typography - positioned at absolute bottom, horizontal scroll effect */}
        <div
          ref={titleRef}
          className="absolute left-0 bottom-[2%] md:bottom-0 pb-2 md:pb-8 pr-4 md:pr-16"
          style={{
            zIndex: 2,
            pointerEvents: 'none',
            transform: 'translateZ(0)', // GPU acceleration
            willChange: 'transform, opacity',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            overflow: 'visible',
            width: '100%',
          }}
        >
          <h1
            className="adrianna-extended text-[clamp(2rem,6vw,3.5rem)] md:text-[clamp(3rem,8.5vw,10.5rem)]"
            style={{
              fontWeight: 800,
              fontStyle: 'normal',
              color: '#e5e7eb',
              letterSpacing: '0.05em',
              lineHeight: 0.65,
              textTransform: 'uppercase',
              fontFamily: "'Margarita Bernal', 'Adrianna Extended', var(--font-bebas), 'Arial Narrow', 'Helvetica Condensed', 'Impact', 'Futura Condensed', system-ui, -apple-system, sans-serif",
              fontStretch: 'condensed',
              margin: 0,
              padding: '0 1rem',
              textAlign: 'left',
              whiteSpace: 'nowrap',
              overflow: 'visible',
              width: 'auto',
              minWidth: 'fit-content',
            }}
            aria-label={title}
          >
            {title}
          </h1>
        </div>

        {/* Subtitle - positioned higher, more space from title */}
        <div
          ref={subtitleRef}
          className="absolute left-0 bottom-[12%] md:bottom-[25%] pb-1 md:pb-8 pr-2 md:pr-16"
          style={{
            zIndex: 3,
            transform: 'translateZ(0)', // GPU acceleration
            willChange: 'transform, opacity',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            overflow: 'visible',
            width: '100%',
          }}
        >
          <p
            className="text-[clamp(0.7rem,1vw,0.875rem)] md:text-[clamp(0.875rem,1.1vw,1.125rem)] hover:text-white hover:scale-105 transition-all duration-300"
            style={{
              fontWeight: 400,
              color: '#d1d5db',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              margin: 0,
              padding: '0 1rem',
              whiteSpace: 'nowrap',
              transition: 'all 0.3s ease',
              cursor: 'default',
            }}
            aria-label={subtitle}
          >
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  )
}
