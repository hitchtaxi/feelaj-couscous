import { render, screen } from '@testing-library/react'
import MenuCard from '@/components/menu/MenuCard'

const mockItem = {
  id: 'couscous',
  name: 'Tunisian Couscous',
  description: 'Red, harissa-based.',
  badge: 'Our Signature',
  imageQuery: 'tunisian couscous',
}

describe('MenuCard', () => {
  it('renders the item name', () => {
    render(<MenuCard item={mockItem} featured={false} />)
    expect(screen.getByText('Tunisian Couscous')).toBeInTheDocument()
  })

  it('renders the badge when provided', () => {
    render(<MenuCard item={mockItem} featured={false} />)
    expect(screen.getByText('Our Signature')).toBeInTheDocument()
  })

  it('renders the description', () => {
    render(<MenuCard item={mockItem} featured={false} />)
    expect(screen.getByText('Red, harissa-based.')).toBeInTheDocument()
  })
})
