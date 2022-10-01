import { Grid } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import Map, { Marker } from 'react-map-gl'
import MapIcon from '../MapIcon/MapIcon'

const CityMap = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  const [height, setHeight] = useState(0)
  const [width, setWidth] = useState(0)

  const [viewport, setViewport] = useState({
    latitude: 10,
    longitude: -150,
    zoom: 1,
  })

  useEffect(() => {
    if (containerRef.current) {
      setHeight(containerRef.current.offsetHeight)
      setWidth(containerRef.current.offsetWidth)
    }
  }, [])

  const handleMapMarkerClick = () => {
    alert('clicked')
  }

  const handleKeydown = (e: { key: string }) => {
    if (e.key === 'Enter') {
      alert('pressed enter')
    }
  }

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
        <Marker
          longitude={-100}
          latitude={40}
          anchor="bottom"
          onClick={handleMapMarkerClick}
        >
          <MapIcon
            handleClick={handleMapMarkerClick}
            handleKeydown={handleKeydown}
          />
        </Marker>
      </Map>
    </Grid>
  )
}

export default CityMap
