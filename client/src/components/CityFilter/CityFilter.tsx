import {
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  SyntheticEvent,
} from 'react'
import { Autocomplete, Paper, TextField } from '@mui/material'
import { ICityWithAttractions } from '../../types'

interface CityFilterProps {
  citiesWithAttractions: ICityWithAttractions[]
  setCityFilter: Dispatch<SetStateAction<string>>
}

const CityFilter = (props: CityFilterProps) => {
  const { citiesWithAttractions, setCityFilter } = props

  /** Options for the city filter */
  const [cities, setCities] = useState<string[]>([])

  /** Get options for the city filter from the list of saved cities */
  useEffect(() => {
    if (citiesWithAttractions) {
      setCities(
        citiesWithAttractions.map(
          (cityWithAttractions) => cityWithAttractions.city.formattedName
        )
      )
    }
  }, [citiesWithAttractions])

  const handleChange = (
    _event: SyntheticEvent<Element, Event>,
    value: string | null
  ) => {
    if (value) {
      setCityFilter(value)
    } else {
      setCityFilter('')
    }
  }

  return (
    <Paper elevation={3}>
      <Autocomplete
        data-testid="city-filter"
        onChange={(event, value) => handleChange(event, value)}
        options={cities}
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
