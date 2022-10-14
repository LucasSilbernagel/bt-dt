import { useLazyQuery } from '@apollo/client'
import { gql } from '@apollo/client'
import {
  ChangeEvent,
  SyntheticEvent,
  useEffect,
  SetStateAction,
  Dispatch,
} from 'react'
import { Autocomplete, Paper, TextField } from '@mui/material'
import { ICity, ICityWithAttractions } from '../../types'

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
  citiesWithAttractions: ICityWithAttractions[]
  cityOptions: ICity[]
  setCityOptions: Dispatch<SetStateAction<ICity[]>>
}

const Search = (props: OverviewProps) => {
  const {
    setSearchedCity,
    citiesWithAttractions,
    cityOptions,
    setCityOptions,
  } = props

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
      } else if (citiesWithAttractions.length > 0) {
        setCityOptions(
          citiesWithAttractions.map(
            (cityWithAttractions) => cityWithAttractions.city
          )
        )
      } else {
        setCityOptions([])
      }
    }, 300)
  }

  useEffect(() => {
    /** Set the Autocomplete options from the API to be unique cities */
    if (data?.cities) {
      setCityOptions(
        data.cities.filter(
          (city: ICity, index: number) =>
            data.cities.findIndex(
              (selectedCity: ICity) =>
                selectedCity.formattedName === city.formattedName
            ) === index
        )
      )
      /** If nothing has been searched, set the Autocomplete options to be the saved cities */
    } else if (citiesWithAttractions.length > 0) {
      setCityOptions(
        citiesWithAttractions.map(
          (cityWithAttractions) => cityWithAttractions.city
        )
      )
    }
  }, [data, data?.cities, citiesWithAttractions])

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
        data-testid="search-autocomplete"
        onInputChange={handleInputChange}
        onChange={handleSearch}
        options={cityOptions}
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
