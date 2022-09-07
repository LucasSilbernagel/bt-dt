import { createTheme, responsiveFontSizes } from '@mui/material/styles'

const lightMuiTheme = createTheme({
  palette: {
    mode: 'light',
  },
})

const darkMuiTheme = createTheme({
  palette: {
    mode: 'dark',
  },
})

export const lightTheme = responsiveFontSizes(lightMuiTheme)
export const darkTheme = responsiveFontSizes(darkMuiTheme)
