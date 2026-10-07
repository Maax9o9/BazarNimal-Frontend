import { FeaturedPetsSection } from '@features/adoptions/user'
import { OfrendaSection } from '@features/posts/user'
import { Hero } from '../components/Hero'
import { StoreBanner } from '../components/StoreBanner'

export function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedPetsSection />
      <StoreBanner />
      <OfrendaSection />
    </>
  )
}
