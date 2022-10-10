import { FormControlLabel, Grid, Switch, Typography } from '@mui/material'
import { darkModeState } from '../../state'
import { useReactiveVar } from '@apollo/client'

interface HeaderProps {
  handleThemeChange: () => void
}

const Header = (props: HeaderProps) => {
  const { handleThemeChange } = props

  const isDarkMode = useReactiveVar(darkModeState)

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
