import { SetStateAction, Dispatch, useState } from 'react'
import { ICity, IMapViewport, ICityWithAttractions } from '../../types'
import CityMap from '../../components/CityMap/CityMap'
import Search from '../../components/Search/Search'
import CityFilter from '../../components/CityFilter/CityFilter'
import MapLayerSelect from '../../components/MapLayerSelect/MapLayerSelect'
import { Button, Grid } from '@mui/material'
import { DEFAULT_MAP_LAYERS, DEFAULT_MAP_VIEWPORT } from '../../constants'
import ConfirmModal from '../../components/ConfirmModal/ConfirmModal'

interface OverviewProps {
  setSearchedCity: Dispatch<SetStateAction<ICity | null>>
  citiesWithAttractions: ICityWithAttractions[]
  setCitiesWithAttractions: Dispatch<SetStateAction<ICityWithAttractions[]>>
}

const Overview = (props: OverviewProps) => {
  const { setSearchedCity, citiesWithAttractions, setCitiesWithAttractions } =
    props

  /** The city filter that has been selected */
  const [cityFilter, setCityFilter] = useState<string>('')
  /** Options for the add/edit city autocomplete */
  const [cityOptions, setCityOptions] = useState<ICity[]>([])
  /** Map layers to display */
  const [mapLayers, setMapLayers] = useState<string[]>(DEFAULT_MAP_LAYERS)
  /** The map viewport settings */
  const [mapViewport, setMapViewport] =
    useState<IMapViewport>(DEFAULT_MAP_VIEWPORT)
  /** Whether or not the modal is open */
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const handleResetFilters = () => {
    setMapLayers(DEFAULT_MAP_LAYERS)
    setMapViewport(DEFAULT_MAP_VIEWPORT)
    setCityFilter('')
  }

  const clearAllData = () => {
    handleResetFilters()
    setSearchedCity(null)
    setCitiesWithAttractions([])
    setCityOptions([])
    localStorage.removeItem('citiesWithAttractions')
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
      <Grid item container justifyContent="space-between" spacing={2}>
        <Grid
          container
          justifyContent="center"
          sx={{ paddingLeft: { xs: '1em', sm: '0' } }}
        >
          <Grid item xs={12} sm={8} md={6}>
            <Search
              setSearchedCity={setSearchedCity}
              citiesWithAttractions={citiesWithAttractions}
              cityOptions={cityOptions}
              setCityOptions={setCityOptions}
            />
          </Grid>
        </Grid>
        <Grid item xs={12} lg={citiesWithAttractions.length > 0 ? 9 : 12}>
          <CityMap
            citiesWithAttractions={citiesWithAttractions.filter(
              (cityWithAttraction) =>
                cityWithAttraction.city.formattedName.includes(cityFilter)
            )}
            cityFilter={cityFilter}
            mapLayers={mapLayers}
            mapViewport={mapViewport}
            setMapViewport={setMapViewport}
          />
        </Grid>
        <Grid item xs={12} lg={3}>
          {citiesWithAttractions.length > 0 && (
            <>
              <Grid
                container
                justifyContent="space-between"
                spacing={2}
                sx={{ marginTop: { xs: '0.5em', lg: '0em' } }}
              >
                <Grid item xs={12} sm={6} lg={12}>
                  <CityFilter
                    citiesWithAttractions={citiesWithAttractions}
                    setCityFilter={setCityFilter}
                    cityFilter={cityFilter}
                  />
                </Grid>
                <Grid item xs={12} sm={6} lg={12}>
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
                      data-testid="reset-filters-button"
                    >
                      Reset map & filters
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="outlined"
                      onClick={() => setIsModalOpen(true)}
                      color="error"
                      data-testid="clear-data-button"
                    >
                      Clear all data
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </>
          )}
        </Grid>
      </Grid>
    </>
  )
}

export default Overview
