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
import { Box, Button, Grid, Modal, Typography } from '@mui/material'
import MapLegend from '../components/MapLegend/MapLegend'
import { DEFAULT_MAP_LAYERS, DEFAULT_MAP_VIEWPORT } from '../constants'

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

  const [mapLayers, setMapLayers] = useState<string[]>(DEFAULT_MAP_LAYERS)

  const [mapViewport, setMapViewport] =
    useState<IMapViewport>(DEFAULT_MAP_VIEWPORT)

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const handleOpenModal = () => setIsModalOpen(true)
  const handleCloseModal = () => setIsModalOpen(false)

  const modalStyle = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    maxWidth: '350px',
    borderRadius: '5px',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  }

  const handleResetFilters = () => {
    setMapLayers(DEFAULT_MAP_LAYERS)
    setMapViewport(DEFAULT_MAP_VIEWPORT)
    setCityFilter(null)
  }

  const clearAllData = () => {
    handleResetFilters()
    setFilteredAttractionsInCities([])
    localStorage.removeItem('attractionsInCities')
    handleCloseModal()
  }

  return (
    <>
      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-title" variant="h6" component="h2">
            Are you sure you want to delete all saved data?
          </Typography>
          <Grid
            container
            spacing={2}
            justifyContent="center"
            sx={{ marginTop: '0.5em' }}
          >
            <Grid item>
              <Button onClick={handleCloseModal} variant="outlined">
                Cancel
              </Button>
            </Grid>
            <Grid item>
              <Button variant="contained" onClick={clearAllData}>
                Yes
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
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
                <Button variant="contained" onClick={handleResetFilters}>
                  Reset map & filters
                </Button>
              </Grid>
              <Grid item>
                <Button variant="contained" onClick={() => handleOpenModal()}>
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
