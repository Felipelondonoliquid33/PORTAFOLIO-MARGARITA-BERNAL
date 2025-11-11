'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface ZoomStackProps {
  className?: string
}

export default function ZoomStack({ className = '' }: ZoomStackProps) {
  const gridRef = useRef<HTMLDivElement>(null)

  // Use images from available photos
  const photos = [
    '/images/photo-01.jpeg',
    '/images/photo-02.jpeg',
    '/images/photo-03.jpeg',
    '/images/photo-04.jpeg',
    '/images/photo-05.jpeg',
    '/images/photo-06.jpeg',
    '/images/photo-07.jpeg',
    '/images/photo-08.jpeg',
    '/images/photo-09.jpeg',
  ]

  // GSAP Animation - Zoom Stack
  useEffect(() => {
    if (!gridRef.current || typeof window === 'undefined') return

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      // Set items to visible state without animation
      const items = gridRef.current.querySelectorAll('.grid-item')
      items.forEach((item) => {
        gsap.set(item, { opacity: 1, scale: 1 })
      })
      return
    }

    // Mobile optimization
    const isMobile = window.innerWidth <= 768
    const initialScale = isMobile ? 1.8 : 2.5 // Less dramatic zoom on mobile
    const blurAmount = isMobile ? 2 : 4 // Less blur on mobile for better performance
    const scrubSpeed = isMobile ? 0.5 : 1
    const staggerAmount = isMobile ? 0.8 : 1.2

    try {
      const ctx = gsap.context(() => {
        if (typeof ScrollTrigger !== 'undefined') {
          const gridItems = gridRef.current?.querySelectorAll('.grid-item')
          if (!gridItems || gridItems.length === 0) return

          // Set initial state - moderate scale (zoom out effect)
          gsap.set(gridItems, {
            opacity: 0,
            scale: initialScale,
            transformOrigin: 'center center',
            filter: `blur(${blurAmount}px)`,
          })

          // Animate items zooming in from moderate scale to normal size
          gsap.to(gridItems, {
            opacity: 1,
            scale: 1,
            filter: 'blur(0px)',
            duration: isMobile ? 0.7 : 1,
            stagger: {
              amount: staggerAmount,
              from: 'center',
            },
            ease: isMobile ? 'power2.out' : 'power3.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 70%',
              end: 'bottom 10%',
              scrub: scrubSpeed,
              invalidateOnRefresh: true,
            },
          })
        }
      }, gridRef)

      return () => ctx.revert()
    } catch (error) {
      console.warn('GSAP ScrollTrigger not available, using fallback animations')
    }
  }, [])

  return (
    <div className={`relative w-full ${className}`} style={{ width: '100%', maxWidth: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div className="w-full px-4 md:px-6" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <div
          ref={gridRef}
          className="grid-zoom w-full"
          style={{ width: '100%', maxWidth: '100%' }}
        >
          {photos.slice(0, 6).map((photo, index) => (
            <div
              key={`zoom-${index}`}
              className="grid-item overflow-hidden"
            >
              <img
                src={photo}
                alt={`Zoom artwork ${index + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

