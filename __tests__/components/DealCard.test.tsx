import { render, screen } from '@testing-library/react'
import DealCard from '@/components/deals/DealCard'

const mockDeal = {
  id: 'solo',
  name: 'Solo Meal',
  description: 'The full experience, just for you.',
  price: 22 as number | 'contact',
  includes: ['Couscous', 'Tagine', 'Salata Mishweya', 'Salad'],
  drinks: 1 as number | 'included',
}

describe('DealCard', () => {
  it('renders deal name', () => {
    render(<DealCard deal={mockDeal} />)
    expect(screen.getByText('Solo Meal')).toBeInTheDocument()
  })

  it('renders formatted price', () => {
    render(<DealCard deal={mockDeal} />)
    expect(screen.getByText('$22')).toBeInTheDocument()
  })

  it('renders contact text for contact price', () => {
    render(<DealCard deal={{ ...mockDeal, price: 'contact' }} />)
    expect(screen.getByText(/contact/i)).toBeInTheDocument()
  })

  it('renders all includes', () => {
    render(<DealCard deal={mockDeal} />)
    expect(screen.getByText('Couscous')).toBeInTheDocument()
    expect(screen.getByText('Tagine')).toBeInTheDocument()
  })
})
