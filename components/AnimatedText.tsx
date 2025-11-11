'use client'

import { motion } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'

interface AnimatedTextProps {
  text: string
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span'
  className?: string
}

export default function AnimatedText({
  text,
  as: Component = 'p',
  className = '',
}: AnimatedTextProps) {
  const ref = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [])

  const words = text.split(' ')

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        delayChildren: 0.1,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  }

  const wordVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  }

  const MotionComponent = Component === 'p' 
    ? motion.p 
    : Component === 'h1' 
    ? motion.h1 
    : Component === 'h2' 
    ? motion.h2 
    : Component === 'h3' 
    ? motion.h3 
    : Component === 'h4' 
    ? motion.h4 
    : motion.div

  return (
    <MotionComponent
      ref={ref as any}
      variants={containerVariants}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
      className={className}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          variants={wordVariants}
          className="inline-block mr-1"
        >
          {word}
        </motion.span>
      ))}
    </MotionComponent>
  )
}

