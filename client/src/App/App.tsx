import {
  Box,
  CssBaseline,
  Divider,
  FormControlLabel,
  Grid,
  Switch,
  Typography,
} from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { lightTheme, darkTheme } from '../themes'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import Overview from '../pages/Overview'
import { useState, useEffect } from 'react'
import {
  ICity,
  AttractionsInCities,
  IAttraction,
  IAttractionsInCity,
} from '../types'
import { useLazyQuery } from '@apollo/react-hooks'
import { gql } from '@apollo/client'
import cloneDeep from 'lodash.clonedeep'
import City from '../pages/City'

const GET_ATTRACTIONS = gql`
  query getAttractions($placeId: String!) {
    attractions(placeId: $placeId) {
      formattedName
      lon
      lat
      webLink
    }
  }
`

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false)
  const [searchedCity, setSearchedCity] = useState<ICity | null>(null)
  const [attractionsInCities, setAttractionsInCities] = useState<
    IAttractionsInCity[]
  >([])
  const [filteredAttractionsInCities, setFilteredAttractionsInCities] =
    useState<IAttractionsInCity[]>([])
  const [cityFilter, setCityFilter] = useState<string | null>(null)
  const savedDarkMode = localStorage.getItem('isDarkMode')

  const navigate = useNavigate()

  const [getAttractions, { loading, data, error }] = useLazyQuery(
    GET_ATTRACTIONS,
    {
      variables: { placeId: searchedCity?.placeId },
    }
  )

  const handleThemeChange = () => {
    localStorage.setItem('isDarkMode', JSON.stringify(!isDarkMode))
    setIsDarkMode(!isDarkMode)
  }

  /** When app first loads, fetch existing city attraction data from localStorage */
  useEffect(() => {
    const fetchedCityAttractions = localStorage.getItem('attractionsInCities')
    if (
      fetchedCityAttractions !== null &&
      !attractionsInCities.length &&
      !filteredAttractionsInCities.length
    ) {
      setAttractionsInCities(JSON.parse(fetchedCityAttractions))
    }
  }, [])

  /** Remember user preference for dark or light theme */
  useEffect(() => {
    if (savedDarkMode !== null) {
      if (savedDarkMode === 'true') {
        setIsDarkMode(true)
      } else {
        setIsDarkMode(false)
      }
    }
  }, [])

  /** When a city is searched, call the tourist attractions API unless the city is already saved */
  useEffect(() => {
    if (
      searchedCity &&
      !filteredAttractionsInCities.find(
        (cityAttraction) =>
          cityAttraction.city.formattedName === searchedCity.formattedName
      )
    ) {
      getAttractions()
    }
  }, [searchedCity, filteredAttractionsInCities])

  /** If the searched city is not already saved, add it to the filteredAttractionsInCities list */
  useEffect(() => {
    if (
      !loading &&
      !error &&
      data &&
      data.attractions.length > 0 &&
      searchedCity &&
      !filteredAttractionsInCities.find(
        (cityAttraction) =>
          cityAttraction.city.formattedName === searchedCity.formattedName
      )
    ) {
      setFilteredAttractionsInCities(() => {
        const newAttractionsInCities: AttractionsInCities = cloneDeep(
          filteredAttractionsInCities
        )
        newAttractionsInCities.push({
          city: searchedCity,
          attractions: data.attractions.map((attraction: IAttraction) => {
            return { ...attraction, isVisited: false }
          }),
        })
        return newAttractionsInCities
      })
    }
  }, [loading, error, data, searchedCity, filteredAttractionsInCities])

  /** When the filteredAttractionsInCities list is updated, also update localStorage */
  useEffect(() => {
    if (filteredAttractionsInCities.length > 0) {
      localStorage.setItem(
        'attractionsInCities',
        JSON.stringify(
          filteredAttractionsInCities.filter(
            (attractionInCity) => attractionInCity.attractions.length > 0
          )
        )
      )
    }
  }, [filteredAttractionsInCities])

  /** When a city is searched, navigate to the city page. */
  useEffect(() => {
    if (searchedCity) {
      navigate(`/city/${searchedCity.placeId}`, { replace: true })
    }
  }, [searchedCity])

  /** Handle filters */
  useEffect(() => {
    setFilteredAttractionsInCities(
      attractionsInCities.filter(
        (attractionInCity) => attractionInCity.attractions.length > 0
      )
    )
    if (cityFilter) {
      setFilteredAttractionsInCities((prevFilteredAttractionsInCities) =>
        prevFilteredAttractionsInCities.filter(
          (attractionInCity) =>
            attractionInCity.city.formattedName === cityFilter
        )
      )
    }
  }, [attractionsInCities, cityFilter])

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Grid container direction="column">
        <Grid item container justifyContent="flex-end">
          <Grid item sx={{ paddingTop: '1em', paddingBottom: '1em' }}>
            <FormControlLabel
              control={
                <Switch
                  color="default"
                  checked={isDarkMode}
                  onClick={handleThemeChange}
                />
              }
              label={
                isDarkMode ? 'Switch to light theme' : 'Switch to dark theme'
              }
            />
          </Grid>
        </Grid>
        <Typography
          variant="h1"
          sx={{ textAlign: 'center', marginBottom: '20px' }}
        >
          Been there, done that!
        </Typography>
        <Box
          sx={{ paddingLeft: '1em', paddingRight: '1em', paddingBottom: '1em' }}
        >
          <Box
            sx={{
              maxWidth: { xs: '800px', lg: '1200px' },
              width: '100%',
              margin: '0 auto',
            }}
          >
            <Routes>
              <Route
                path="/"
                element={
                  <Overview
                    setSearchedCity={setSearchedCity}
                    filteredAttractionsInCities={filteredAttractionsInCities}
                    setFilteredAttractionsInCities={
                      setFilteredAttractionsInCities
                    }
                    cityFilter={cityFilter}
                    setCityFilter={setCityFilter}
                    isDarkMode={isDarkMode}
                  />
                }
              />
              <Route
                path={`/city/${searchedCity?.placeId}`}
                element={
                  <Box
                    sx={{
                      maxWidth: '800px',
                      width: '100%',
                      margin: '0 auto',
                    }}
                  >
                    <City
                      cityAttraction={filteredAttractionsInCities.find(
                        (attractionInCity) =>
                          attractionInCity.city.formattedName ===
                          searchedCity?.formattedName
                      )}
                      loading={loading}
                      filteredAttractionsInCities={filteredAttractionsInCities}
                      setFilteredAttractionsInCities={
                        setFilteredAttractionsInCities
                      }
                      setSearchedCity={setSearchedCity}
                    />
                  </Box>
                }
              />
              {filteredAttractionsInCities.map((attractionInCity) => {
                return (
                  <Route
                    key={attractionInCity.city.placeId}
                    path={`/city/${attractionInCity.city.placeId}`}
                    element={
                      <Box
                        sx={{
                          maxWidth: '800px',
                          width: '100%',
                          margin: '0 auto',
                        }}
                      >
                        <City
                          cityAttraction={attractionInCity}
                          loading={loading}
                          filteredAttractionsInCities={
                            filteredAttractionsInCities
                          }
                          setFilteredAttractionsInCities={
                            setFilteredAttractionsInCities
                          }
                          setSearchedCity={setSearchedCity}
                        />
                      </Box>
                    }
                  />
                )
              })}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </Box>
        </Box>
        <Grid item>
          <Divider sx={{ marginTop: '2em' }} />
          <Typography
            sx={{ textAlign: 'center', marginTop: '1em', marginBottom: '1em' }}
          >
            Built by{' '}
            <a
              href="https://lucassilbernagel.com/"
              target="_blank"
              rel="noreferrer"
              style={{ color: isDarkMode ? 'white' : 'black' }}
            >
              Lucas Silbernagel
            </a>
          </Typography>
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}

export default App
