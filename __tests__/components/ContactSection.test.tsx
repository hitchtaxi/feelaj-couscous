import { render, screen } from '@testing-library/react'
import ContactSection from '@/components/contact/ContactSection'

describe('ContactSection', () => {
  it('renders WhatsApp order button', () => {
    render(<ContactSection />)
    expect(screen.getByRole('link', { name: /whatsapp/i })).toBeInTheDocument()
  })

  it('renders order window information', () => {
    render(<ContactSection />)
    expect(screen.getByText(/7:00pm/i)).toBeInTheDocument()
  })

  it('renders Sydney delivery copy', () => {
    render(<ContactSection />)
    expect(screen.getByText(/sydney/i)).toBeInTheDocument()
  })
})
