import { Grid } from '@mui/material'
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import Map, { MapboxEvent, Marker, MapRef } from 'react-map-gl'
import {
  AttractionsInCities,
  IAttraction,
  IAttractionsInCity,
  IMapViewport,
  IPopup,
} from '../../types'
import MapIcon from '../MapIcon/MapIcon'
import MapPopup from '../MapPopup/MapPopup'
import { Paper } from '@mui/material'
import { DEFAULT_MAP_VIEWPORT } from '../../constants'

interface CityMapProps {
  filteredAttractionsInCities: AttractionsInCities
  cityFilter: string | null
  mapLayers: string[] | null
  mapViewport: IMapViewport
  setMapViewport: Dispatch<SetStateAction<IMapViewport>>
}

const CityMap = (props: CityMapProps) => {
  const {
    filteredAttractionsInCities,
    cityFilter,
    mapLayers,
    mapViewport,
    setMapViewport,
  } = props

  const mapRef = useRef<MapRef>(null)

  const containerRef = useRef<HTMLDivElement>(null)

  const [height, setHeight] = useState(0)
  const [width, setWidth] = useState(0)

  const [popupInfo, setPopupInfo] = useState<IPopup | null>(null)

  useEffect(() => {
    if (containerRef.current) {
      setHeight(containerRef.current.offsetHeight)
      setWidth(containerRef.current.offsetWidth)
    }
  }, [])

  /** Zoom to selected city filter */
  useEffect(() => {
    if (cityFilter) {
      const selectedCity = filteredAttractionsInCities.filter(
        (cityAttraction) => cityAttraction.city.formattedName === cityFilter
      )[0].city
      mapRef.current?.flyTo({
        center: [selectedCity.lon, selectedCity.lat],
        duration: 2000,
        zoom: 10,
      })
    } else {
      mapRef.current?.flyTo(DEFAULT_MAP_VIEWPORT)
    }
  }, [cityFilter])

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

  const CITY_MARKERS = filteredAttractionsInCities.map(
    (cityAttraction, index) => (
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
    )
  )

  const ATTRACTION_MARKERS = filteredAttractionsInCities.map(
    (attractionInCity) =>
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
      <Paper elevation={3}>
        <Map
          {...mapViewport}
          ref={mapRef}
          onMove={(event) => setMapViewport(event.viewState)}
          mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          mapStyle="mapbox://styles/mapbox/light-v10"
          style={{ height: height, width: width }}
          onRender={(event) => event.target.resize()}
        >
          {mapLayers?.includes('Cities') && CITY_MARKERS}
          {mapLayers?.includes('Attractions') && ATTRACTION_MARKERS}
          {popupInfo && (
            <MapPopup popupInfo={popupInfo} setPopupInfo={setPopupInfo} />
          )}
        </Map>
      </Paper>
    </Grid>
  )
}

export default CityMap
