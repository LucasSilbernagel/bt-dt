import { Box, CssBaseline, Grid } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { lightTheme, darkTheme } from '../themes'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import Overview from '../pages/Overview'
import { useState, useEffect } from 'react'
import { ICity, IAttraction, ICityWithAttractions } from '../types'
import { useLazyQuery } from '@apollo/react-hooks'
import { gql } from '@apollo/client'
import cloneDeep from 'lodash.clonedeep'
import City from '../pages/City'
import Header from '../components/Header'
import Footer from '../components/Footer'

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
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false)
  /** The city that is being searched */
  const [searchedCity, setSearchedCity] = useState<ICity | null>(null)
  /** Array of cities with attraction data */
  const [citiesWithAttractions, setCitiesWithAttractions] = useState<
    ICityWithAttractions[]
  >([])
  /** Array of cities with attraction data, filtered */
  const [filteredCitiesWithAttractions, setFilteredCitiesWithAttractions] =
    useState<ICityWithAttractions[]>([])
  /** The city filter that has been selected */
  const [cityFilter, setCityFilter] = useState<string | null>(null)
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
    setIsDarkMode(!isDarkMode)
  }

  /** When app first loads, fetch saved city data from localStorage */
  useEffect(() => {
    const fetchedCitiesWithAttractions = localStorage.getItem(
      'citiesWithAttractions'
    )
    if (
      fetchedCitiesWithAttractions !== null &&
      !citiesWithAttractions.length &&
      !filteredCitiesWithAttractions.length
    ) {
      setCitiesWithAttractions(JSON.parse(fetchedCitiesWithAttractions))
    }
  }, [])

  /** Remember user preference for dark or light theme */
  useEffect(() => {
    if (savedIsDarkMode !== null) {
      if (savedIsDarkMode === 'true') {
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
      !filteredCitiesWithAttractions.find(
        (savedCity) =>
          savedCity.city.formattedName === searchedCity.formattedName
      )
    ) {
      getAttractions()
    }
  }, [searchedCity, filteredCitiesWithAttractions])

  /** If the searched city is not already saved, add it to the filteredCitiesWithAttractions list */
  useEffect(() => {
    if (
      !loading &&
      !error &&
      data &&
      data.attractions.length > 0 &&
      searchedCity &&
      !filteredCitiesWithAttractions.find(
        (newCity) => newCity.city.formattedName === searchedCity.formattedName
      )
    ) {
      setFilteredCitiesWithAttractions(() => {
        const newCitiesWithAttractions: ICityWithAttractions[] = cloneDeep(
          filteredCitiesWithAttractions
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
  }, [loading, error, data, searchedCity, filteredCitiesWithAttractions])

  /** When the filteredCitiesWithAttractions list is updated, also update localStorage */
  useEffect(() => {
    if (filteredCitiesWithAttractions.length > 0) {
      localStorage.setItem(
        'citiesWithAttractions',
        JSON.stringify(
          /** Don't save cities that don't have any attractions */
          filteredCitiesWithAttractions.filter(
            (cityWithAttractions) => cityWithAttractions.attractions.length > 0
          )
        )
      )
    }
  }, [filteredCitiesWithAttractions])

  /** When a city is searched, navigate to the city page. */
  useEffect(() => {
    if (searchedCity) {
      navigate(`/city/${searchedCity.placeId}`, { replace: true })
    }
  }, [searchedCity])

  /** Handle filters */
  useEffect(() => {
    setFilteredCitiesWithAttractions(
      /** Filter out cities that don't have any attractions */
      citiesWithAttractions.filter(
        (attractionInCity) => attractionInCity.attractions.length > 0
      )
    )
    /** Filter by city */
    if (cityFilter) {
      setFilteredCitiesWithAttractions((prevFilteredAttractionsInCities) =>
        prevFilteredAttractionsInCities.filter(
          (selectedCity) => selectedCity.city.formattedName === cityFilter
        )
      )
    }
  }, [citiesWithAttractions, cityFilter])

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Grid container direction="column">
        <Header isDarkMode={isDarkMode} handleThemeChange={handleThemeChange} />
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
                lg:
                  filteredCitiesWithAttractions.length > 0 ? '1200px' : '800px',
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
                    filteredCitiesWithAttractions={
                      filteredCitiesWithAttractions
                    }
                    setFilteredCitiesWithAttractions={
                      setFilteredCitiesWithAttractions
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
                      city={filteredCitiesWithAttractions.find(
                        (cityWithAttractions) =>
                          cityWithAttractions.city.formattedName ===
                          searchedCity?.formattedName
                      )}
                      loading={loading}
                      filteredCitiesWithAttractions={
                        filteredCitiesWithAttractions
                      }
                      setFilteredCitiesWithAttractions={
                        setFilteredCitiesWithAttractions
                      }
                      setSearchedCity={setSearchedCity}
                    />
                  </Box>
                }
              />
              {filteredCitiesWithAttractions.map((cityWithAttractions) => {
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
                          filteredCitiesWithAttractions={
                            filteredCitiesWithAttractions
                          }
                          setFilteredCitiesWithAttractions={
                            setFilteredCitiesWithAttractions
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
        <Footer isDarkMode={isDarkMode} />
      </Grid>
    </ThemeProvider>
  )
}

export default App
