import { AttractionsInCities, IAttraction, IAttractionsInCity } from '../types'
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
} from '@mui/material'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import cloneDeep from 'lodash.clonedeep'
import InfoIcon from '@mui/icons-material/Info'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Link } from 'react-router-dom'

interface CityProps {
  cityAttraction?: IAttractionsInCity
  loading: boolean
  attractionsInCities: IAttractionsInCity[]
  setAttractionsInCities: Dispatch<SetStateAction<AttractionsInCities | []>>
}

const City = (props: CityProps) => {
  const {
    cityAttraction,
    loading,
    attractionsInCities,
    setAttractionsInCities,
  } = props

  const [attractionList, setAttractionList] = useState<IAttraction[]>([])

  /** Get the list of attractions for the selected city */
  useEffect(() => {
    if (cityAttraction) {
      setAttractionList(cityAttraction.attractions)
    }
  }, [cityAttraction])

  /** Update the list of attractions for the selected city as they are checked or unchecked */
  useEffect(() => {
    if (attractionList.length > 0) {
      const newAttractionsInCities = cloneDeep(attractionsInCities)
      setAttractionsInCities(
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

  if (loading) {
    return (
      <Backdrop sx={{ color: '#fff' }} open={true}>
        <CircularProgress color="inherit" />
      </Backdrop>
    )
  } else {
    return (
      <>
        <Tooltip arrow title="Back">
          <Link to="/" aria-label="Return to the overview page">
            <ArrowBackIcon fontSize="large" color="primary" />
          </Link>
        </Tooltip>
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
                        <Tooltip
                          arrow
                          title={`https://en.wikipedia.org/wiki/${attraction.webLink}`}
                        >
                          <a
                            href={`https://en.wikipedia.org/wiki/${attraction.webLink}`}
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
