'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface PhotoGridScrollProps {
  className?: string
}

export default function PhotoGridScroll({ className = '' }: PhotoGridScrollProps) {
  const gridRef = useRef<HTMLDivElement>(null)
  const textOverlayRef = useRef<HTMLDivElement>(null)
  const [hiddenIndices, setHiddenIndices] = useState<Set<number>>(new Set())

  // Randomly hide 2-3 images on mount for aesthetic effect
  useEffect(() => {
    const totalPanels = 24
    const numToHide = Math.floor(Math.random() * 2) + 2 // 2 or 3 images
    const indices = new Set<number>()
    
    // All indices are available (no text panel in grid anymore)
    const availableIndices = Array.from({ length: totalPanels }, (_, i) => i)
    
    while (indices.size < numToHide && indices.size < availableIndices.length) {
      const randomIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)]
      indices.add(randomIndex)
    }
    
    setHiddenIndices(indices)
  }, [])

  // 24 photos from local images folder (for 8 columns x 3 rows grid)
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

  // GSAP Animation - Staggered Grid Assembly
  useEffect(() => {
    if (!gridRef.current || typeof window === 'undefined') return

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      return
    }

    // Mobile optimization
    const isMobile = window.innerWidth <= 768
    const scrubSpeed = isMobile ? 0.3 : 1
    const staggerAmount = isMobile ? 0.6 : 1.2
    const animDuration = isMobile ? 0.5 : 0.8

    try {
      const containerRef = gridRef.current?.parentElement
      const ctx = gsap.context(() => {
        if (typeof ScrollTrigger !== 'undefined') {
          // Get all grid items (excluding hidden ones)
          const gridItems = gridRef.current?.querySelectorAll('.grid-item')
          if (!gridItems || gridItems.length === 0) return

          // Filter out hidden items
          const visibleItems = Array.from(gridItems).filter((item) => {
            return !item.classList.contains('hidden')
          })

          // Apply GSAP animation - Staggered Grid Assembly
          gsap.to(visibleItems, {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: animDuration,
            stagger: {
              amount: staggerAmount,
              from: 'start',
            },
            ease: isMobile ? 'power2.out' : 'power3.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 60%',
              end: 'bottom 20%',
              scrub: scrubSpeed,
            },
          })

          // Animate text overlay
          if (textOverlayRef.current) {
            gsap.set(textOverlayRef.current, { opacity: 0, y: isMobile ? 10 : 20 })
            gsap.to(textOverlayRef.current, {
              opacity: 1,
              y: 0,
              duration: isMobile ? 0.6 : 1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: gridRef.current,
                start: 'top 60%',
                end: 'bottom 20%',
                scrub: scrubSpeed,
              },
            })
          }
        }
      }, containerRef || gridRef)

      return () => ctx.revert()
    } catch (error) {
      console.warn('GSAP ScrollTrigger not available, using fallback animations')
    }
  }, [hiddenIndices])

  // Create grid layout: 3 rows x 8 columns = 24 panels (all photos)
  const createGridItems = () => {
    const items = []

    for (let i = 0; i < 24; i++) {
      // Photo panel
      items.push(
        <div
          key={`photo-${i}`}
          className={`grid-item overflow-hidden ${hiddenIndices.has(i) ? 'hidden' : ''}`}
        >
          <img
            src={photos[i]}
            alt={`Artwork ${i + 1}`}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      )
    }

    return items
  }

  return (
    <div className={`relative w-full ${className}`} style={{ minHeight: '250vh', marginBottom: '0', paddingBottom: '0' }}>
      <div className="sticky top-0 h-screen flex flex-col justify-center items-center py-10 px-0" style={{ marginBottom: '0', paddingBottom: '0' }}>
        <div className="w-full px-0 relative">
          <div
            ref={gridRef}
            className="grid-stagger gap-2 md:gap-3 lg:gap-4 w-full"
            style={{ position: 'relative', zIndex: 1 }}
          >
            {createGridItems()}
          </div>
          {/* Text overlay in the center - higher z-index for mobile */}
          <div 
            ref={textOverlayRef}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{ zIndex: 50 }}
          >
            <div className="flex flex-col items-center justify-center text-center px-6 md:px-12 bg-black/30 md:bg-transparent py-8 md:py-0 rounded-xl md:rounded-none backdrop-blur-sm md:backdrop-blur-none">
              <h3 className="text-4xl md:text-6xl lg:text-7xl font-light text-white mb-3 md:mb-4 drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)] md:drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                Expresión
              </h3>
              <p className="text-xs md:text-sm text-gray-200 uppercase tracking-widest drop-shadow-[0_3px_6px_rgba(0,0,0,0.9)] md:drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                captada en cada momento
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
