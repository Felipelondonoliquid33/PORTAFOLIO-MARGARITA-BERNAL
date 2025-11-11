'use client'

import { motion } from 'framer-motion'
import { useRef } from 'react'
import AnimatedText from './AnimatedText'
import AnimatedPhoto from './AnimatedPhoto'

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null)

  const sections = [
    {
      title: 'Rawness',
      subtitle: 'Captured in every moment',
      content: `Her lens captures the quiet ache of reality, where shadow and light blur the line between seen and felt. Soft, muted tones breathe life into the ordinary, revealing the sensual curves and fragile textures hidden in plain sight. Each image lingers in the tension of what's almost forgotten, where touch and absence coexist.`,
    },
    {
      title: 'Vision',
      subtitle: 'Unveiling the unseen',
      content: `There's no rush, no spectacle—just the raw, intimate beauty of life unfolding in quiet moments. Light grazes skin, shadows hold secrets, and the world feels both distant and deeply near.`,
    },
    {
      title: 'Focus',
      subtitle: 'Where color meets form',
      content: `Her perspective finds depth in stillness, where the unseen speaks. Driven by a strong sense of discipline and dedication, her work ethic reflects a deep commitment to both her craft and personal growth.`,
    },
  ]

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen py-24 px-6 md:px-12 bg-black"
    >
      <div className="max-w-7xl mx-auto">
        {/* Intro Section */}
        <motion.div
          className="mb-32"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <AnimatedText
            as="h2"
            className="text-5xl md:text-7xl font-light mb-6"
            text="About"
          />
        </motion.div>

        {/* Content Sections */}
        <div className="space-y-32">
          {sections.map((section, index) => (
            <motion.div
              key={section.title}
              className="flex flex-col gap-12"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 1,
                delay: index * 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {/* Text content appears first */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 1, delay: index * 0.2, ease: [0.22, 1, 0.36, 1] }}
              >
                <motion.h3
                  className="text-4xl md:text-5xl font-light mb-4"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                  {section.title}
                </motion.h3>
                <motion.p
                  className="text-xl text-gray-400 mb-6 font-light"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                >
                  {section.subtitle}
                </motion.p>
                <AnimatedText
                  as="p"
                  className="text-lg text-gray-300 leading-relaxed font-light"
                  text={section.content}
                />
              </motion.div>

              {/* Image appears smoothly right after text - only for sections that are not Rawness */}
              {index !== 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 40 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ 
                    duration: 1.2, 
                    delay: index * 0.2 + 0.5, // Appears after text
                    ease: [0.22, 1, 0.36, 1] 
                  }}
                >
                  <AnimatedPhoto
                    src={`https://images.unsplash.com/photo-${index === 1 ? '1519681393784-d120267933ba' : '1493246507139-91e8fad9978e'}?w=800&h=1000&fit=crop&q=80`}
                    alt={section.title}
                    className="w-full h-[600px] object-cover"
                    parallax
                  />
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

