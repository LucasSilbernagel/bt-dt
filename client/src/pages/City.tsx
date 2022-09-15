import { IAttractionsInCity } from '../types'
import { CircularProgress } from '@mui/material'

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
        <h2>{cityAttraction?.city.formattedName}</h2>
      </>
    )
  }
}

export default City
