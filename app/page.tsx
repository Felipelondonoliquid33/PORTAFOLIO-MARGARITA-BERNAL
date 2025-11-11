'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import IntroPage from '@/components/IntroPage'

const PortfolioContent = dynamic(() => import('@/components/PortfolioContent'), {
  ssr: false,
  loading: () => <div className="w-full h-screen bg-black" />
})

export default function Home() {
  const [showPortfolio, setShowPortfolio] = useState(false)

  if (showPortfolio) {
    return <PortfolioContent />
  }

  return <IntroPage onEnter={() => setShowPortfolio(true)} />
}
