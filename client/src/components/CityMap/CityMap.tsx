import { Grid, Paper } from '@mui/material'
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import Map, { MapboxEvent, Marker, MapRef } from 'react-map-gl'
import {
  IAttraction,
  ICityWithAttractions,
  IMapViewport,
  IPopup,
} from '../../types'
import MapIcon from '../MapIcon/MapIcon'
import MapPopup from '../MapPopup/MapPopup'
import { DEFAULT_MAP_VIEWPORT } from '../../constants'
import MapLegend from '../MapLegend/MapLegend'
import { darkModeState } from '../../state'
import { useReactiveVar } from '@apollo/client'

interface CityMapProps {
  filteredCitiesWithAttractions: ICityWithAttractions[]
  cityFilter: string | null
  mapLayers: string[] | null
  mapViewport: IMapViewport
  setMapViewport: Dispatch<SetStateAction<IMapViewport>>
}

const CityMap = (props: CityMapProps) => {
  const {
    filteredCitiesWithAttractions,
    cityFilter,
    mapLayers,
    mapViewport,
    setMapViewport,
  } = props

  const isDarkMode = useReactiveVar(darkModeState)

  const mapRef = useRef<MapRef>(null)

  const containerRef = useRef<HTMLDivElement>(null)

  const [height, setHeight] = useState(0)
  const [width, setWidth] = useState(0)

  const [popupInfo, setPopupInfo] = useState<IPopup | null>(null)

  /** Set the dimensions of the map to fill its container */
  useEffect(() => {
    if (containerRef.current) {
      setHeight(containerRef.current.offsetHeight)
      setWidth(containerRef.current.offsetWidth)
    }
  }, [])

  /** Zoom to selected city filter */
  useEffect(() => {
    if (cityFilter) {
      const selectedCity = filteredCitiesWithAttractions.filter(
        (cityWithAttractions) =>
          cityWithAttractions.city.formattedName === cityFilter
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
    cityWithAttractions: ICityWithAttractions,
    popupType: 'city' | 'attraction',
    attraction?: IAttraction
  ) => {
    e.originalEvent?.stopPropagation()
    if (attraction) {
      setPopupInfo({
        cityWithAttractions: cityWithAttractions,
        popupType: popupType,
        attraction: attraction,
      })
    } else {
      setPopupInfo({
        cityWithAttractions: cityWithAttractions,
        popupType: popupType,
      })
    }
  }

  const handleMapMarkerKeydown = (
    e: { key: string; preventDefault: () => void },
    cityWithAttractions: ICityWithAttractions,
    popupType: 'city' | 'attraction',
    attraction?: IAttraction
  ) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      if (attraction) {
        setPopupInfo({
          cityWithAttractions: cityWithAttractions,
          popupType: popupType,
          attraction: attraction,
        })
      } else {
        setPopupInfo({
          cityWithAttractions: cityWithAttractions,
          popupType: popupType,
        })
      }
    }
  }

  const CITY_MARKERS = filteredCitiesWithAttractions.map(
    (cityWithAttractions, index) => (
      <Marker
        key={`city-${index}`}
        longitude={cityWithAttractions.city.lon}
        latitude={cityWithAttractions.city.lat}
        anchor="bottom"
        onClick={(e) => handleMapMarkerClick(e, cityWithAttractions, 'city')}
      >
        <MapIcon
          popupType="city"
          cityWithAttractions={cityWithAttractions}
          handleClick={handleMapMarkerClick}
          handleMapMarkerKeydown={handleMapMarkerKeydown}
        />
      </Marker>
    )
  )

  const ATTRACTION_MARKERS = filteredCitiesWithAttractions.map(
    (cityWithAttractions) =>
      cityWithAttractions.attractions.map((attraction, index) => (
        <Marker
          key={`attraction-${index}`}
          longitude={attraction.lon}
          latitude={attraction.lat}
          anchor="bottom"
          onClick={(e) =>
            handleMapMarkerClick(
              e,
              cityWithAttractions,
              'attraction',
              attraction
            )
          }
        >
          <MapIcon
            popupType="attraction"
            cityWithAttractions={cityWithAttractions}
            handleClick={handleMapMarkerClick}
            handleMapMarkerKeydown={handleMapMarkerKeydown}
            attraction={attraction}
          />
        </Marker>
      ))
  )

  return (
    <>
      <Grid
        sx={{
          width: '100%',
          height: { xs: '200px', sm: '450px' },
        }}
        ref={containerRef}
      >
        <Paper elevation={3} sx={{ borderRadius: '5px', overflow: 'hidden' }}>
          <Map
            {...mapViewport}
            ref={mapRef}
            onMove={(event) => setMapViewport(event.viewState)}
            mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
            mapStyle={
              isDarkMode
                ? 'mapbox://styles/mapbox/dark-v10'
                : 'mapbox://styles/mapbox/light-v10'
            }
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
      <MapLegend />
    </>
  )
}

export default CityMap
