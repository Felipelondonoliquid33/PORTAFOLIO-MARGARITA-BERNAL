'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { CardContainer, CardBody, CardItem } from '@/components/ui/3d-card'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface WaveFormationProps {
  className?: string
}

export default function WaveFormation({ className = '' }: WaveFormationProps) {
  const gridRef = useRef<HTMLDivElement>(null)

  // Use local images from public/images folder
  const photos = Array.from({ length: 24 }, (_, i) => 
    `/images/photo-${String(i + 1).padStart(2, '0')}.jpeg`
  )

  useEffect(() => {
    if (!gridRef.current || typeof window === 'undefined') return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      // Set all items visible without animation
      const items = gridRef.current.querySelectorAll('.grid-item-wrapper')
      items.forEach((item) => {
        gsap.set(item, { opacity: 1, x: 0, y: 0, scale: 1, rotation: 0 })
      })
      return
    }

    // Mobile optimization
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768
    const scrollRange = isMobile ? 2000 : 3500
    const initialDistance = isMobile ? 500 : 800
    const scrubSpeed = isMobile ? 0.5 : 1

    try {
      const ctx = gsap.context(() => {
        if (typeof ScrollTrigger !== 'undefined') {
          const waveItems = gridRef.current?.querySelectorAll('.grid-item-wrapper')
          if (!waveItems || waveItems.length === 0) return

          // Corner convergence animation - items fly in from four corners
          const totalCols = 6 // 6 columns in desktop
          const totalRows = Math.ceil(waveItems.length / totalCols)
          
          waveItems.forEach((item, i) => {
            const col = i % totalCols
            const row = Math.floor(i / totalCols)
            
            // Determine which corner this item should come from
            // Calculate distance from each corner
            const distanceFromTopLeft = Math.sqrt(col * col + row * row)
            const distanceFromTopRight = Math.sqrt((totalCols - 1 - col) * (totalCols - 1 - col) + row * row)
            const distanceFromBottomLeft = Math.sqrt(col * col + (totalRows - 1 - row) * (totalRows - 1 - row))
            const distanceFromBottomRight = Math.sqrt(
              (totalCols - 1 - col) * (totalCols - 1 - col) + 
              (totalRows - 1 - row) * (totalRows - 1 - row)
            )
            
            // Find the closest corner
            const minDistance = Math.min(
              distanceFromTopLeft,
              distanceFromTopRight,
              distanceFromBottomLeft,
              distanceFromBottomRight
            )
            
            // Determine direction based on closest corner
            let startX = 0
            let startY = 0
            let startRotation = 0
            
            if (minDistance === distanceFromTopLeft) {
              startX = -initialDistance
              startY = -initialDistance
              startRotation = -45
            } else if (minDistance === distanceFromTopRight) {
              startX = initialDistance
              startY = -initialDistance
              startRotation = 45
            } else if (minDistance === distanceFromBottomLeft) {
              startX = -initialDistance
              startY = initialDistance
              startRotation = 45
            } else {
              startX = 800
              startY = 800
              startRotation = -45
            }
            
            // Add deterministic variation for more organic feel (based on index)
            const variationSeed = (i * 137.508) % 1 // Golden angle for distribution
            const randomOffset = (variationSeed - 0.5) * 150
            startX += randomOffset
            startY += randomOffset
            startRotation += (variationSeed - 0.5) * 25
            
            // Set initial state - item starts from its corner
            gsap.set(item, {
              opacity: 0,
              x: startX,
              y: startY,
              scale: 0.5,
              rotation: startRotation,
            })
            
            // Create a timeline for this item with three phases: fast grouping, hold, fade out
            const itemTimeline = gsap.timeline({
              scrollTrigger: {
                trigger: gridRef.current,
                start: 'top 90%', // Start earlier so cards have time to group
                end: `+=${scrollRange}`, // Mobile: 2000px, Desktop: 3500px
                scrub: scrubSpeed, // Mobile: 0.5, Desktop: 1
                invalidateOnRefresh: true,
              },
            })
            
            // Phase 1: Fast grouping (0-20% of scroll range) - 2x faster
            // Cards quickly fly in from corners and form the grid
            itemTimeline.to(item, {
              x: 0,
              y: 0,
              opacity: 1,
              scale: 1,
              rotation: 0,
              ease: 'power2.out',
              duration: 0.5, // Fast grouping: ~20% of timeline (700px of 3500px)
            }, 0)
            
            // Phase 2: Hold/Stay visible (20-85% of scroll range) - keep cards visible
            // Cards remain in their grouped position for extended viewing time
            itemTimeline.to(item, {
              // No property changes - just holds the grouped position
              ease: 'none',
              duration: 2.3, // Long hold: ~65% of timeline (2275px of 3500px)
            }, 0.5) // Start immediately after grouping completes
            
            // Phase 3: Fade out (85-100% of scroll range) - smooth exit
            // Cards gracefully fade out as user continues scrolling
            itemTimeline.to(item, {
              opacity: 0,
              scale: 0.92,
              y: -40,
              ease: 'power2.in',
              duration: 0.7, // Smooth fade: ~15% of timeline (525px of 3500px)
            }, 2.8) // Start after hold phase completes
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
      <div className="w-full px-6 md:px-12 lg:px-16 pt-8 pb-8 md:pb-12">
        <div
          ref={gridRef}
          className="grid-corners w-full"
        >
          {photos.slice(0, 12).map((photo, index) => (
            <div key={index} className="grid-item-wrapper">
              <CardContainer containerClassName="w-full h-full">
                <CardBody className="w-full h-full">
                  <CardItem
                    translateZ="50"
                    className="w-full h-full"
                  >
                    <img
                      src={photo}
                      alt={`Corner convergence image ${index + 1}`}
                      loading="lazy"
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </CardItem>
                </CardBody>
              </CardContainer>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

