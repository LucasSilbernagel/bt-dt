import { useLazyQuery } from '@apollo/react-hooks'
import { gql } from '@apollo/client'
import { ChangeEvent, SyntheticEvent, useState, useEffect } from 'react'
import { Autocomplete, TextField } from '@mui/material'
import { ICity } from '../types'

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

const Overview: React.FC = () => {
  const [searchedCity, setSearchedCity] = useState<ICity | null>(null)
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
    }
  }, [data, data?.cities])

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
    }
  }

  return (
    <>
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
            label="City"
            variant="outlined"
            placeholder="Type a city name"
            inputProps={{
              ...params.inputProps,
            }}
          />
        )}
      />
    </>
  )
}

export default Overview
