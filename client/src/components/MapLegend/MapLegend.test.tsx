import { render, screen } from '@testing-library/react'
import MapLegend from './MapLegend'

describe('MapLegend', () => {
  test('renders', () => {
    render(<MapLegend />)
    expect(screen.getByText('Cities')).toBeInTheDocument()
    expect(screen.getByText('Attractions')).toBeInTheDocument()
    expect(screen.getByTestId('all-visited-icon')).toBeInTheDocument()
    expect(screen.getByTestId('some-visited-icon')).toBeInTheDocument()
    expect(screen.getByTestId('none-visited-icon')).toBeInTheDocument()
    expect(screen.getByTestId('visited-icon')).toBeInTheDocument()
    expect(screen.getByTestId('not-visited-icon')).toBeInTheDocument()
  })
})
