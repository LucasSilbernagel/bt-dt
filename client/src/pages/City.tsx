import { IAttractionsInCity } from '../types'
import {
  CircularProgress,
  Typography,
  List,
  ListItem,
  Checkbox,
  FormControlLabel,
} from '@mui/material'

interface CityProps {
  cityAttraction?: IAttractionsInCity
  loading: boolean
}

const City = (props: CityProps) => {
  const { cityAttraction, loading } = props
  if (loading) {
    return <CircularProgress size={80} />
  } else {
    return (
      <>
        <Typography variant="h2">
          {cityAttraction?.city.formattedName}
        </Typography>
        <List>
          {cityAttraction?.attractions.map((attraction, index) => {
            return (
              <ListItem key={index}>
                <FormControlLabel
                  control={<Checkbox />}
                  label={attraction.formattedName}
                />
              </ListItem>
            )
          })}
        </List>
      </>
    )
  }
}

export default City
