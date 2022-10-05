import { Dispatch, SetStateAction, SyntheticEvent } from 'react'
import { Autocomplete, Paper, TextField } from '@mui/material'

interface MapLayerSelectProps {
  setMapLayers: Dispatch<SetStateAction<string[] | null>>
}

const MapLayerSelect = (props: MapLayerSelectProps) => {
  const { setMapLayers } = props

  const handleChange = (
    _event: SyntheticEvent<Element, Event>,
    value: string[] | null
  ) => {
    setMapLayers(value)
  }

  return (
    <Paper elevation={3}>
      <Autocomplete
        onChange={(event, value) => handleChange(event, value)}
        options={['Cities', 'Attractions']}
        getOptionLabel={(option: string) => option}
        isOptionEqualToValue={(option: string, value: string) =>
          option === value
        }
        multiple
        defaultValue={['Cities', 'Attractions']}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Map layers"
            variant="outlined"
            inputProps={{
              ...params.inputProps,
            }}
          />
        )}
      />
    </Paper>
  )
}

export default MapLayerSelect
