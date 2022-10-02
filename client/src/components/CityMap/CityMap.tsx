import { Grid } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import Map, { MapboxEvent, Marker } from 'react-map-gl'
import {
  AttractionsInCities,
  IAttraction,
  IAttractionsInCity,
  IPopup,
} from '../../types'
import MapIcon from '../MapIcon/MapIcon'
import MapPopup from '../MapPopup/MapPopup'

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

  const [popupInfo, setPopupInfo] = useState<IPopup | null>(null)

  useEffect(() => {
    if (containerRef.current) {
      setHeight(containerRef.current.offsetHeight)
      setWidth(containerRef.current.offsetWidth)
    }
  }, [])

  const handleMapMarkerClick = (
    e: MapboxEvent<MouseEvent>,
    cityAttraction: IAttractionsInCity,
    popupType: 'city' | 'attraction',
    attraction?: IAttraction
  ) => {
    e.originalEvent?.stopPropagation()
    if (attraction) {
      setPopupInfo({
        attractionsInCity: cityAttraction,
        popupType: popupType,
        attraction: attraction,
      })
    } else {
      setPopupInfo({ attractionsInCity: cityAttraction, popupType: popupType })
    }
  }

  const handleMapMarkerKeydown = (
    e: { key: string; preventDefault: () => void },
    cityAttraction: IAttractionsInCity,
    popupType: 'city' | 'attraction',
    attraction?: IAttraction
  ) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      if (attraction) {
        setPopupInfo({
          attractionsInCity: cityAttraction,
          popupType: popupType,
          attraction: attraction,
        })
      } else {
        setPopupInfo({
          attractionsInCity: cityAttraction,
          popupType: popupType,
        })
      }
    }
  }

  const CITY_MARKERS = attractionsInCities.map((cityAttraction, index) => (
    <Marker
      key={`city-${index}`}
      longitude={cityAttraction.city.lon}
      latitude={cityAttraction.city.lat}
      anchor="bottom"
      onClick={(e) => handleMapMarkerClick(e, cityAttraction, 'city')}
    >
      <MapIcon
        popupType="city"
        cityAttraction={cityAttraction}
        handleClick={handleMapMarkerClick}
        handleMapMarkerKeydown={handleMapMarkerKeydown}
      />
    </Marker>
  ))

  const ATTRACTION_MARKERS = attractionsInCities.map((attractionInCity) =>
    attractionInCity.attractions.map((attraction, index) => (
      <Marker
        key={`attraction-${index}`}
        longitude={attraction.lon}
        latitude={attraction.lat}
        anchor="bottom"
        onClick={(e) =>
          handleMapMarkerClick(e, attractionInCity, 'attraction', attraction)
        }
      >
        <MapIcon
          popupType="attraction"
          cityAttraction={attractionInCity}
          handleClick={handleMapMarkerClick}
          handleMapMarkerKeydown={handleMapMarkerKeydown}
          attraction={attraction}
        />
      </Marker>
    ))
  )

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
        {ATTRACTION_MARKERS}
        {popupInfo && (
          <MapPopup popupInfo={popupInfo} setPopupInfo={setPopupInfo} />
        )}
      </Map>
    </Grid>
  )
}

export default CityMap
