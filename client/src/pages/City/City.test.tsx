import { render, screen, fireEvent } from '@testing-library/react'
import City from './City'
import { BrowserRouter } from 'react-router-dom'
import { mockCitiesWithAttractions } from '../../mockData'

describe('City', () => {
  test('renders without attraction data', () => {
    render(
      <BrowserRouter>
        <City
          loading={false}
          setSearchedCity={jest.fn()}
          citiesWithAttractions={[]}
          setCitiesWithAttractions={jest.fn()}
        />
      </BrowserRouter>
    )
    expect(screen.getByTestId('back-button')).toBeInTheDocument()
    expect(screen.getByTestId('delete-city-button')).toBeInTheDocument()
    expect(screen.getByTestId(`no-data-message`)).toHaveTextContent(
      `Sorry, the Geoapify places API doesn't have any attractions on file for this city! 🙁`
    )
  })

  test('renders loading animation', () => {
    render(
      <BrowserRouter>
        <City
          loading={true}
          setSearchedCity={jest.fn()}
          citiesWithAttractions={[]}
          setCitiesWithAttractions={jest.fn()}
        />
      </BrowserRouter>
    )
    expect(screen.getByTestId('loading-backdrop')).toBeInTheDocument()
  })

  test('renders attraction data', () => {
    const updateCitiesWithAttractions = jest.fn()
    render(
      <BrowserRouter>
        <City
          loading={false}
          setSearchedCity={jest.fn()}
          citiesWithAttractions={[]}
          setCitiesWithAttractions={updateCitiesWithAttractions}
          city={mockCitiesWithAttractions[0]}
        />
      </BrowserRouter>
    )
    expect(screen.getByTestId('back-button')).toBeInTheDocument()
    expect(screen.getByTestId('delete-city-button')).toBeInTheDocument()
    fireEvent.click(screen.getByTestId('delete-city-button'))
    expect(updateCitiesWithAttractions).toHaveBeenCalled()
    expect(screen.getByText('Toronto, ON, Canada')).toBeInTheDocument()
    expect(screen.getAllByTestId('attraction-checkbox')[0]).not.toBeChecked()
    expect(screen.getByText('Mackenzie House')).toBeInTheDocument()
    fireEvent.click(screen.getAllByTestId('attraction-checkbox')[0])
    expect(screen.getAllByTestId('attraction-checkbox')[1]).toBeChecked()
    expect(screen.getAllByTestId('attraction-checkbox')[1]).toBeChecked()
    expect(screen.getByText('Allan Gardens Conservatory')).toBeInTheDocument()
    expect(
      screen.getByLabelText('https://en.wikipedia.org/wiki/en:Mackenzie House')
    ).toBeInTheDocument()
    expect(
      screen.getByLabelText('https://en.wikipedia.org/wiki/en:Allan Gardens')
    ).toBeInTheDocument()
  })
})
