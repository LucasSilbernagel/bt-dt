import { CssBaseline, Grid, Typography } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { lightTheme } from './themes'
import { Routes, Route, Navigate } from 'react-router-dom'
import Overview from './pages/Overview'
import { useState, useEffect } from 'react'
import { ICity, AttractionsInCities, IAttractionInCity } from './types'
import { useLazyQuery } from '@apollo/react-hooks'
import { gql } from '@apollo/client'
import cloneDeep from 'lodash.clonedeep'

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

  const [getAttractions, { loading, data, error }] = useLazyQuery(
    GET_ATTRACTIONS,
    {
      variables: { placeId: '' },
    }
  )

  useEffect(() => {
    if (searchedCity?.placeId) {
      getAttractions({ variables: { placeId: searchedCity.placeId } })
    }
  }, [searchedCity])

  useEffect(() => {
    if (!loading && !error && data) {
      if (searchedCity) {
        setAttractionsInCities(() => {
          const newAttractionsInCities: AttractionsInCities =
            cloneDeep(attractionsInCities)
          newAttractionsInCities.push({
            city: searchedCity,
            attractions: data.attractions.map(
              (attraction: IAttractionInCity) => {
                return { ...attraction, isVisited: false }
              }
            ),
          })
          return newAttractionsInCities
        })
      }
    }
  }, [loading, error, data])

  useEffect(() => {
    if (attractionsInCities.length) {
      localStorage.setItem(
        'attractionsInCities',
        JSON.stringify(attractionsInCities)
      )
    }
  }, [attractionsInCities])

  useEffect(() => {
    const fetchedCityAttractions = localStorage.getItem('attractionsInCities')
    if (fetchedCityAttractions !== null) {
      console.log(JSON.parse(fetchedCityAttractions))
    }
  }, [attractionsInCities])

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
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Grid>
    </ThemeProvider>
  )
}

export default App
