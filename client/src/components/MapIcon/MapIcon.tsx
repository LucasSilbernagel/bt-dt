/* eslint-disable @typescript-eslint/no-explicit-any */
import LocationCityIcon from '@mui/icons-material/LocationCity'
import { SetStateAction } from 'react'
import { IAttractionsInCity } from '../../types'

interface MapIconProps {
  cityAttraction: IAttractionsInCity
  handleClick: (
    e: any,
    cityAttraction: SetStateAction<IAttractionsInCity | null>
  ) => void
  handleMapMarkerKeydown: (
    e: any,
    cityAttraction: SetStateAction<IAttractionsInCity | null>
  ) => void
}

const MapIcon = (props: MapIconProps) => {
  const { cityAttraction, handleClick, handleMapMarkerKeydown } = props

  return (
    <LocationCityIcon
      tabIndex={0}
      onClick={(e) => handleClick(e, cityAttraction)}
      onKeyDown={(e) => handleMapMarkerKeydown(e, cityAttraction)}
    />
  )
}

export default MapIcon
