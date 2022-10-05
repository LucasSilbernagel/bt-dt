import { SetStateAction, Dispatch, useState } from 'react'
import { ICity, AttractionsInCities } from '../types'
import CityMap from '../components/CityMap/CityMap'
import Search from '../components/Search/Search'
import CityFilter from '../components/CityFilter/CityFilter'
import MapLayerSelect from '../components/MapLayerSelect/MapLayerSelect'
import { Grid } from '@mui/material'
import MapLegend from '../components/MapLegend/MapLegend'

interface OverviewProps {
  setSearchedCity: Dispatch<SetStateAction<ICity | null>>
  filteredAttractionsInCities: AttractionsInCities
  cityFilter: string | null
  setCityFilter: Dispatch<SetStateAction<string | null>>
}

const Overview = (props: OverviewProps) => {
  const {
    setSearchedCity,
    filteredAttractionsInCities,
    cityFilter,
    setCityFilter,
  } = props

  const [mapLayers, setMapLayers] = useState<string[] | null>([
    'Cities',
    'Attractions',
  ])

  return (
    <>
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={8} md={6}>
          <Search
            setSearchedCity={setSearchedCity}
            filteredAttractionsInCities={filteredAttractionsInCities}
          />
        </Grid>
      </Grid>
      <CityMap
        filteredAttractionsInCities={filteredAttractionsInCities}
        cityFilter={cityFilter}
        mapLayers={mapLayers}
      />
      {filteredAttractionsInCities.length > 0 && (
        <>
          <MapLegend />
          <Grid
            container
            justifyContent="space-between"
            spacing={2}
            sx={{ marginTop: '0.5em' }}
          >
            <Grid item xs={12} sm={6}>
              <CityFilter
                filteredAttractionsInCities={filteredAttractionsInCities}
                setCityFilter={setCityFilter}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <MapLayerSelect setMapLayers={setMapLayers} />
            </Grid>
          </Grid>
        </>
      )}
    </>
  )
}

export default Overview
