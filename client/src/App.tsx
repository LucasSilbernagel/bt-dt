import { CssBaseline, Grid, Typography } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { lightTheme } from './themes'
import { Routes, Route, Navigate } from 'react-router-dom'
import Overview from './pages/Overview'

const App: React.FC = () => {
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <Grid container direction="column">
        <Typography variant="h1">Been there, done that!</Typography>
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Grid>
    </ThemeProvider>
  )
}

export default App
