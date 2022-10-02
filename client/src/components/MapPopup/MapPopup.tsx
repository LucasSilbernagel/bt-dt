import { Typography } from '@mui/material'
import { Dispatch, SetStateAction } from 'react'
import { Popup } from 'react-map-gl'
import { IPopup } from '../../types'

interface CityMapProps {
  popupInfo: IPopup
  setPopupInfo: Dispatch<SetStateAction<IPopup | null>>
}

const MapPopup = (props: CityMapProps) => {
  const { popupInfo, setPopupInfo } = props

  if (popupInfo.popupType === 'city') {
    return (
      <Popup
        anchor="top"
        longitude={Number(popupInfo.attractionsInCity.city.lon)}
        latitude={Number(popupInfo.attractionsInCity.city.lat)}
        onClose={() => setPopupInfo(null)}
      >
        <Typography sx={{ fontWeight: 'bold' }}>
          {popupInfo.attractionsInCity.city.formattedName}
        </Typography>
        <Typography sx={{ fontWeight: 'bold' }}>
          Attractions visited:{' '}
          <span style={{ fontWeight: 'normal' }}>{`${
            popupInfo.attractionsInCity.attractions.filter(
              (attraction) => attraction.isVisited
            ).length
          }/${popupInfo.attractionsInCity.attractions.length}`}</span>
        </Typography>
      </Popup>
    )
  } else if (popupInfo.popupType === 'attraction' && popupInfo.attraction) {
    return (
      <Popup
        anchor="top"
        longitude={Number(popupInfo.attraction.lon)}
        latitude={Number(popupInfo.attraction.lat)}
        onClose={() => setPopupInfo(null)}
      >
        <Typography sx={{ fontWeight: 'bold' }}>
          {popupInfo.attraction.formattedName}
        </Typography>
        <Typography>
          {popupInfo.attractionsInCity.city.formattedName}
        </Typography>
        <Typography>
          <a
            href={`https://en.wikipedia.org/wiki/${popupInfo.attraction.webLink}`}
            target="_blank"
            rel="noreferrer"
            aria-label={`Wikipedia article about ${popupInfo.attraction.formattedName}`}
          >
            About
          </a>
        </Typography>
        <Typography>
          {popupInfo.attraction.isVisited ? 'Visited' : 'Not visited'}
        </Typography>
      </Popup>
    )
  } else return null
}

export default MapPopup
