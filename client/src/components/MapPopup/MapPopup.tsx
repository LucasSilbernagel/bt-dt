import { Typography, Tooltip, Grid } from '@mui/material'
import { Dispatch, SetStateAction } from 'react'
import { Popup } from 'react-map-gl'
import { Link } from 'react-router-dom'
import { IPopup } from '../../types'
import EditIcon from '@mui/icons-material/Edit'
import InfoIcon from '@mui/icons-material/Info'

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
        <Typography sx={{ marginTop: '0.5em' }}>
          <Link to={`/city/${popupInfo.attractionsInCity.city.placeId}`}>
            <Tooltip arrow title="Edit city">
              <EditIcon sx={{ fontSize: '1rem' }} />
            </Tooltip>
          </Link>
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
          Visited: {popupInfo.attraction.isVisited ? 'Yes' : 'No'}
        </Typography>
        <Grid container justifyContent="space-evenly" alignItems="center">
          <Grid item sx={{ paddingTop: '7px' }}>
            <Typography>
              <a
                href={`https://en.wikipedia.org/wiki/${popupInfo.attraction.webLink}`}
                target="_blank"
                rel="noreferrer"
                aria-label={`Wikipedia article about ${popupInfo.attraction.formattedName}`}
              >
                <Tooltip
                  arrow
                  title={`https://en.wikipedia.org/wiki/${popupInfo.attraction.webLink}`}
                >
                  <InfoIcon sx={{ fontSize: '1rem' }} />
                </Tooltip>
              </a>
            </Typography>
          </Grid>
          <Grid item>
            <Typography sx={{ marginTop: '0.5em' }}>
              <Link to={`/city/${popupInfo.attractionsInCity.city.placeId}`}>
                <Tooltip arrow title="Edit city">
                  <EditIcon sx={{ fontSize: '1rem' }} />
                </Tooltip>
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Popup>
    )
  } else return null
}

export default MapPopup
