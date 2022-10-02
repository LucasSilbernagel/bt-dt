/* eslint-disable @typescript-eslint/no-explicit-any */
import LocationCityIcon from '@mui/icons-material/LocationCity'
import AttractionsIcon from '@mui/icons-material/Attractions'
import { IAttraction, IAttractionsInCity } from '../../types'

interface MapIconProps {
  popupType: 'city' | 'attraction'
  cityAttraction: IAttractionsInCity
  handleClick: (
    e: any,
    cityAttraction: IAttractionsInCity,
    popupType: 'city' | 'attraction',
    attraction?: IAttraction
  ) => void
  handleMapMarkerKeydown: (
    e: any,
    cityAttraction: IAttractionsInCity,
    popupType: 'city' | 'attraction',
    attraction?: IAttraction
  ) => void
  attraction?: IAttraction
}

const MapIcon = (props: MapIconProps) => {
  const {
    popupType,
    cityAttraction,
    handleClick,
    handleMapMarkerKeydown,
    attraction,
  } = props

  if (attraction) {
    return (
      <AttractionsIcon
        tabIndex={0}
        onClick={(e) => handleClick(e, cityAttraction, popupType, attraction)}
        onKeyDown={(e) =>
          handleMapMarkerKeydown(e, cityAttraction, popupType, attraction)
        }
      />
    )
  } else {
    return (
      <LocationCityIcon
        tabIndex={0}
        onClick={(e) => handleClick(e, cityAttraction, popupType)}
        onKeyDown={(e) => handleMapMarkerKeydown(e, cityAttraction, popupType)}
      />
    )
  }
}

export default MapIcon
