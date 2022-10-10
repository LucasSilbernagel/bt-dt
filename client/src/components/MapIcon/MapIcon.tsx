/* eslint-disable @typescript-eslint/no-explicit-any */
import LocationCityIcon from '@mui/icons-material/LocationCity'
import AttractionsIcon from '@mui/icons-material/Attractions'
import { IAttraction, ICityWithAttractions } from '../../types'

interface MapIconProps {
  popupType: 'city' | 'attraction'
  cityAttraction: ICityWithAttractions
  handleClick: (
    e: any,
    cityAttraction: ICityWithAttractions,
    popupType: 'city' | 'attraction',
    attraction?: IAttraction
  ) => void
  handleMapMarkerKeydown: (
    e: any,
    cityAttraction: ICityWithAttractions,
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

  const getAttractionMarkerColour = (displayedAttraction: IAttraction) =>
    displayedAttraction.isVisited ? '#009E73' : '#E69F00'

  const getCityMarkerColour = (displayedCityAttraction: ICityWithAttractions) => {
    if (
      displayedCityAttraction.attractions.every(
        (attraction) => attraction.isVisited
      )
    ) {
      return '#009E73'
    } else if (
      displayedCityAttraction.attractions.some(
        (attraction) => attraction.isVisited
      )
    ) {
      return '#56B4E9'
    } else {
      return '#E69F00'
    }
  }

  if (attraction) {
    return (
      <AttractionsIcon
        tabIndex={0}
        onClick={(e: any) =>
          handleClick(e, cityAttraction, popupType, attraction)
        }
        onKeyDown={(e: any) =>
          handleMapMarkerKeydown(e, cityAttraction, popupType, attraction)
        }
        sx={{ color: getAttractionMarkerColour(attraction) }}
      />
    )
  } else {
    return (
      <LocationCityIcon
        tabIndex={0}
        onClick={(e: any) => handleClick(e, cityAttraction, popupType)}
        onKeyDown={(e: any) =>
          handleMapMarkerKeydown(e, cityAttraction, popupType)
        }
        sx={{ fontSize: '2.5rem', color: getCityMarkerColour(cityAttraction) }}
      />
    )
  }
}

export default MapIcon
