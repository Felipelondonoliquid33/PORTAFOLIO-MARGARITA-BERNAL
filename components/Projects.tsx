'use client'

import { motion } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import AnimatedPhoto from './AnimatedPhoto'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// Photos for staggered grid at the beginning
const gridPhotos = [
  'https://images.unsplash.com/photo-1502920917128-1aaed7643bd3?w=600&h=800&fit=crop&q=80',
  'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&h=800&fit=crop&q=80',
  'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=600&h=800&fit=crop&q=80',
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=800&fit=crop&q=80',
  'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=600&h=800&fit=crop&q=80',
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=800&fit=crop&q=80',
  'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=600&h=800&fit=crop&q=80',
  'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=600&h=800&fit=crop&q=80',
  'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=600&h=800&fit=crop&q=80',
  'https://images.unsplash.com/photo-1506260408121-e353d10b87c7?w=600&h=800&fit=crop&q=80',
  'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600&h=800&fit=crop&q=80',
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&h=800&fit=crop&q=80',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&h=800&fit=crop&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&h=800&fit=crop&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&h=800&fit=crop&q=80',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&h=800&fit=crop&q=80',
  'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=600&h=800&fit=crop&q=80',
  'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=600&h=800&fit=crop&q=80',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&h=800&fit=crop&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&h=800&fit=crop&q=80',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&h=800&fit=crop&q=80',
]

const projects = [
  {
    title: 'Explorations',
    subtitle: 'Nothing left unseen',
    description: 'The creative process begins with stillness and observation, letting the moment speak before any action is taken.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop&q=80',
  },
  {
    title: 'Unspoken',
    subtitle: 'Love will not save us',
    description: 'Their hearts glow softly, bound by a love so pure. Blissful serenity embraces their world in gentle tones.',
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&h=800&fit=crop&q=80',
  },
  {
    title: 'Opalescent',
    subtitle: 'Moments in motion',
    description: 'Her style is rooted in subtlety and restraint, capturing the delicate balance between light and shadow.',
    image: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=1200&h=800&fit=crop&q=80',
  },
  {
    title: 'Softness',
    subtitle: 'Essence of being',
    description: 'Looking ahead, the work dives deeper into the exploration of intimacy and impermanence.',
    image: 'https://images.unsplash.com/photo-1502920917128-1aaed7643bd3?w=1200&h=800&fit=crop&q=80',
  },
]

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  // Staggered Grid Assembly Animation at the beginning
  useEffect(() => {
    if (!gridRef.current || typeof window === 'undefined') return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      return
    }

    try {
      const ctx = gsap.context(() => {
        if (typeof ScrollTrigger !== 'undefined') {
          const gridItems = gridRef.current?.querySelectorAll('.grid-item')
          if (!gridItems || gridItems.length === 0) return

          // Apply GSAP animation - Staggered Grid Assembly
          gsap.to(gridItems, {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.8,
            stagger: {
              amount: 1.2,
              from: 'start',
            },
            ease: 'power3.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 60%',
              end: 'bottom 20%',
              scrub: 1,
            },
          })
        }
      }, gridRef)

      return () => ctx.revert()
    } catch (error) {
      console.warn('GSAP ScrollTrigger not available')
    }
  }, [])

  return (
    <div
      ref={sectionRef}
      className="relative min-h-screen py-24 px-6 md:px-12 bg-black"
    >
      <div className="max-w-7xl mx-auto">
        {/* Staggered Grid Assembly at the beginning */}
        <div
          ref={gridRef}
          className="grid-stagger mb-32 gap-3 md:gap-4 lg:gap-6"
        >
          {gridPhotos.map((photo, index) => (
            <div key={index} className="grid-item overflow-hidden">
              <img
                src={photo}
                alt={`Artwork ${index + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>

        {/* Header */}
        <motion.div
          className="mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-5xl md:text-7xl font-light mb-6">Projects</h2>
          <p className="text-xl text-gray-400 font-light">
            A collection of visual stories
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              className="project-item group cursor-pointer"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <div className="relative overflow-hidden mb-6">
                <AnimatedPhoto
                  src={project.image}
                  alt={project.title}
                  className="w-full h-[500px] object-cover"
                  parallax
                  hovered={hoveredIndex === index}
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={false}
                />
              </div>

              <h3 className="text-3xl md:text-4xl font-light mb-2">
                {project.title}
              </h3>
              <p className="text-lg text-gray-400 mb-4 font-light">
                {project.subtitle}
              </p>
              <p className="text-base text-gray-300 leading-relaxed font-light">
                {project.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

