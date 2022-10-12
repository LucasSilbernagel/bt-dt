import { Box, CssBaseline, Grid } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { lightTheme, darkTheme } from '../themes'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import Overview from '../pages/Overview'
import { useState, useEffect } from 'react'
import { ICity, IAttraction, ICityWithAttractions } from '../types'
import { useLazyQuery } from '@apollo/react-hooks'
import { gql, useReactiveVar } from '@apollo/client'
import cloneDeep from 'lodash.clonedeep'
import City from '../pages/City'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { darkModeState } from '../state'

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
  /** Whether or not the app is displayed in dark mode */
  const isDarkMode = useReactiveVar(darkModeState)
  /** The city that is being searched */
  const [searchedCity, setSearchedCity] = useState<ICity | null>(null)
  /** Array of cities with attraction data */
  const [citiesWithAttractions, setCitiesWithAttractions] = useState<
    ICityWithAttractions[]
  >([])
  /** The user's theme setting, saved in localStorage */
  const savedIsDarkMode = localStorage.getItem('isDarkMode')

  const navigate = useNavigate()

  const [getAttractions, { loading, data, error }] = useLazyQuery(
    GET_ATTRACTIONS,
    {
      variables: { placeId: searchedCity?.placeId },
    }
  )

  const handleThemeChange = () => {
    localStorage.setItem('isDarkMode', JSON.stringify(!isDarkMode))
    darkModeState(!isDarkMode)
  }

  /** When app first loads, fetch saved city data from localStorage */
  useEffect(() => {
    const fetchedCitiesWithAttractions = localStorage.getItem(
      'citiesWithAttractions'
    )
    if (
      fetchedCitiesWithAttractions !== null &&
      !citiesWithAttractions.length
    ) {
      setCitiesWithAttractions(JSON.parse(fetchedCitiesWithAttractions))
    }
  }, [])

  /** Remember user preference for dark or light theme */
  useEffect(() => {
    if (savedIsDarkMode !== null) {
      if (savedIsDarkMode === 'true') {
        darkModeState(true)
      } else {
        darkModeState(false)
      }
    }
  }, [])

  /** When a city is searched, call the tourist attractions API unless the city is already saved */
  useEffect(() => {
    if (
      searchedCity &&
      !citiesWithAttractions.find(
        (savedCity) =>
          savedCity.city.formattedName === searchedCity.formattedName
      )
    ) {
      getAttractions()
    }
  }, [searchedCity, citiesWithAttractions])

  /** If the searched city is not already saved, add it to the citiesWithAttractions list */
  useEffect(() => {
    if (
      !loading &&
      !error &&
      data &&
      data.attractions.length > 0 &&
      searchedCity &&
      !citiesWithAttractions.find(
        (newCity) => newCity.city.formattedName === searchedCity.formattedName
      )
    ) {
      setCitiesWithAttractions(() => {
        const newCitiesWithAttractions: ICityWithAttractions[] = cloneDeep(
          citiesWithAttractions
        )
        newCitiesWithAttractions.push({
          city: searchedCity,
          attractions: data.attractions.map((attraction: IAttraction) => {
            return { ...attraction, isVisited: false }
          }),
        })
        return newCitiesWithAttractions
      })
    }
  }, [loading, error, data, searchedCity, citiesWithAttractions])

  /** When the citiesWithAttractions list is updated, also update localStorage */
  useEffect(() => {
    if (citiesWithAttractions.length > 0) {
      localStorage.setItem(
        'citiesWithAttractions',
        JSON.stringify(
          /** Don't save cities that don't have any attractions */
          citiesWithAttractions.filter(
            (cityWithAttractions) => cityWithAttractions.attractions.length > 0
          )
        )
      )
    }
  }, [citiesWithAttractions])

  /** When a city is searched, navigate to the city page. */
  useEffect(() => {
    if (searchedCity) {
      navigate(`/city/${searchedCity.placeId}`, { replace: true })
    }
  }, [searchedCity])

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Grid container direction="column">
        <Header handleThemeChange={handleThemeChange} />
        <Box
          sx={{
            padding: '0em 1em 1em 1em',
            minHeight: '80vh',
          }}
        >
          <Box
            sx={{
              maxWidth: {
                xs: '800px',
                lg: citiesWithAttractions.length > 0 ? '1200px' : '800px',
              },
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
                    citiesWithAttractions={citiesWithAttractions}
                    setCitiesWithAttractions={setCitiesWithAttractions}
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
                      city={citiesWithAttractions.find(
                        (cityWithAttractions) =>
                          cityWithAttractions.city.formattedName ===
                          searchedCity?.formattedName
                      )}
                      loading={loading}
                      citiesWithAttractions={citiesWithAttractions}
                      setCitiesWithAttractions={setCitiesWithAttractions}
                      setSearchedCity={setSearchedCity}
                    />
                  </Box>
                }
              />
              {citiesWithAttractions.map((cityWithAttractions) => {
                return (
                  <Route
                    key={cityWithAttractions.city.placeId}
                    path={`/city/${cityWithAttractions.city.placeId}`}
                    element={
                      <Box
                        sx={{
                          maxWidth: '800px',
                          width: '100%',
                          margin: '0 auto',
                        }}
                      >
                        <City
                          city={cityWithAttractions}
                          loading={loading}
                          citiesWithAttractions={citiesWithAttractions}
                          setCitiesWithAttractions={setCitiesWithAttractions}
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
        <Footer />
      </Grid>
    </ThemeProvider>
  )
}

export default App
