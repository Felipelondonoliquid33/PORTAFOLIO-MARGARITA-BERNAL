'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'

interface NavigationProps {
  currentSection: number
}

const sections = ['Home', 'About', 'Proyectos', 'Contacto']

export default function Navigation({ currentSection }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (index: number) => {
    // If not on home page, navigate to home first
    if (pathname !== '/') {
      router.push('/')
      return
    }

    // Special handling for Contact section (index 3)
    if (index === 3) {
      const contactSection = document.getElementById('contact')
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }
    }
    
    const sections = document.querySelectorAll('.section')
    if (sections[index]) {
      sections[index].scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const handleLogoClick = () => {
    if (pathname !== '/') {
      router.push('/')
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/80 backdrop-blur-md py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-2xl font-light tracking-wider cursor-pointer"
            onClick={handleLogoClick}
          >
            MB
          </motion.div>

          <div className="hidden md:flex items-center gap-8">
            {sections.map((section, index) => (
              <motion.button
                key={section}
                onClick={() => scrollToSection(index)}
                className={`relative px-4 py-2 text-sm font-light tracking-wider transition-colors ${
                  currentSection === index
                    ? 'text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {section}
                {currentSection === index && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute bottom-0 left-0 right-0 h-px bg-white"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </motion.nav>
  )
}


