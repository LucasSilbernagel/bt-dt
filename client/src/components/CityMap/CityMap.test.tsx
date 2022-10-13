import { render, screen } from '@testing-library/react'
import CityMap from './CityMap'
import { DEFAULT_MAP_VIEWPORT } from '../../constants'

describe('CityMap', () => {
  test('renders without attraction data', () => {
    render(
      <CityMap
        citiesWithAttractions={[]}
        cityFilter={''}
        mapLayers={['Cities', 'Attractions']}
        mapViewport={DEFAULT_MAP_VIEWPORT}
        setMapViewport={jest.fn()}
      />
    )
    expect(screen.getByTestId('city-map-container')).toBeInTheDocument()
    expect(screen.getByText('Cities')).toBeInTheDocument()
    expect(screen.getByText('Attractions')).toBeInTheDocument()
    expect(screen.getByTestId('all-visited-icon')).toBeInTheDocument()
    expect(screen.getByTestId('some-visited-icon')).toBeInTheDocument()
    expect(screen.getByTestId('none-visited-icon')).toBeInTheDocument()
    expect(screen.getByTestId('visited-icon')).toBeInTheDocument()
    expect(screen.getByTestId('not-visited-icon')).toBeInTheDocument()
  })
})
