'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

interface IntroPageProps {
  onEnter?: () => void
}

export default function IntroPage({ onEnter }: IntroPageProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [isMobile, setIsMobile] = useState(false)

  // Detect mobile device
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMobile(window.innerWidth <= 768)
      
      const handleResize = () => {
        setIsMobile(window.innerWidth <= 768)
      }
      
      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
    }
  }, [])

  // Animated background with particles
  useEffect(() => {
    if (!canvasRef.current || typeof window === 'undefined') return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Particle system
    interface Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      opacity: number
    }

    const particles: Particle[] = []
    const particleCount = isMobile ? 30 : 60

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.2,
      })
    }

    // Animation loop
    let animationId: number
    const animate = () => {
      ctx.fillStyle = 'rgba(122, 115, 100, 1)' // #7a7364
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw and update particles
      particles.forEach((particle) => {
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(229, 231, 235, ${particle.opacity})` // Light gray
        ctx.fill()

        // Update position
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Wrap around screen
        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [isMobile])

  // GSAP animations
  useEffect(() => {
    if (!containerRef.current || !buttonRef.current || typeof window === 'undefined') return

    const ctx = gsap.context(() => {
      // Fade in animation - using fromTo to ensure end state is preserved
      gsap.fromTo('.intro-title', 
        {
          opacity: 0,
          y: -30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: 'power3.out',
          delay: 0.3,
        }
      )

      gsap.fromTo('.intro-subtitle',
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power2.out',
          delay: 0.8,
        }
      )

      if (buttonRef.current) {
        gsap.fromTo(buttonRef.current,
          {
            opacity: 0,
            scale: 0.8,
          },
          {
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: 'back.out(1.7)',
            delay: 1.3,
          }
        )
      }

      gsap.fromTo('.mobile-note',
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
          delay: 1.8,
        }
      )

      // Button hover animation
      const button = buttonRef.current
      if (button) {
        button.addEventListener('mouseenter', () => {
          gsap.to(button, {
            scale: 1.05,
            duration: 0.3,
            ease: 'power2.out',
          })
        })

        button.addEventListener('mouseleave', () => {
          gsap.to(button, {
            scale: 1,
            duration: 0.3,
            ease: 'power2.out',
          })
        })
      }
    }, containerRef)

    return () => ctx.revert()
  }, [])

  const handleEnter = () => {
    // Fade out animation before showing portfolio
    if (containerRef.current) {
      gsap.to(containerRef.current, {
        opacity: 0,
        duration: 0.8,
        ease: 'power2.inOut',
        onComplete: () => {
          if (onEnter) {
            onEnter()
          }
        },
      })
    }
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ backgroundColor: '#7a7364' }}
    >
      {/* Animated background canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 1 }}
      />

      {/* Content */}
      <div className="relative flex flex-col items-center justify-center text-center px-6 md:px-12" style={{ zIndex: 50 }}>
        {/* Main Title */}
        <h1
          className="intro-title adrianna-extended text-white mb-6 md:mb-8"
          style={{
            fontSize: 'clamp(3rem, 10vw, 8rem)',
            fontWeight: 800,
            letterSpacing: '0.05em',
            lineHeight: 0.9,
            textTransform: 'uppercase',
            textShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
            opacity: 1,
          }}
        >
          MARGARITA
          <br />
          BERNAL
        </h1>

        {/* Subtitle */}
        <p
          className="intro-subtitle text-gray-200 mb-12 md:mb-16 uppercase tracking-widest"
          style={{
            fontSize: 'clamp(0.875rem, 1.2vw, 1.25rem)',
            fontWeight: 300,
            letterSpacing: '0.3em',
            opacity: 1,
          }}
        >
          Pintora de sueños
        </p>

        {/* Enter Button */}
        <button
          ref={buttonRef}
          onClick={handleEnter}
          className="adrianna-extended relative group overflow-hidden"
          style={{
            fontSize: 'clamp(1.25rem, 2vw, 2rem)',
            fontWeight: 600,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            padding: '1.5rem 4rem',
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            border: '3px solid rgba(255, 255, 255, 0.9)',
            color: '#ffffff',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            borderRadius: '4px',
            backdropFilter: 'blur(8px)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
            zIndex: 100,
            opacity: 1,
            transform: 'scale(1)',
          }}
        >
          <span className="relative" style={{ zIndex: 10 }}>Entrar</span>
          
          {/* Hover effect background */}
          <div
            className="absolute inset-0 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"
            style={{ zIndex: 0 }}
          />
          
          {/* Text color change on hover */}
          <style jsx>{`
            button:hover span {
              color: #7a7364;
              transition: color 0.5s ease;
            }
          `}</style>
        </button>

        {/* Mobile note - Always visible on mobile screens */}
        <div 
          className="mobile-note mt-12 md:mt-16 flex md:hidden flex-col items-center gap-3 text-white"
          style={{
            opacity: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            padding: '1.5rem 2.5rem',
            borderRadius: '12px',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            maxWidth: '90%',
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-10 h-10"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 3h6"
            />
          </svg>
          <p
            style={{
              fontSize: '1rem',
              fontWeight: 400,
              letterSpacing: '0.05em',
              textAlign: 'center',
              lineHeight: '1.6',
            }}
          >
            Para una mejor experiencia,
            <br />
            <strong style={{ fontSize: '1.1rem' }}>gira tu dispositivo a horizontal</strong>
          </p>
        </div>
      </div>
    </div>
  )
}
