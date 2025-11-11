'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import CircularGallery from '@/components/CircularGallery'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function BioPage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!heroRef.current || typeof window === 'undefined') return

    const ctx = gsap.context(() => {
      if (typeof ScrollTrigger !== 'undefined' && imageRef.current) {
        // Parallax effect on hero image
        gsap.to(imageRef.current, {
          y: 200,
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.5,
          },
        })
      }
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      {/* Navigation */}
      <Navigation currentSection={0} />

      {/* Hero Section with Parallax Image */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Background Image with Parallax */}
        <div
          ref={imageRef}
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: 'url(/images/photo-01.jpeg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.4)',
          }}
        />

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="text-6xl md:text-8xl lg:text-9xl font-light text-white mb-6 tracking-wide"
            style={{
              fontSize: 'clamp(3rem, 8vw, 7rem)',
              letterSpacing: '0.1em',
            }}
          >
            Margarita Bernal
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-xl md:text-2xl lg:text-3xl font-light text-gray-300 tracking-wider"
            style={{
              fontSize: 'clamp(1.25rem, 2vw, 2rem)',
              letterSpacing: '0.15em',
            }}
          >
            PINTORA DE SUEÑOS
          </motion.p>
        </div>
      </section>

      {/* Biography Content */}
      <section className="relative bg-black py-24 md:py-32 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-gray-200 leading-loose text-justify mb-10" style={{ fontSize: 'clamp(1.125rem, 1.35vw, 1.5rem)', lineHeight: '2', fontFamily: 'Georgia, "Times New Roman", serif', fontWeight: 300, letterSpacing: '0.02em' }}>
              Nacida en Bogotá en 1949, Margarita Bernal es una artista que ha hecho de la pintura su refugio y voz. A lo largo de su vida, Margarita ha encontrado en los colores y las formas un lenguaje propio para expresar sus emociones, historias y visiones del mundo. Tras graduarse en Arte y Decoración en la Escuela de Artes y Letras, descubrió que su verdadera pasión no era la decoración, sino el acto íntimo y poderoso de pintar.
            </p>

            <p className="text-gray-200 leading-loose text-justify mb-10" style={{ fontSize: 'clamp(1.125rem, 1.35vw, 1.5rem)', lineHeight: '2', fontFamily: 'Georgia, "Times New Roman", serif', fontWeight: 300, letterSpacing: '0.02em' }}>
              Su proceso creativo, influenciado por maestros como Armando Villegas y Jorge Rocha, y por referentes universales como El Bosco, la llevó a explorar composiciones orgánicas llenas de magia y simbolismo. Margarita no solo pinta: transforma el lienzo en paisaje interior donde luz y sombra narran sus días, sus luchas y sus asombros. Sus primeras exposiciones marcaron el inicio de una trayectoria dedicada al arte, recibiendo palabras de aliento y reconocimiento de figuras como el maestro Villegas, quien la animó a seguir trabajando con amor y entrega.
            </p>

            <p className="text-gray-200 leading-loose text-justify mb-10" style={{ fontSize: 'clamp(1.125rem, 1.35vw, 1.5rem)', lineHeight: '2', fontFamily: 'Georgia, "Times New Roman", serif', fontWeight: 300, letterSpacing: '0.02em' }}>
              A través de los años, Margarita ha enseñado pintura y cerámica, compartiendo su talento y sensibilidad con adolescentes y niños, y experimentando en talleres de instituciones y con grandes figuras como Osvaldo Guayasamín. En su obra y su vida, la pintura es más que técnica: es testimonio de resistencia, ternura y búsqueda. Margarita pinta porque, como confiesa, ahí es donde realmente expresa lo que lleva dentro. Cada trazo, cada color, cada línea refleja la profundidad de su espíritu y la originalidad de su visión artística.
            </p>

            <p className="text-gray-100 leading-loose text-justify italic mt-12" style={{ fontSize: 'clamp(1.25rem, 1.5vw, 1.75rem)', lineHeight: '2', fontFamily: 'Georgia, "Times New Roman", serif', fontWeight: 400, letterSpacing: '0.02em' }}>
              Margarita Bernal Saavedra es, ante todo, una mujer que pintando sus días convierte los claroscuros de su existencia en auténticas obras de arte.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Circular Gallery Section */}
      <section className="relative bg-black py-16 md:py-24">
        <div className="w-full h-screen">
          <CircularGallery
            items={[
              { image: '/images/photo-01.jpeg', text: 'Momento I' },
              { image: '/images/photo-02.jpeg', text: 'Momento II' },
              { image: '/images/photo-03.jpeg', text: 'Momento III' },
              { image: '/images/photo-04.jpeg', text: 'Momento IV' },
            ]}
            bend={2}
            textColor="#ffffff"
            borderRadius={0.02}
            font="bold 28px Georgia, serif"
            scrollSpeed={2.5}
            scrollEase={0.08}
          />
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
