'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface MasonryFormationProps {
  className?: string
}

export default function MasonryFormation({ className = '' }: MasonryFormationProps) {
  const gridRef = useRef<HTMLDivElement>(null)

  // Use images from PhotoGridScroll (24 photos available)
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
    '/images/photo-10.jpeg',
    '/images/photo-11.jpeg',
    '/images/photo-12.jpeg',
    '/images/photo-13.jpeg',
    '/images/photo-14.jpeg',
    '/images/photo-15.jpeg',
    '/images/photo-16.jpeg',
    '/images/photo-17.jpeg',
    '/images/photo-18.jpeg',
    '/images/photo-19.jpeg',
    '/images/photo-20.jpeg',
    '/images/photo-21.jpeg',
    '/images/photo-22.jpeg',
    '/images/photo-23.jpeg',
    '/images/photo-24.jpeg',
  ]

  // GSAP Animation - Masonry Formation
  useEffect(() => {
    if (!gridRef.current || typeof window === 'undefined') return

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      // Set items to visible state without animation
      const items = gridRef.current.querySelectorAll('.grid-item')
      items.forEach((item) => {
        gsap.set(item, { opacity: 1, scale: 1, rotation: 0 })
      })
      return
    }

    try {
      const ctx = gsap.context(() => {
        if (typeof ScrollTrigger !== 'undefined') {
          const gridItems = gridRef.current?.querySelectorAll('.grid-item')
          if (!gridItems || gridItems.length === 0) return

          // Mobile optimization
          const isMobile = window.innerWidth <= 768
          const initialScale = isMobile ? 0.7 : 0.5
          const initialRotation = isMobile ? 8 : 15
          const initialY = isMobile ? 50 : 80
          const scrubSpeed = isMobile ? 0.8 : 1.5
          const staggerAmount = isMobile ? 1.2 : 2

          // Set initial state
          gsap.set(gridItems, {
            opacity: 0,
            scale: initialScale,
            rotation: initialRotation,
            y: initialY,
          })

          // Animate items into place - smoother and more organic
          gsap.to(gridItems, {
            opacity: 1,
            scale: 1,
            rotation: 0,
            y: 0,
            duration: isMobile ? 0.9 : 1.2,
            stagger: {
              amount: staggerAmount,
              from: 'random',
              ease: 'power2.out',
            },
            ease: isMobile ? 'power2.out' : 'back.out(1.1)',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 75%',
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
    <div className={`relative w-full ${className}`} style={{ marginBottom: '0', paddingBottom: '0' }}>
      <div className="w-full px-6 md:px-12 lg:px-16 pt-4 pb-4 md:pb-6">
        <div
          ref={gridRef}
          className="grid-masonry w-full"
        >
          {photos.slice(0, 12).map((photo, index) => (
            <div
              key={`masonry-${index}`}
              className={`grid-item overflow-hidden ${
                index === 0 || index === 3 || index === 6 || index === 9 ? 'tall-item' : ''
              }`}
            >
              <img
                src={photo}
                alt={`Masonry artwork ${index + 1}`}
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

