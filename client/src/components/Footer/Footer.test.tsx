import { render, screen } from '@testing-library/react'
import Footer from './Footer'

describe('Footer', () => {
  test('renders', () => {
    render(<Footer />)
    expect(screen.getByTestId('github-link')).toBeInTheDocument()
    expect(screen.getByText('Built by')).toBeInTheDocument()
    expect(screen.getByText('Lucas Silbernagel')).toBeInTheDocument()
    expect(
      screen.getByText('City and tourist attraction data provided by')
    ).toBeInTheDocument()
    expect(screen.getByText('Geoapify')).toBeInTheDocument()
  })
})
