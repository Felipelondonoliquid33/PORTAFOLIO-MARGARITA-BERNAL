'use client'

import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  }

  return (
    <div
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black" />
      
      {/* Animated background elements */}
      <motion.div
        className="absolute inset-0 opacity-20"
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl" />
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center px-6 md:px-12 max-w-4xl mx-auto"
      >
        <motion.h1
          variants={itemVariants}
          className="text-6xl md:text-8xl lg:text-9xl font-light tracking-tight mb-6"
        >
          <span className="block">Margarita</span>
          <span className="block">Bernal</span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-xl md:text-2xl font-light text-gray-400 mb-8 tracking-wide"
        >
          Layout Formation on Scroll
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="text-lg md:text-xl font-light text-gray-500 max-w-2xl mx-auto leading-relaxed"
        >
          <p>
            Welcome to Margarita Bernal&apos;s photography portfolio. In a world
            dominated by speed and constant motion, Margarita Bernal&apos;s
            photography invites you to slow down and immerse yourself in a
            visual experience that touches human fragility.
          </p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const aboutSection = document.querySelector('.section:nth-child(2)')
              aboutSection?.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }}
            className="px-8 py-4 border border-white/30 bg-white/5 backdrop-blur-sm rounded-sm text-sm font-light tracking-wider hover:bg-white/10 hover:border-white/50 transition-all duration-300 relative overflow-hidden group"
          >
            <span className="relative z-10">Explore Work</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
            />
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="w-px h-12 bg-white/30" />
      </motion.div>
    </div>
  )
}

