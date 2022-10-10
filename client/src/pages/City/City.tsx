import {
  AttractionsInCities,
  IAttraction,
  IAttractionsInCity,
  ICity,
} from '../../types'
import {
  Backdrop,
  CircularProgress,
  Typography,
  List,
  ListItem,
  Checkbox,
  FormControlLabel,
  Paper,
  Grid,
  Tooltip,
  Box,
  Button,
} from '@mui/material'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import cloneDeep from 'lodash.clonedeep'
import InfoIcon from '@mui/icons-material/Info'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Link, useNavigate } from 'react-router-dom'
import ConfirmModal from '../../components/ConfirmModal/ConfirmModal'

interface CityProps {
  cityAttraction?: IAttractionsInCity
  loading: boolean
  filteredAttractionsInCities: IAttractionsInCity[]
  setFilteredAttractionsInCities: Dispatch<
    SetStateAction<AttractionsInCities | []>
  >
  setSearchedCity: Dispatch<SetStateAction<ICity | null>>
}

const City = (props: CityProps) => {
  const {
    cityAttraction,
    loading,
    filteredAttractionsInCities,
    setFilteredAttractionsInCities,
    setSearchedCity,
  } = props

  const navigate = useNavigate()

  const [attractionList, setAttractionList] = useState<IAttraction[]>([])

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  /** Get the list of attractions for the selected city */
  useEffect(() => {
    if (cityAttraction) {
      setAttractionList(cityAttraction.attractions)
    }
  }, [cityAttraction])

  /** Update the list of attractions for the selected city as they are checked or unchecked */
  useEffect(() => {
    if (attractionList.length > 0) {
      const newAttractionsInCities = cloneDeep(filteredAttractionsInCities)
      setFilteredAttractionsInCities(
        newAttractionsInCities.map((attractionInCity) => {
          return {
            ...attractionInCity,
            attractions:
              attractionInCity.city.placeId === cityAttraction?.city.placeId
                ? attractionList
                : attractionInCity.attractions,
          }
        })
      )
    }
  }, [attractionList])

  const handleCheckbox = (selectedAttractionName: string) => {
    const newAttractionList = cloneDeep(attractionList)
    setAttractionList(
      newAttractionList.map((attraction) => {
        return {
          ...attraction,
          isVisited:
            attraction.formattedName === selectedAttractionName
              ? !attraction.isVisited
              : attraction.isVisited,
        }
      })
    )
  }

  const deleteCity = () => {
    const newAttractionsInCities = cloneDeep(filteredAttractionsInCities)
    const remainingAttractionsInCities = newAttractionsInCities.filter(
      (attractionInCity) =>
        attractionInCity.city.placeId !== cityAttraction?.city.placeId
    )
    setFilteredAttractionsInCities(remainingAttractionsInCities)
    localStorage.setItem(
      'attractionsInCities',
      JSON.stringify(remainingAttractionsInCities)
    )
    setSearchedCity(null)
    navigate('/')
    setIsModalOpen(false)
  }

  if (loading) {
    return (
      <Backdrop sx={{ color: '#fff' }} open={true}>
        <CircularProgress color="inherit" />
      </Backdrop>
    )
  } else {
    return (
      <>
        <ConfirmModal
          isModalOpen={isModalOpen}
          handleCloseModal={() => setIsModalOpen(false)}
          handleConfirm={deleteCity}
          confirmMessage={`Are you sure you want to delete ${cityAttraction?.city.formattedName}?`}
        />
        <Grid container justifyContent="space-between">
          <Grid item>
            <Tooltip arrow title="Back">
              <Link to="/" aria-label="Return to the overview page">
                <ArrowBackIcon fontSize="large" color="primary" />
              </Link>
            </Tooltip>
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              onClick={() => setIsModalOpen(true)}
              color="error"
            >
              Delete city
            </Button>
          </Grid>
        </Grid>
        <Paper elevation={3} sx={{ width: '100%' }}>
          <Typography
            variant="h2"
            sx={{ textAlign: 'center', background: 'black', color: 'white' }}
          >
            {cityAttraction?.city.formattedName}
          </Typography>
          {cityAttraction && cityAttraction.attractions?.length > 0 ? (
            <List sx={{ paddingBottom: '0' }}>
              {attractionList.map((attraction, index) => {
                return (
                  <ListItem key={index} divider>
                    <Grid container justifyContent="center">
                      <Grid item xs={10} sm={8} md={6}>
                        <FormControlLabel
                          control={<Checkbox />}
                          label={attraction.formattedName}
                          onChange={() =>
                            handleCheckbox(attraction.formattedName)
                          }
                          checked={attraction.isVisited}
                        />
                      </Grid>
                      <Grid item container xs={2} sm={1} alignItems="center">
                        <Tooltip arrow title={attraction.webLink}>
                          <a
                            href={attraction.webLink}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={`Wikipedia article about ${attraction.formattedName}`}
                          >
                            <InfoIcon color="info" />
                          </a>
                        </Tooltip>
                      </Grid>
                    </Grid>
                  </ListItem>
                )
              })}
            </List>
          ) : (
            <Box sx={{ padding: '2em' }}>
              <Typography variant="h4">
                Sorry, the{' '}
                <a
                  href="https://apidocs.geoapify.com/docs/places/#about"
                  target="_blank"
                  rel="noreferrer"
                >
                  Geoapify places API
                </a>{' '}
                doesn&apos;t have any attractions on file for this city! 🙁
              </Typography>
            </Box>
          )}
        </Paper>
      </>
    )
  }
}

export default City
