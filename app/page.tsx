import Navbar from '@/components/nav/Navbar'
import Hero from '@/components/hero/Hero'
import FoodCarouselSection from '@/components/menu/FoodCarouselSection'
import CouscousExplosion from '@/components/explosion/CouscousExplosion'
import StorySection from '@/components/story/StorySection'
import MenuCycler from '@/components/ui/MenuCycler'
import MenuSection from '@/components/menu/MenuSection'
import DealsSection from '@/components/deals/DealsSection'
import EventsSection from '@/components/events/EventsSection'
import DrinksSection from '@/components/drinks/DrinksSection'
import ContactSection from '@/components/contact/ContactSection'
import Footer from '@/components/footer/Footer'
import ScrollProgress from '@/components/ui/ScrollProgress'

export default function Home() {
  return (
    <main>
      <ScrollProgress />
      <Navbar />
      <Hero />
      <FoodCarouselSection />
      <CouscousExplosion />
      <StorySection />
      <MenuCycler />
      <MenuSection />
      <DealsSection />
      <EventsSection />
      <DrinksSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
