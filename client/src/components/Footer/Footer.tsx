import { Divider, Grid, Typography } from '@mui/material'
import { darkModeState } from '../../state'
import { useReactiveVar } from '@apollo/client'

const Footer = () => {
  const isDarkMode = useReactiveVar(darkModeState)

  return (
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
  )
}

export default Footer
