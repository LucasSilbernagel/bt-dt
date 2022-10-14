import { render, screen, fireEvent } from '@testing-library/react'
import CityFilter from './CityFilter'
import { mockCitiesWithAttractions } from '../../mockData'

describe('CityFilter', () => {
  test('renders', () => {
    const setCityFilter = jest.fn()
    render(
      <CityFilter
        citiesWithAttractions={mockCitiesWithAttractions}
        setCityFilter={setCityFilter}
        cityFilter={''}
      />
    )
    expect(screen.getByTestId('city-filter')).toBeInTheDocument()
    expect(screen.getByLabelText('Filter by city')).toBeInTheDocument()
    expect(screen.getByTestId('ArrowDropDownIcon')).toBeInTheDocument()
    fireEvent.click(screen.getByTestId('ArrowDropDownIcon'))
    expect(screen.getByText('Toronto, ON, Canada')).toBeInTheDocument()
    fireEvent.click(screen.getByText('Toronto, ON, Canada'))
    expect(setCityFilter).toHaveBeenCalled()
  })
})
