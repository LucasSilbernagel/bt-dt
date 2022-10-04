import { useLazyQuery } from '@apollo/react-hooks'
import { gql } from '@apollo/client'
import {
  ChangeEvent,
  SyntheticEvent,
  useState,
  useEffect,
  SetStateAction,
  Dispatch,
} from 'react'
import { Autocomplete, Paper, TextField } from '@mui/material'
import { AttractionsInCities, ICity } from '../../types'

const GET_CITIES = gql`
  query getCities($cityName: String!) {
    cities(cityName: $cityName) {
      formattedName
      lon
      lat
      placeId
    }
  }
`

interface OverviewProps {
  setSearchedCity: Dispatch<SetStateAction<ICity | null>>
  filteredAttractionsInCities: AttractionsInCities
}

const Search = (props: OverviewProps) => {
  const { setSearchedCity, filteredAttractionsInCities } = props
  const [dropdownOptions, setDropdownOptions] = useState<ICity[] | []>([])

  const [getCities, { loading, data }] = useLazyQuery(GET_CITIES, {
    variables: { cityName: '' },
  })

  const handleInputChange = (
    _event: ChangeEvent<EventTarget>,
    value: string
  ) => {
    setTimeout(() => {
      if (value && value.length > 2) {
        getCities({ variables: { cityName: value } })
      } else if (filteredAttractionsInCities.length > 0) {
        setDropdownOptions(
          filteredAttractionsInCities.map(
            (attractionInCity) => attractionInCity.city
          )
        )
      } else {
        setDropdownOptions([])
      }
    }, 300)
  }

  useEffect(() => {
    /** Set the Autocomplete options to be unique cities */
    if (data?.cities) {
      setDropdownOptions(
        data.cities.filter(
          (city: ICity, index: number) =>
            data.cities.findIndex(
              (selectedCity: ICity) =>
                selectedCity.formattedName === city.formattedName
            ) === index
        )
      )
    } else if (filteredAttractionsInCities.length > 0) {
      setDropdownOptions(
        filteredAttractionsInCities.map(
          (attractionInCity) => attractionInCity.city
        )
      )
    }
  }, [data, data?.cities, filteredAttractionsInCities])

  /** Save the searched city to state */
  const handleSearch = (
    _e: SyntheticEvent<Element, Event>,
    value: ICity | null
  ) => {
    if (value) {
      setSearchedCity({
        formattedName: value.formattedName,
        lon: value.lon,
        lat: value.lat,
        placeId: value.placeId,
      })
    } else {
      setSearchedCity(null)
    }
  }

  return (
    <Paper elevation={3} sx={{ marginBottom: '1em' }}>
      <Autocomplete
        onInputChange={handleInputChange}
        onChange={handleSearch}
        options={dropdownOptions}
        loading={loading}
        getOptionLabel={(option: ICity) => option.formattedName}
        isOptionEqualToValue={(option: ICity, value: ICity) =>
          option.formattedName === value.formattedName
        }
        renderInput={(params) => (
          <TextField
            {...params}
            label="Add or edit a city"
            variant="outlined"
            placeholder="Type a city name"
            inputProps={{
              ...params.inputProps,
            }}
          />
        )}
      />
    </Paper>
  )
}

export default Search
