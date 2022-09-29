import { CssBaseline, Grid, Typography } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { lightTheme } from './themes'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import Overview from './pages/Overview'
import { useState, useEffect } from 'react'
import { ICity, AttractionsInCities, IAttractionInCity } from './types'
import { useLazyQuery } from '@apollo/react-hooks'
import { gql } from '@apollo/client'
import cloneDeep from 'lodash.clonedeep'
import City from './pages/City'

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
  const [searchedCity, setSearchedCity] = useState<ICity | null>(null)
  const [attractionsInCities, setAttractionsInCities] = useState<
    AttractionsInCities | []
  >([])

  const navigate = useNavigate()

  const [getAttractions, { loading, data, error }] = useLazyQuery(
    GET_ATTRACTIONS,
    {
      variables: { placeId: searchedCity?.placeId },
    }
  )

  /** When app first loads, fetch existing city attraction data from localStorage */
  useEffect(() => {
    const fetchedCityAttractions = localStorage.getItem('attractionsInCities')
    if (fetchedCityAttractions !== null && !attractionsInCities.length) {
      setAttractionsInCities(JSON.parse(fetchedCityAttractions))
    }
  }, [])

  /** When a city is searched, call the tourist attractions API unless the city is already saved */
  useEffect(() => {
    if (
      searchedCity?.placeId &&
      !attractionsInCities.find(
        (cityAttraction) =>
          cityAttraction.city.formattedName === searchedCity.formattedName
      )
    ) {
      getAttractions()
    }
  }, [searchedCity, attractionsInCities])

  /** If the searched city is not already saved, add it to the attractionsInCities list */
  useEffect(() => {
    if (
      !loading &&
      !error &&
      data &&
      searchedCity &&
      !attractionsInCities.find(
        (cityAttraction) =>
          cityAttraction.city.formattedName === searchedCity.formattedName
      )
    ) {
      setAttractionsInCities(() => {
        const newAttractionsInCities: AttractionsInCities =
          cloneDeep(attractionsInCities)
        newAttractionsInCities.push({
          city: searchedCity,
          attractions: data.attractions.map((attraction: IAttractionInCity) => {
            return { ...attraction, isVisited: false }
          }),
        })
        return newAttractionsInCities
      })
    }
  }, [loading, error, data, searchedCity, attractionsInCities])

  /** When the attractionsInCities list is updated, also update localStorage */
  useEffect(() => {
    if (attractionsInCities.length) {
      localStorage.setItem(
        'attractionsInCities',
        JSON.stringify(attractionsInCities)
      )
    }
  }, [attractionsInCities])

  /** When a city is searched, navigate to the city page. */
  useEffect(() => {
    if (searchedCity) {
      navigate(`/city/${searchedCity.placeId}`, { replace: true })
    }
  }, [searchedCity])

  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <Grid container direction="column">
        <Typography variant="h1">Been there, done that!</Typography>
        <Routes>
          <Route
            path="/"
            element={<Overview setSearchedCity={setSearchedCity} />}
          />
          <Route
            path={`/city/${searchedCity?.placeId}`}
            element={
              <City
                cityAttraction={attractionsInCities.find(
                  (attractionInCity) =>
                    attractionInCity.city.formattedName ===
                    searchedCity?.formattedName
                )}
                loading={loading}
              />
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Grid>
    </ThemeProvider>
  )
}

export default App
