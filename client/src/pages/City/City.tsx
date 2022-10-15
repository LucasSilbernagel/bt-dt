import { IAttraction, ICityWithAttractions, ICity } from '../../types'
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
import { darkModeState } from '../../state'
import { useReactiveVar } from '@apollo/client'

interface CityProps {
  city?: ICityWithAttractions
  loading: boolean
  citiesWithAttractions: ICityWithAttractions[]
  setCitiesWithAttractions: Dispatch<
    SetStateAction<ICityWithAttractions[] | []>
  >
  setSearchedCity: Dispatch<SetStateAction<ICity | null>>
}

const City = (props: CityProps) => {
  const {
    city,
    loading,
    citiesWithAttractions,
    setCitiesWithAttractions,
    setSearchedCity,
  } = props

  const navigate = useNavigate()

  const isDarkMode = useReactiveVar(darkModeState)

  /** The list of attractions to display on the city page */
  const [attractionList, setAttractionList] = useState<IAttraction[]>([])
  /** Whether or not the modal is open */
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  /** Get the list of attractions for the selected city */
  useEffect(() => {
    if (city) {
      setAttractionList(city.attractions)
    }
  }, [city])

  /** Update the list of attractions for the selected city as they are checked or unchecked */
  useEffect(() => {
    if (attractionList.length > 0) {
      const newCitiesWithAttractions = cloneDeep(citiesWithAttractions)
      setCitiesWithAttractions(
        newCitiesWithAttractions.map((cityWithAttractions) => {
          return {
            ...cityWithAttractions,
            attractions:
              cityWithAttractions.city.placeId === city?.city.placeId
                ? attractionList
                : cityWithAttractions.attractions,
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
    const newCitiesWithAttractions = cloneDeep(citiesWithAttractions)
    const remainingCitiesWithAttractions = newCitiesWithAttractions.filter(
      (cityWithAttractions) =>
        cityWithAttractions.city.placeId !== city?.city.placeId
    )
    setCitiesWithAttractions(remainingCitiesWithAttractions)
    localStorage.setItem(
      'citiesWithAttractions',
      JSON.stringify(remainingCitiesWithAttractions)
    )
    setSearchedCity(null)
    navigate('/')
    setIsModalOpen(false)
  }

  if (loading) {
    return (
      <Backdrop
        data-testid="loading-backdrop"
        sx={{ color: 'white' }}
        open={true}
      >
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
          confirmMessage={`Are you sure you want to delete ${city?.city.formattedName}?`}
        />
        <Grid container justifyContent="space-between">
          <Grid item>
            <Tooltip arrow title="Back">
              <Link
                to="/"
                aria-label="Return to the overview page"
                data-testid="back-button"
              >
                <ArrowBackIcon fontSize="large" color="primary" />
              </Link>
            </Tooltip>
          </Grid>
          {city && city.attractions?.length > 0 && (
            <Grid item>
              <Button
                variant="outlined"
                onClick={() => setIsModalOpen(true)}
                color="error"
                data-testid="delete-city-button"
              >
                Delete city
              </Button>
            </Grid>
          )}
        </Grid>
        <Paper elevation={3} sx={{ width: '100%' }}>
          <Typography
            variant="h2"
            sx={{ textAlign: 'center', background: 'black', color: 'white' }}
          >
            {city?.city.formattedName}
          </Typography>
          {city && city.attractions?.length > 0 ? (
            <List sx={{ paddingBottom: '0' }}>
              {attractionList.map((attraction, index) => {
                return (
                  <ListItem key={index} divider>
                    <Grid container justifyContent="center">
                      <Grid item xs={10} sm={8} md={6}>
                        <FormControlLabel
                          control={<Checkbox />}
                          data-testid="attraction-checkbox"
                          role="checkbox"
                          aria-checked={attraction.isVisited}
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
              <Typography variant="h4" data-testid="no-data-message">
                Sorry, the{' '}
                <a
                  href="https://apidocs.geoapify.com/docs/places/#about"
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: isDarkMode ? 'white' : 'black' }}
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
