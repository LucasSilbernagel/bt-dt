import { CssBaseline, Grid, Typography } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { lightTheme } from './themes'
import { Routes, Route, Navigate } from 'react-router-dom'
import Overview from './pages/Overview'
import { useState, useEffect } from 'react'
import { ICity } from './types'
import { useLazyQuery } from '@apollo/react-hooks'
import { gql } from '@apollo/client'

const GET_ATTRACTIONS = gql`
  query getAttractions($placeId: String!) {
    attractions(placeId: $placeId) {
      formattedName
      lon
      lat
    }
  }
`

const App: React.FC = () => {
  const [searchedCity, setSearchedCity] = useState<ICity | null>(null)

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

  if (!loading && !error && data) {
    console.log(data.attractions)
  }

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
