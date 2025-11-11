'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import ScrollHero from '@/components/ScrollHero'
import PhotoGridScroll from '@/components/PhotoGridScroll'
import MasonryFormation from '@/components/MasonryFormation'
import ZoomStack from '@/components/ZoomStack'
import WaveFormation from '@/components/WaveFormation'
import Footer from '@/components/Footer'
import Navigation from '@/components/Navigation'
import { useSectionTransition } from '@/hooks/useSectionTransition'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function PortfolioContent() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { currentSection, setCurrentSection } = useSectionTransition()

  // Simple section tracking for navigation
  useEffect(() => {
    if (!containerRef.current || typeof window === 'undefined') return

    const handleScroll = () => {
      const sections = document.querySelectorAll('.section')
      const scrollPosition = window.scrollY + window.innerHeight / 2

      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect()
        const sectionTop = rect.top + window.scrollY
        const sectionBottom = sectionTop + rect.height

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          setCurrentSection(index)
        }
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [setCurrentSection])

  // Parallax effect for side texts
  useEffect(() => {
    if (typeof window === 'undefined') return

    const parallaxSection = document.getElementById('parallax-text-section')
    const leftText = document.querySelector('.parallax-text-left')
    const rightText = document.querySelector('.parallax-text-right')

    if (!parallaxSection || !leftText || !rightText) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      gsap.set([leftText, rightText], { opacity: 1, x: 0 })
      return
    }

    try {
      const ctx = gsap.context(() => {
        if (typeof ScrollTrigger !== 'undefined') {
          gsap.set(leftText, { x: -400, opacity: 0 })
          gsap.set(rightText, { x: 400, opacity: 0 })

          gsap.to(leftText, {
            opacity: 1,
            x: 0,
            duration: 1.5,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: parallaxSection,
              start: 'top 85%',
              end: 'top 30%',
              scrub: 1.2,
              invalidateOnRefresh: true,
            },
          })

          gsap.to(rightText, {
            opacity: 1,
            x: 0,
            duration: 1.5,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: parallaxSection,
              start: 'top 85%',
              end: 'top 30%',
              scrub: 1.2,
              invalidateOnRefresh: true,
            },
          })

          gsap.to(leftText, {
            y: -150,
            ease: 'none',
            scrollTrigger: {
              trigger: parallaxSection,
              start: 'top top',
              end: 'bottom top',
              scrub: 1.5,
            },
          })

          gsap.to(rightText, {
            y: -150,
            ease: 'none',
            scrollTrigger: {
              trigger: parallaxSection,
              start: 'top top',
              end: 'bottom top',
              scrub: 1.5,
            },
          })

          const zoomStack = parallaxSection.querySelector('.grid-zoom')
          const zoomItems = zoomStack?.querySelectorAll('.grid-item')
          const newTextSection = document.getElementById('new-text-section')

          if (newTextSection) {
            gsap.set(newTextSection, {
              opacity: 0,
              y: 30,
            })
          }

          const masterTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: parallaxSection,
              start: 'bottom 92%',
              end: 'bottom 5%',
              scrub: 3,
              invalidateOnRefresh: true,
            },
          })

          masterTimeline
            .to(leftText, {
              opacity: 0,
              y: -60,
              scale: 0.98,
              ease: 'power1.inOut',
              duration: 1.2,
            }, 0)
            .to(rightText, {
              opacity: 0,
              y: -60,
              scale: 0.98,
              ease: 'power1.inOut',
              duration: 1.2,
            }, 0)
          
          if (zoomItems && zoomItems.length > 0) {
            masterTimeline.to(zoomItems, {
              opacity: 0,
              scale: 0.9,
              y: -50,
              ease: 'power1.inOut',
              duration: 1.5,
            }, 0.3)
          }
          
          if (newTextSection) {
            masterTimeline.to(newTextSection, {
              opacity: 1,
              y: 0,
              ease: 'power2.out',
              duration: 1.2,
            }, 0.8)
          }
        }
      }, containerRef)

      return () => ctx.revert()
    } catch (error) {
      console.warn('GSAP ScrollTrigger not available for parallax')
    }
  }, [containerRef])

  return (
    <div ref={containerRef} className="relative min-h-screen overflow-hidden">
      <div className="fixed inset-0 -z-10 bg-black" />

      <Navigation currentSection={currentSection} />
      
      <main className="relative">
        {/* Hero Section */}
        <section className="section relative bg-black">
          <ScrollHero
            title="MARGARITA BERNAL"
            subtitle="Pintora de sueños"
            description="Welcome to Margarita Bernal's photography portfolio."
            images={[
              'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&q=80',
            ]}
            leftImage="/images/hero-artwork.png"
          />
        </section>

        <div className="h-[50vh] bg-black" />

        {/* Intro Text Section */}
        <section className="section relative bg-black pb-16 md:pb-24 px-6 md:px-12" style={{ marginTop: '0.5rem' }}>
          <div className="max-w-3xl">
            <h3 className="text-sm md:text-base font-medium text-amber-600/80 uppercase tracking-wider mb-6 md:mb-8 text-left" style={{ fontSize: 'clamp(0.75rem, 0.85vw, 0.9375rem)' }}>
              INTRO
            </h3>
            
            <p className="text-gray-300 leading-relaxed font-light text-left text-justify" style={{ fontSize: 'clamp(1rem, 1.15vw, 1.25rem)' }}>
              Sus cuadros no son sueños: son confesiones con la luz torcida. Pinta como quien busca el pulso en la oscuridad, con los dedos manchados de mundos que no existen, pero duelen. Tiene el corazón en el trazo, y el trazo en el desvelo. Cuando el pincel toca el lienzo, se abren las venas del tiempo: brota una mujer con alas rotas, un reloj que sangra, una casa que respira.
            </p>
            <p className="text-gray-300 leading-relaxed font-light text-left text-justify mt-6 md:mt-8" style={{ fontSize: 'clamp(1rem, 1.15vw, 1.25rem)' }}>
              No pinta lo que ve, pinta lo que se le queda atorado en la garganta. Y cada color es una carta que no se atrevió a enviar.
            </p>
          </div>
        </section>

        <div className="h-[50vh] bg-black" />

        {/* Photo Grid Scroll Section */}
        <section className="section relative bg-black pt-32 pb-0" style={{ marginBottom: '0', paddingBottom: '0' }}>
          <PhotoGridScroll />
        </section>

        {/* Second Text Section */}
        <section id="reflection-section" className="section relative bg-black pb-16 md:pb-24 px-6 md:px-12" style={{ marginTop: '0', paddingTop: '1rem' }}>
          <div className="max-w-3xl">
            <h3 className="text-sm md:text-base font-medium text-amber-600/80 uppercase tracking-wider mb-6 md:mb-8 text-left" style={{ fontSize: 'clamp(0.75rem, 0.85vw, 0.9375rem)' }}>
              REFLEXIÓN
            </h3>
            
            <p className="text-gray-300 leading-relaxed font-light text-left text-justify" style={{ fontSize: 'clamp(1rem, 1.15vw, 1.25rem)' }}>
              El cúmulo de sugerencias y estímulos que gravitan en la joven pintora, es depurado sobre una base fecunda en la que se apoyan experiencias y búsquedas originales aferradas a una realidad subjetiva, que se agita en el interior de personajes sin rostro o a veces insinuados que traducen en sus composiciones la presencia de una realidad sensible; mas sintetizados, más alejados de una verdad detallista y episódica, pero como temas inmutables de una verdad absoluta, buscando una libertad pictórica que tiene sus raíces en formas que evocan imágenes y aspectos de la realidad fantásticamente transfiguradas, empeñada en una interpretación visionaria y dramática de la realidad. Esta joven artista entra a formar parte del acerbo cultural de artistas de indudable talento.
            </p>
          </div>
        </section>

        {/* Masonry Formation Section */}
        <section className="section relative bg-black" style={{ marginTop: '0', paddingTop: '0' }}>
          <MasonryFormation />
        </section>

        {/* Dual Text with Zoom Stack Section */}
        <section 
          className="section relative bg-black" 
          style={{ marginTop: '0', paddingTop: '672px', paddingBottom: '4rem', minHeight: '100vh' }}
          id="parallax-text-section"
        >
          <div 
            className="parallax-text-left"
            style={{
              position: 'fixed',
              left: '4%',
              top: '50%',
              transform: 'translateY(-50%)',
              maxWidth: '300px',
              zIndex: 10,
            }}
          >
            <h3 className="text-sm md:text-base font-medium text-white uppercase tracking-wider mb-4 md:mb-6 text-left">
              CONTEXTO
            </h3>
            <p className="text-sm md:text-base text-white leading-relaxed font-light text-left" style={{ lineHeight: '1.6' }}>
              Cada obra es un diálogo íntimo entre la luz y la sombra, donde los colores se convierten en palabras y los trazos en confesiones silenciosas.
            </p>
          </div>

          <div className="w-full flex items-center justify-center" style={{ minHeight: '100vh', position: 'relative', zIndex: 5 }}>
            <div className="animation-container" style={{ width: '100%', maxWidth: '100%' }}>
              <ZoomStack />
            </div>
          </div>

          <div 
            className="parallax-text-right"
            style={{
              position: 'fixed',
              right: '4%',
              top: '50%',
              transform: 'translateY(-50%)',
              maxWidth: '300px',
              zIndex: 10,
            }}
          >
            <h3 className="text-sm md:text-base font-medium text-white uppercase tracking-wider mb-4 md:mb-6 text-right">
              PROCESO
            </h3>
            <p className="text-sm md:text-base text-white leading-relaxed font-light text-right" style={{ lineHeight: '1.6' }}>
              El proceso creativo emerge de la contemplación profunda, donde cada pincelada es meditada y cada color elegido con intención.
            </p>
          </div>
        </section>

        {/* New Text Component */}
        <section 
          className="section relative bg-black" 
          style={{ marginTop: '100px', paddingTop: '2rem', paddingBottom: '4rem', minHeight: '50vh' }}
          id="new-text-section"
        >
          <div className="w-full px-6 md:px-12">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-sm md:text-base font-medium text-amber-600/80 uppercase tracking-wider mb-6 md:mb-8 text-center" style={{ fontSize: 'clamp(0.75rem, 0.85vw, 0.9375rem)' }}>
                VISIÓN
              </h3>
              <p className="text-gray-300 leading-relaxed font-light text-center text-justify" style={{ fontSize: 'clamp(1rem, 1.15vw, 1.25rem)', lineHeight: '1.8' }}>
                La visión artística trasciende la mera representación visual. Cada obra es un portal hacia dimensiones emocionales donde el tiempo se detiene y los sentimientos cobran forma tangible.
              </p>
              <p className="text-gray-300 leading-relaxed font-light text-center text-justify mt-6 md:mt-8" style={{ fontSize: 'clamp(1rem, 1.15vw, 1.25rem)', lineHeight: '1.8' }}>
                Este espacio es una invitación a contemplar, a sentir, a conectar con las historias que cada trazo contiene.
              </p>
            </div>
          </div>
        </section>

        {/* Wave Formation Section */}
        <section className="section relative bg-black" style={{ marginTop: '200px', paddingTop: '0', paddingBottom: '4rem' }}>
          <WaveFormation />
        </section>

        {/* Footer Section */}
        <section className="section relative bg-black" style={{ marginTop: '200px', paddingTop: '0' }}>
          <Footer />
        </section>
      </main>
    </div>
  )
}
