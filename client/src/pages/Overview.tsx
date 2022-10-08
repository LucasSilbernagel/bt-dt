import { SetStateAction, Dispatch, useState } from 'react'
import {
  ICity,
  AttractionsInCities,
  IMapViewport,
  IAttractionsInCity,
} from '../types'
import CityMap from '../components/CityMap/CityMap'
import Search from '../components/Search/Search'
import CityFilter from '../components/CityFilter/CityFilter'
import MapLayerSelect from '../components/MapLayerSelect/MapLayerSelect'
import { Button, Grid } from '@mui/material'
import MapLegend from '../components/MapLegend/MapLegend'
import { DEFAULT_MAP_LAYERS, DEFAULT_MAP_VIEWPORT } from '../constants'
import ConfirmModal from '../components/ConfirmModal/ConfirmModal'

interface OverviewProps {
  setSearchedCity: Dispatch<SetStateAction<ICity | null>>
  filteredAttractionsInCities: AttractionsInCities
  setFilteredAttractionsInCities: Dispatch<SetStateAction<IAttractionsInCity[]>>
  cityFilter: string | null
  setCityFilter: Dispatch<SetStateAction<string | null>>
}

const Overview = (props: OverviewProps) => {
  const {
    setSearchedCity,
    filteredAttractionsInCities,
    setFilteredAttractionsInCities,
    cityFilter,
    setCityFilter,
  } = props

  const [cityOptions, setCityOptions] = useState<ICity[]>([])

  const [mapLayers, setMapLayers] = useState<string[]>(DEFAULT_MAP_LAYERS)

  const [mapViewport, setMapViewport] =
    useState<IMapViewport>(DEFAULT_MAP_VIEWPORT)

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const handleResetFilters = () => {
    setMapLayers(DEFAULT_MAP_LAYERS)
    setMapViewport(DEFAULT_MAP_VIEWPORT)
    setCityFilter(null)
  }

  const clearAllData = () => {
    handleResetFilters()
    setSearchedCity(null)
    setFilteredAttractionsInCities([])
    setCityOptions([])
    localStorage.removeItem('attractionsInCities')
    setIsModalOpen(false)
  }

  return (
    <>
      <ConfirmModal
        isModalOpen={isModalOpen}
        handleCloseModal={() => setIsModalOpen(false)}
        handleConfirm={clearAllData}
        confirmMessage="Are you sure you want to delete all saved data?"
      />
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={8} md={6}>
          <Search
            setSearchedCity={setSearchedCity}
            filteredAttractionsInCities={filteredAttractionsInCities}
            cityOptions={cityOptions}
            setCityOptions={setCityOptions}
          />
        </Grid>
      </Grid>
      <CityMap
        filteredAttractionsInCities={filteredAttractionsInCities}
        cityFilter={cityFilter}
        mapLayers={mapLayers}
        mapViewport={mapViewport}
        setMapViewport={setMapViewport}
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
                cityFilter={cityFilter}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <MapLayerSelect
                setMapLayers={setMapLayers}
                mapLayers={mapLayers}
              />
            </Grid>
            <Grid item container justifyContent="flex-end" spacing={2}>
              <Grid item>
                <Button
                  variant="outlined"
                  onClick={handleResetFilters}
                  color="warning"
                >
                  Reset map & filters
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="outlined"
                  onClick={() => setIsModalOpen(true)}
                  color="error"
                >
                  Clear all data
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </>
      )}
    </>
  )
}

export default Overview
