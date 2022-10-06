import {
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  SyntheticEvent,
} from 'react'
import { Autocomplete, Paper, TextField } from '@mui/material'
import { AttractionsInCities } from '../../types'

interface CityFilterProps {
  filteredAttractionsInCities: AttractionsInCities
  setCityFilter: Dispatch<SetStateAction<string | null>>
  cityFilter: string | null
}

const CityFilter = (props: CityFilterProps) => {
  const { filteredAttractionsInCities, setCityFilter, cityFilter } = props

  const [cities, setCities] = useState<string[]>([])

  useEffect(() => {
    if (filteredAttractionsInCities) {
      setCities(
        filteredAttractionsInCities.map(
          (attractionInCity) => attractionInCity.city.formattedName
        )
      )
    }
  }, [filteredAttractionsInCities])

  const handleChange = (
    _event: SyntheticEvent<Element, Event>,
    value: string | null
  ) => {
    setCityFilter(value)
  }

  return (
    <Paper elevation={3}>
      <Autocomplete
        onChange={(event, value) => handleChange(event, value)}
        options={cities}
        value={cityFilter}
        getOptionLabel={(option: string) => option}
        isOptionEqualToValue={(option: string, value: string) =>
          option === value
        }
        renderInput={(params) => (
          <TextField
            {...params}
            label="Filter by city"
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

export default CityFilter
