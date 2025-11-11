'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import ThreeDCircle from './ThreeDCircle'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function Footer() {
  const footerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const textRef = useRef<HTMLParagraphElement>(null)
  const contactRef = useRef<HTMLDivElement>(null)
  const cornerTLRef = useRef<HTMLDivElement>(null)
  const cornerTRRef = useRef<HTMLDivElement>(null)
  const cornerBLRef = useRef<HTMLDivElement>(null)
  const cornerBRRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!footerRef.current || typeof window === 'undefined') return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      // Set all elements visible without animation
      if (titleRef.current) gsap.set(titleRef.current, { opacity: 1, y: 0 })
      if (textRef.current) gsap.set(textRef.current, { opacity: 1, y: 0 })
      if (contactRef.current) gsap.set(contactRef.current, { opacity: 1, y: 0 })
      return
    }

    try {
      const ctx = gsap.context(() => {
        if (typeof ScrollTrigger !== 'undefined') {
          // Create master timeline for footer animations
          const masterTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: footerRef.current,
              start: 'top 80%',
              end: 'top 30%',
              scrub: 1.5,
              invalidateOnRefresh: true,
            },
          })

          // Animate corner elements from their respective corners
          if (cornerTLRef.current) {
            gsap.set(cornerTLRef.current, { opacity: 0, x: -100, y: -100, rotation: -45 })
            gsap.to(cornerTLRef.current, {
              opacity: 1,
              x: 0,
              y: 0,
              rotation: 0,
              duration: 1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: footerRef.current,
                start: 'top 85%',
                end: 'top 40%',
                scrub: 1.5,
              },
            })
          }

          if (cornerTRRef.current) {
            gsap.set(cornerTRRef.current, { opacity: 0, x: 100, y: -100, rotation: 45 })
            gsap.to(cornerTRRef.current, {
              opacity: 1,
              x: 0,
              y: 0,
              rotation: 0,
              duration: 1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: footerRef.current,
                start: 'top 85%',
                end: 'top 40%',
                scrub: 1.5,
              },
            })
          }

          if (cornerBLRef.current) {
            gsap.set(cornerBLRef.current, { opacity: 0, x: -100, y: 100, rotation: 45 })
            gsap.to(cornerBLRef.current, {
              opacity: 1,
              x: 0,
              y: 0,
              rotation: 0,
              duration: 1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: footerRef.current,
                start: 'top 85%',
                end: 'top 40%',
                scrub: 1.5,
              },
            })
          }

          if (cornerBRRef.current) {
            gsap.set(cornerBRRef.current, { opacity: 0, x: 100, y: 100, rotation: -45 })
            gsap.to(cornerBRRef.current, {
              opacity: 1,
              x: 0,
              y: 0,
              rotation: 0,
              duration: 1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: footerRef.current,
                start: 'top 85%',
                end: 'top 40%',
                scrub: 1.5,
              },
            })
          }

          // Animate title from bottom
          if (titleRef.current) {
            gsap.set(titleRef.current, { opacity: 0, y: 60 })
            masterTimeline.to(titleRef.current, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power3.out',
            }, 0.2)
          }

          // Animate text from bottom with delay
          if (textRef.current) {
            gsap.set(textRef.current, { opacity: 0, y: 40 })
            masterTimeline.to(textRef.current, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power2.out',
            }, 0.4)
          }

          // Animate contact info from bottom with more delay
          if (contactRef.current) {
            gsap.set(contactRef.current, { opacity: 0, y: 30 })
            masterTimeline.to(contactRef.current, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power2.out',
            }, 0.6)
          }

          // Scale animations for 3D circle containers on hover
          if (cornerTLRef.current) {
            cornerTLRef.current.addEventListener('mouseenter', () => {
              gsap.to(cornerTLRef.current, {
                scale: 1.2,
                duration: 0.3,
                ease: 'power2.out',
              })
            })
            cornerTLRef.current.addEventListener('mouseleave', () => {
              gsap.to(cornerTLRef.current, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out',
              })
            })
          }

          if (cornerTRRef.current) {
            cornerTRRef.current.addEventListener('mouseenter', () => {
              gsap.to(cornerTRRef.current, {
                scale: 1.2,
                duration: 0.3,
                ease: 'power2.out',
              })
            })
            cornerTRRef.current.addEventListener('mouseleave', () => {
              gsap.to(cornerTRRef.current, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out',
              })
            })
          }

          if (cornerBLRef.current) {
            cornerBLRef.current.addEventListener('mouseenter', () => {
              gsap.to(cornerBLRef.current, {
                scale: 1.2,
                duration: 0.3,
                ease: 'power2.out',
              })
            })
            cornerBLRef.current.addEventListener('mouseleave', () => {
              gsap.to(cornerBLRef.current, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out',
              })
            })
          }

          if (cornerBRRef.current) {
            cornerBRRef.current.addEventListener('mouseenter', () => {
              gsap.to(cornerBRRef.current, {
                scale: 1.2,
                duration: 0.3,
                ease: 'power2.out',
              })
            })
            cornerBRRef.current.addEventListener('mouseleave', () => {
              gsap.to(cornerBRRef.current, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out',
              })
            })
          }
        }
      }, footerRef)

      return () => ctx.revert()
    } catch (error) {
      console.warn('GSAP ScrollTrigger not available for footer animations')
    }
  }, [])

  const handleContactClick = () => {
    // Scroll smoothly to top of footer
    if (footerRef.current) {
      footerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <footer
      id="contact"
      ref={footerRef}
      className="relative bg-black min-h-screen flex items-center justify-center py-20 md:py-32 px-6 md:px-12 overflow-hidden"
    >
      {/* 3D Circles - Three.js interactive elements with angelic yellow glow */}
      <div
        ref={cornerTLRef}
        className="absolute top-4 left-4 md:top-8 md:left-8 w-16 h-16 md:w-24 md:h-24 lg:w-28 lg:h-28 opacity-0"
        style={{
          filter: 'drop-shadow(0 0 15px rgba(255, 215, 0, 0.4))',
        }}
      >
        <ThreeDCircle position="top-left" />
      </div>
      <div
        ref={cornerTRRef}
        className="absolute top-4 right-4 md:top-8 md:right-8 w-16 h-16 md:w-24 md:h-24 lg:w-28 lg:h-28 opacity-0"
        style={{
          filter: 'drop-shadow(0 0 15px rgba(255, 215, 0, 0.4))',
        }}
      >
        <ThreeDCircle position="top-right" />
      </div>
      <div
        ref={cornerBLRef}
        className="absolute bottom-4 left-4 md:bottom-8 md:left-8 w-16 h-16 md:w-24 md:h-24 lg:w-28 lg:h-28 opacity-0"
        style={{
          filter: 'drop-shadow(0 0 15px rgba(255, 215, 0, 0.4))',
        }}
      >
        <ThreeDCircle position="bottom-left" />
      </div>
      <div
        ref={cornerBRRef}
        className="absolute bottom-4 right-4 md:bottom-8 md:right-8 w-16 h-16 md:w-24 md:h-24 lg:w-28 lg:h-28 opacity-0"
        style={{
          filter: 'drop-shadow(0 0 15px rgba(255, 215, 0, 0.4))',
        }}
      >
        <ThreeDCircle position="bottom-right" />
      </div>

      {/* Main content */}
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2
          ref={titleRef}
          className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-8 md:mb-12 tracking-wide"
          style={{
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            letterSpacing: '0.1em',
          }}
        >
          Conectemos
        </h2>

        <p
          ref={textRef}
          className="text-lg md:text-xl lg:text-2xl text-gray-300 leading-relaxed font-light mb-12 md:mb-16 max-w-3xl mx-auto"
          style={{
            fontSize: 'clamp(1.125rem, 1.5vw, 1.5rem)',
            lineHeight: '1.8',
          }}
        >
          Cada obra es el inicio de una conversación. Si algo resonó contigo, si buscas una pieza única, o si simplemente quieres dialogar sobre arte y creación, me encantaría escucharte.
        </p>

        <div
          ref={contactRef}
          className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12"
        >
          <a
            href="https://wa.me/573153995353"
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-600/90 hover:text-amber-500 text-xl md:text-2xl font-light transition-all duration-300 hover:scale-105 cursor-pointer"
            style={{
              fontSize: 'clamp(1.125rem, 1.3vw, 1.5rem)',
              letterSpacing: '0.05em',
            }}
            onClick={(e) => {
              e.preventDefault()
              const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
              const whatsappUrl = isMobile 
                ? 'https://wa.me/573153995353'
                : 'https://web.whatsapp.com/send?phone=573153995353'
              window.open(whatsappUrl, '_blank')
            }}
          >
            +57 315 3995353
          </a>

          <span className="hidden md:inline text-amber-600/40 text-xl">•</span>

          <a
            href="https://www.instagram.com/arteremargarita"
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-600/90 hover:text-amber-500 text-xl md:text-2xl font-light transition-all duration-300 hover:scale-105 underline underline-offset-4 decoration-amber-600/50 hover:decoration-amber-500"
            style={{
              fontSize: 'clamp(1.125rem, 1.3vw, 1.5rem)',
              letterSpacing: '0.05em',
            }}
          >
            Instagram
          </a>
        </div>

        {/* Location */}
        <div className="mt-12 md:mt-16">
          <a
            href="https://www.google.com/maps/place/Armenia,+Quindio,+Colombia/@4.5339332,-75.7104178,13z"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-amber-600/90 text-base md:text-lg font-light transition-all duration-300 hover:scale-105"
            style={{
              fontSize: 'clamp(0.875rem, 1vw, 1.125rem)',
              letterSpacing: '0.05em',
            }}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 md:h-6 md:w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" 
              />
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" 
              />
            </svg>
            Armenia, Quindío, Colombia
          </a>
        </div>
      </div>
    </footer>
  )
}

