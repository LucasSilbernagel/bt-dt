import { render, screen, fireEvent } from '@testing-library/react'
import Header from './Header'

describe('Header', () => {
  test('renders', () => {
    const handleThemeChange = jest.fn()
    render(<Header handleThemeChange={handleThemeChange} />)
    expect(screen.getByTestId('theme-toggle')).toBeInTheDocument()
    expect(screen.getByText('Switch to dark theme')).toBeInTheDocument()
    fireEvent.click(screen.getByTestId('theme-toggle'))
    expect(handleThemeChange).toHaveBeenCalled()
    expect(screen.getByText('Been there, done that!')).toBeInTheDocument()
  })
})
