import { FormControlLabel, Grid, Switch, Typography } from '@mui/material'

interface HeaderProps {
  isDarkMode: boolean
  handleThemeChange: () => void
}

const Header = (props: HeaderProps) => {
  const { isDarkMode, handleThemeChange } = props

  return (
    <>
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
    </>
  )
}

export default Header
