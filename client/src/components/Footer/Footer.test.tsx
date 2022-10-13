import { render, screen } from '@testing-library/react'
import Footer from './Footer'

describe('Footer', () => {
  test('renders', () => {
    render(<Footer />)
    expect(screen.getByText('Built by')).toBeInTheDocument()
    expect(screen.getByText('Lucas Silbernagel')).toBeInTheDocument()
  })
})