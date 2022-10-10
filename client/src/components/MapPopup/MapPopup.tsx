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
        longitude={Number(popupInfo.cityWithAttractions.city.lon)}
        latitude={Number(popupInfo.cityWithAttractions.city.lat)}
        onClose={() => setPopupInfo(null)}
      >
        <Typography sx={{ fontWeight: 'bold', color: 'black' }}>
          {popupInfo.cityWithAttractions.city.formattedName}
        </Typography>
        <Typography sx={{ fontWeight: 'bold', color: 'black' }}>
          Attractions visited:{' '}
          <span style={{ fontWeight: 'normal' }}>{`${
            popupInfo.cityWithAttractions.attractions.filter(
              (attraction) => attraction.isVisited
            ).length
          }/${popupInfo.cityWithAttractions.attractions.length}`}</span>
        </Typography>
        <Typography sx={{ marginTop: '0.5em', color: 'black' }}>
          <Link
            to={`/city/${popupInfo.cityWithAttractions.city.placeId}`}
            aria-label={`edit ${popupInfo.cityWithAttractions.city.formattedName}`}
          >
            <Tooltip arrow title="Edit city">
              <EditIcon sx={{ fontSize: '1.2rem' }} />
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
        <Typography sx={{ fontWeight: 'bold', color: 'black' }}>
          {popupInfo.attraction.formattedName}
        </Typography>
        <Typography sx={{ color: 'black' }}>
          {popupInfo.cityWithAttractions.city.formattedName}
        </Typography>
        <Typography sx={{ color: 'black' }}>
          Visited: {popupInfo.attraction.isVisited ? 'Yes' : 'No'}
        </Typography>
        <Grid container justifyContent="space-evenly" alignItems="center">
          <Grid item sx={{ paddingTop: '7px' }}>
            <Typography>
              <a
                href={popupInfo.attraction.webLink}
                target="_blank"
                rel="noreferrer"
                aria-label={`about ${popupInfo.attraction.formattedName}`}
              >
                <Tooltip arrow title={popupInfo.attraction.webLink}>
                  <InfoIcon sx={{ fontSize: '1.2rem' }} />
                </Tooltip>
              </a>
            </Typography>
          </Grid>
          <Grid item>
            <Typography sx={{ marginTop: '0.5em' }}>
              <Link
                to={`/city/${popupInfo.cityWithAttractions.city.placeId}`}
                aria-label={`edit ${popupInfo.cityWithAttractions.city.formattedName}`}
              >
                <Tooltip arrow title="Edit city">
                  <EditIcon sx={{ fontSize: '1.2rem' }} />
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
