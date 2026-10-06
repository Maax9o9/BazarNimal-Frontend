import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { FeaturedPetsSection } from '@features/adoptions/user'
import { OfrendaSection } from '@features/posts/user'
import { Hero } from '../components/Hero'
import { StoreBanner } from '../components/StoreBanner'

export function HomePage() {
  const { hash } = useLocation()

  // Los enlaces del menú apuntan a secciones de esta página (#adopta, #tienda, #ofrenda).
  useEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth' })
  }, [hash])

  return (
    <>
      <Hero />
      <FeaturedPetsSection />
      <StoreBanner />
      <OfrendaSection />
    </>
  )
}
