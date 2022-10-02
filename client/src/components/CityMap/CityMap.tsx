import { Grid } from '@mui/material'
import { SetStateAction, useEffect, useRef, useState } from 'react'
import Map, { MapboxEvent, Marker, Popup } from 'react-map-gl'
import { AttractionsInCities, IAttractionsInCity } from '../../types'
import MapIcon from '../MapIcon/MapIcon'

interface CityMapProps {
  attractionsInCities: AttractionsInCities
}

const CityMap = (props: CityMapProps) => {
  const { attractionsInCities } = props

  const containerRef = useRef<HTMLDivElement>(null)

  const [height, setHeight] = useState(0)
  const [width, setWidth] = useState(0)

  const [viewport, setViewport] = useState({
    latitude: 20,
    longitude: 0,
    zoom: 1,
  })

  const [popupInfo, setPopupInfo] = useState<IAttractionsInCity | null>(null)

  useEffect(() => {
    if (containerRef.current) {
      setHeight(containerRef.current.offsetHeight)
      setWidth(containerRef.current.offsetWidth)
    }
  }, [])

  const handleMapMarkerClick = (
    e: MapboxEvent<MouseEvent>,
    cityAttraction: SetStateAction<IAttractionsInCity | null>
  ) => {
    e.originalEvent?.stopPropagation()
    setPopupInfo(cityAttraction)
  }

  const handleMapMarkerKeydown = (
    e: { key: string; preventDefault: () => void },
    cityAttraction: SetStateAction<IAttractionsInCity | null>
  ) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      setPopupInfo(cityAttraction)
    }
  }

  const CITY_MARKERS = attractionsInCities.map((cityAttraction, index) => (
    <Marker
      key={`city-${index}`}
      longitude={cityAttraction.city.lon}
      latitude={cityAttraction.city.lat}
      anchor="bottom"
      onClick={(e) => handleMapMarkerClick(e, cityAttraction)}
    >
      <MapIcon
        cityAttraction={cityAttraction}
        handleClick={handleMapMarkerClick}
        handleMapMarkerKeydown={handleMapMarkerKeydown}
      />
    </Marker>
  ))

  return (
    <Grid
      sx={{
        width: '100%',
        height: { xs: '200px', sm: '450px' },
      }}
      ref={containerRef}
    >
      <Map
        {...viewport}
        onMove={(event) => setViewport(event.viewState)}
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        mapStyle="mapbox://styles/mapbox/light-v10"
        style={{ height: height, width: width }}
        onRender={(event) => event.target.resize()}
      >
        {CITY_MARKERS}
        {popupInfo && (
          <Popup
            anchor="top"
            longitude={Number(popupInfo.city.lon)}
            latitude={Number(popupInfo.city.lat)}
            onClose={() => setPopupInfo(null)}
          >
            <div>{popupInfo.city.formattedName}</div>
          </Popup>
        )}
      </Map>
    </Grid>
  )
}

export default CityMap
