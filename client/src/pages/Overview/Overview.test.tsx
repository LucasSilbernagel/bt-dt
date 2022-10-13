import { render, screen } from '@testing-library/react'
import Overview from './Overview'
import { ApolloProvider } from '@apollo/client'
import { client } from '../../apollo/client'
import { mockCitiesWithAttractions } from '../../mockData'

describe('Overview', () => {
  test('renders without saved data', () => {
    render(
      <ApolloProvider client={client}>
        <Overview
          setSearchedCity={jest.fn()}
          citiesWithAttractions={[]}
          setCitiesWithAttractions={jest.fn()}
        />
      </ApolloProvider>
    )
    expect(screen.getByTestId('search-autocomplete')).toBeInTheDocument()
    expect(screen.getByTestId('city-map-container')).toBeInTheDocument()
    expect(screen.getByText('Cities')).toBeInTheDocument()
    expect(screen.getByText('Attractions')).toBeInTheDocument()
    expect(screen.getByTestId('all-visited-icon')).toBeInTheDocument()
    expect(screen.getByTestId('some-visited-icon')).toBeInTheDocument()
    expect(screen.getByTestId('none-visited-icon')).toBeInTheDocument()
    expect(screen.getByTestId('visited-icon')).toBeInTheDocument()
    expect(screen.getByTestId('not-visited-icon')).toBeInTheDocument()
  })

  test('renders with saved data', () => {
    render(
      <ApolloProvider client={client}>
        <Overview
          setSearchedCity={jest.fn()}
          citiesWithAttractions={mockCitiesWithAttractions}
          setCitiesWithAttractions={jest.fn()}
        />
      </ApolloProvider>
    )
    expect(screen.getByTestId('search-autocomplete')).toBeInTheDocument()
    expect(screen.getByTestId('city-map-container')).toBeInTheDocument()
    expect(screen.getAllByText('Cities')[0]).toBeInTheDocument()
    expect(screen.getAllByText('Attractions')[0]).toBeInTheDocument()
    expect(screen.getByTestId('all-visited-icon')).toBeInTheDocument()
    expect(screen.getByTestId('some-visited-icon')).toBeInTheDocument()
    expect(screen.getByTestId('none-visited-icon')).toBeInTheDocument()
    expect(screen.getByTestId('visited-icon')).toBeInTheDocument()
    expect(screen.getByTestId('not-visited-icon')).toBeInTheDocument()
    expect(screen.getByTestId('city-filter')).toBeInTheDocument()
    expect(screen.getByTestId('map-layer-select')).toBeInTheDocument()
    expect(screen.getAllByText('Cities')[1]).toBeInTheDocument()
    expect(screen.getAllByText('Attractions')[1]).toBeInTheDocument()
    expect(screen.getByTestId('reset-filters-button')).toBeInTheDocument()
    expect(screen.getByTestId('clear-data-button')).toBeInTheDocument()
  })
})
