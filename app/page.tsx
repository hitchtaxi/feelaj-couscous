import Navbar from '@/components/nav/Navbar'
import Hero from '@/components/hero/Hero'
import CouscousExplosion from '@/components/explosion/CouscousExplosion'
import StorySection from '@/components/story/StorySection'
import MenuSection from '@/components/menu/MenuSection'
import DealsSection from '@/components/deals/DealsSection'
import EventsSection from '@/components/events/EventsSection'
import DrinksSection from '@/components/drinks/DrinksSection'
import ContactSection from '@/components/contact/ContactSection'
import Footer from '@/components/footer/Footer'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <CouscousExplosion />
      <StorySection />
      <MenuSection />
      <DealsSection />
      <EventsSection />
      <DrinksSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
