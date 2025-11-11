'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface AnimatedButtonProps {
  children: ReactNode
  onClick?: () => void
  className?: string
  type?: 'button' | 'submit' | 'reset'
  variant?: 'primary' | 'secondary' | 'outline'
}

export default function AnimatedButton({
  children,
  onClick,
  className = '',
  type = 'button',
  variant = 'primary',
}: AnimatedButtonProps) {
  const baseClasses = 'px-8 py-4 rounded-sm text-sm font-light tracking-wider transition-all duration-300 relative overflow-hidden'
  
  const variantClasses = {
    primary: 'border border-white/30 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-white/50',
    secondary: 'border border-white/20 bg-transparent hover:bg-white/5 hover:border-white/40',
    outline: 'border-2 border-white/50 bg-transparent hover:bg-white/10 hover:border-white',
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <motion.span
        className="relative z-10"
        whileHover={{ x: 2 }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.span>
      
      {/* Hover effect background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0"
        initial={{ x: '-100%' }}
        whileHover={{ x: '100%' }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      />
    </motion.button>
  )
}


