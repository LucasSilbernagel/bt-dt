import { render, screen, fireEvent } from '@testing-library/react'
import { mockCitiesWithAttractions } from '../../mockData'
import MapIcon from './MapIcon'

describe('MapIcon', () => {
  const handleClick = jest.fn()
  test('renders city icon', () => {
    render(
      <MapIcon
        popupType="city"
        cityWithAttractions={mockCitiesWithAttractions[0]}
        handleClick={handleClick}
        handleMapMarkerKeydown={jest.fn()}
      />
    )
    expect(screen.getByTestId('city-icon')).toBeInTheDocument()
    fireEvent.click(screen.getByTestId('city-icon'))
    expect(handleClick).toHaveBeenCalled()
  })

  test('renders attraction icon', () => {
    const handleMapMarkerKeydown = jest.fn()
    render(
      <MapIcon
        popupType="attraction"
        cityWithAttractions={mockCitiesWithAttractions[0]}
        handleClick={jest.fn()}
        handleMapMarkerKeydown={handleMapMarkerKeydown}
        attraction={mockCitiesWithAttractions[0].attractions[0]}
      />
    )
    expect(screen.getByTestId('attraction-icon')).toBeInTheDocument()
    fireEvent.keyDown(screen.getByTestId('attraction-icon'))
    expect(handleMapMarkerKeydown).toHaveBeenCalled()
  })
})
