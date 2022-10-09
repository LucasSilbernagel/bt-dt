import { Dispatch, SetStateAction, SyntheticEvent } from 'react'
import { Autocomplete, Paper, TextField } from '@mui/material'
import { DEFAULT_MAP_LAYERS } from '../../constants'

interface MapLayerSelectProps {
  mapLayers: string[]
  setMapLayers: Dispatch<SetStateAction<string[]>>
}

const MapLayerSelect = (props: MapLayerSelectProps) => {
  const { mapLayers, setMapLayers } = props

  const handleChange = (
    _event: SyntheticEvent<Element, Event>,
    value: string[]
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
        value={mapLayers}
        multiple
        filterSelectedOptions
        defaultValue={DEFAULT_MAP_LAYERS}
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
