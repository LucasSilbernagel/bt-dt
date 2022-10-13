import { ApolloProvider } from '@apollo/client'
import { render, screen, fireEvent } from '@testing-library/react'
import { client } from '../../apollo/client'
import { mockCitiesWithAttractions } from '../../mockData'
import Search from './Search'

describe('Search', () => {
  test('renders', () => {
    const setSearchedCity = jest.fn()
    render(
      <ApolloProvider client={client}>
        <Search
          setSearchedCity={setSearchedCity}
          citiesWithAttractions={mockCitiesWithAttractions}
          setCityOptions={jest.fn()}
          cityOptions={[mockCitiesWithAttractions[0].city]}
        />
      </ApolloProvider>
    )
    expect(screen.getByTestId('search-autocomplete')).toBeInTheDocument()
    expect(screen.getByLabelText('Add or edit a city')).toBeInTheDocument()
    expect(screen.getByTestId('ArrowDropDownIcon')).toBeInTheDocument()
    fireEvent.click(screen.getByTestId('ArrowDropDownIcon'))
    expect(screen.getByText('Toronto, ON, Canada')).toBeInTheDocument()
    fireEvent.click(screen.getByText('Toronto, ON, Canada'))
    expect(setSearchedCity).toHaveBeenCalled()
  })
})
