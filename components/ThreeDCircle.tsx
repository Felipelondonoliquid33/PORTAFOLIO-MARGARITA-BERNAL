'use client'

import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

interface ThreeDCircleProps {
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  className?: string
}

export default function ThreeDCircle({ position, className = '' }: ThreeDCircleProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const circleRef = useRef<THREE.Mesh | null>(null)
  const animationFrameRef = useRef<number | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const previousMouseRef = useRef({ x: 0, y: 0 })
  const rotationSpeedRef = useRef({ x: 0.01, y: 0.01 })
  const isMouseDownRef = useRef(false)
  const geometryRef = useRef<THREE.TorusGeometry | null>(null)
  const materialRef = useRef<THREE.MeshStandardMaterial | null>(null)

  useEffect(() => {
    if (!containerRef.current || typeof window === 'undefined') return

    let scene: THREE.Scene
    let camera: THREE.PerspectiveCamera
    let renderer: THREE.WebGLRenderer
    let circle: THREE.Mesh
    let geometry: THREE.TorusGeometry
    let material: THREE.MeshStandardMaterial
    let glowGeometry: THREE.TorusGeometry | null = null
    let glowMaterial: THREE.MeshStandardMaterial | null = null
    let glowMesh: THREE.Mesh | null = null
    let innerGlowGeometry: THREE.TorusGeometry | null = null
    let innerGlowMaterial: THREE.MeshStandardMaterial | null = null
    let innerGlowMesh: THREE.Mesh | null = null
    let haloLight: THREE.PointLight | null = null
    let glowMeshes: THREE.Mesh[] = []
    let animationFrameId: number

    try {
      // Scene setup
      scene = new THREE.Scene()
      sceneRef.current = scene

      // Get container dimensions
      const width = containerRef.current.clientWidth || 100
      const height = containerRef.current.clientHeight || 100

      // Camera setup
      camera = new THREE.PerspectiveCamera(
        50,
        width / height,
        0.1,
        1000
      )
      camera.position.z = 5
      cameraRef.current = camera

      // Renderer setup
      renderer = new THREE.WebGLRenderer({ 
        alpha: true, 
        antialias: true,
        powerPreference: "high-performance"
      })
      renderer.setSize(width, height)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)) // Limit pixel ratio for performance
      renderer.setClearColor(0x000000, 0) // Transparent background
      containerRef.current.appendChild(renderer.domElement)
      rendererRef.current = renderer

      // Create 3D circle (torus for more interesting 3D shape)
      geometry = new THREE.TorusGeometry(0.8, 0.25, 16, 100)
      geometryRef.current = geometry
      
      // Main material - yellow/golden color, minimal and elegant
      material = new THREE.MeshStandardMaterial({
        color: 0xffd700, // Golden yellow - main color
        metalness: 0.7,
        roughness: 0.3,
        emissive: 0xffd700, // Subtle yellow emissive
        emissiveIntensity: 0.4, // Subtle glow - minimal
        transparent: false,
        opacity: 1,
      })
      materialRef.current = material
      
      circle = new THREE.Mesh(geometry, material)
      // Initial rotation for visual interest
      circle.rotation.x = Math.PI / 4
      circle.rotation.y = Math.PI / 4
      scene.add(circle)
      circleRef.current = circle

      // Create subtle outer glow aura - minimal and elegant
      glowGeometry = new THREE.TorusGeometry(0.92, 0.12, 16, 100)
      glowMaterial = new THREE.MeshStandardMaterial({
        color: 0xffeb3b,
        emissive: 0xffeb3b,
        emissiveIntensity: 0.6, // Subtle glow
        transparent: true,
        opacity: 0.3, // Very transparent for minimalism
        side: THREE.DoubleSide,
      })
      glowMesh = new THREE.Mesh(glowGeometry, glowMaterial)
      glowMesh.rotation.x = Math.PI / 4
      glowMesh.rotation.y = Math.PI / 4
      scene.add(glowMesh)
      
      // Remove inner glow for minimalism - keep it simple
      innerGlowGeometry = null
      innerGlowMaterial = null
      innerGlowMesh = null

      // Add subtle ambient light with yellow tint
      const ambientLight = new THREE.AmbientLight(0xffd700, 0.4)
      scene.add(ambientLight)

      // Add subtle directional light - golden light
      const directionalLight = new THREE.DirectionalLight(0xffd700, 0.8)
      directionalLight.position.set(5, 5, 5)
      scene.add(directionalLight)

      // Add subtle point light for depth
      const pointLight = new THREE.PointLight(0xffd700, 0.6, 100)
      pointLight.position.set(-5, -5, 5)
      scene.add(pointLight)

      // Remove halo light for minimalism
      haloLight = null

      // Store glow meshes for rotation sync - only outer glow
      glowMeshes = glowMesh ? [glowMesh] : []

      // Mouse event handlers
      const handleMouseDown = (e: MouseEvent) => {
        isMouseDownRef.current = true
        setIsDragging(true)
        previousMouseRef.current = {
          x: e.clientX,
          y: e.clientY
        }
      }

      const handleMouseMove = (e: MouseEvent) => {
        if (isMouseDownRef.current && circle) {
          const deltaX = e.clientX - previousMouseRef.current.x
          const deltaY = e.clientY - previousMouseRef.current.y
          
          // Convert pixel movement to rotation
          const rotationX = deltaY * 0.01
          const rotationY = deltaX * 0.01
          
          circle.rotation.x += rotationX
          circle.rotation.y += rotationY
          
          // Sync glow meshes rotation with main circle
          glowMeshes.forEach(glow => {
            glow.rotation.x += rotationX
            glow.rotation.y += rotationY
          })
          
          // Update rotation speed for momentum
          rotationSpeedRef.current.x = rotationX * 0.5
          rotationSpeedRef.current.y = rotationY * 0.5
          
          previousMouseRef.current = {
            x: e.clientX,
            y: e.clientY
          }
        }
      }

      const handleMouseUp = () => {
        isMouseDownRef.current = false
        setIsDragging(false)
      }

      // Touch event handlers for mobile
      const handleTouchStart = (e: TouchEvent) => {
        e.preventDefault()
        if (e.touches.length === 1) {
          isMouseDownRef.current = true
          setIsDragging(true)
          previousMouseRef.current = {
            x: e.touches[0].clientX,
            y: e.touches[0].clientY
          }
        }
      }

      const handleTouchMove = (e: TouchEvent) => {
        e.preventDefault()
        if (isMouseDownRef.current && e.touches.length === 1 && circle) {
          const deltaX = e.touches[0].clientX - previousMouseRef.current.x
          const deltaY = e.touches[0].clientY - previousMouseRef.current.y
          
          const rotationX = deltaY * 0.01
          const rotationY = deltaX * 0.01
          
          circle.rotation.x += rotationX
          circle.rotation.y += rotationY
          
          // Sync glow meshes rotation
          glowMeshes.forEach(glow => {
            glow.rotation.x += rotationX
            glow.rotation.y += rotationY
          })
          
          rotationSpeedRef.current.x = rotationX * 0.5
          rotationSpeedRef.current.y = rotationY * 0.5
          
          previousMouseRef.current = {
            x: e.touches[0].clientX,
            y: e.touches[0].clientY
          }
        }
      }

      const handleTouchEnd = () => {
        isMouseDownRef.current = false
        setIsDragging(false)
      }

      // Add event listeners
      const canvas = renderer.domElement
      canvas.addEventListener('mousedown', handleMouseDown)
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
      canvas.addEventListener('touchstart', handleTouchStart, { passive: false })
      canvas.addEventListener('touchmove', handleTouchMove, { passive: false })
      canvas.addEventListener('touchend', handleTouchEnd)

      // Animation loop
      const animate = () => {
        animationFrameId = requestAnimationFrame(animate)
        
        if (circle && !isMouseDownRef.current) {
          // Continuous rotation when not dragging
          circle.rotation.x += rotationSpeedRef.current.x
          circle.rotation.y += rotationSpeedRef.current.y
          
          // Sync glow meshes rotation
          glowMeshes.forEach(glow => {
            glow.rotation.x += rotationSpeedRef.current.x
            glow.rotation.y += rotationSpeedRef.current.y
          })
          
          // Gradually slow down rotation (momentum decay)
          rotationSpeedRef.current.x *= 0.98
          rotationSpeedRef.current.y *= 0.98
          
          // Add slight continuous rotation
          circle.rotation.x += 0.005
          circle.rotation.y += 0.008
          
          // Sync continuous rotation to glow meshes
          glowMeshes.forEach(glow => {
            glow.rotation.x += 0.005
            glow.rotation.y += 0.008
          })
          
          // Subtle pulsing glow effect - minimal and elegant
          const time = Date.now() * 0.001
          const pulseIntensity = 0.4 + Math.sin(time * 1.5) * 0.1 // Subtle pulse between 0.3 and 0.5
          material.emissiveIntensity = pulseIntensity
          if (glowMaterial) {
            glowMaterial.emissiveIntensity = 0.6 + Math.sin(time * 1.5) * 0.15 // Subtle glow pulse
          }
        }
        
        renderer.render(scene, camera)
      }
      animate()

      // Handle window resize
      const handleResize = () => {
        if (!containerRef.current || !camera || !renderer) return
        
        const width = containerRef.current.clientWidth || 100
        const height = containerRef.current.clientHeight || 100
        
        camera.aspect = width / height
        camera.updateProjectionMatrix()
        renderer.setSize(width, height)
      }
      window.addEventListener('resize', handleResize)

      // Cleanup function
      return () => {
        window.removeEventListener('resize', handleResize)
        canvas.removeEventListener('mousedown', handleMouseDown)
        window.removeEventListener('mousemove', handleMouseMove)
        window.removeEventListener('mouseup', handleMouseUp)
        canvas.removeEventListener('touchstart', handleTouchStart)
        canvas.removeEventListener('touchmove', handleTouchMove)
        canvas.removeEventListener('touchend', handleTouchEnd)
        
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId)
        }
        
        if (containerRef.current && renderer.domElement) {
          try {
            containerRef.current.removeChild(renderer.domElement)
          } catch (e) {
            // Element already removed
          }
        }
        
        // Dispose of Three.js resources
        if (geometry) geometry.dispose()
        if (material) material.dispose()
        if (glowGeometry) glowGeometry.dispose()
        if (glowMaterial) glowMaterial.dispose()
        if (innerGlowGeometry) innerGlowGeometry.dispose()
        if (innerGlowMaterial) innerGlowMaterial.dispose()
        if (renderer) renderer.dispose()
      }

    } catch (error) {
      console.warn('Three.js initialization failed:', error)
      return () => {
        // Cleanup on error
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current)
        }
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className={`${className} ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
      style={{
        width: '100%',
        height: '100%',
        touchAction: 'none',
      }}
    />
  )
}
