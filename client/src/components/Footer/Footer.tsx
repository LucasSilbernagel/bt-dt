import { Divider, Grid, Typography, Tooltip } from '@mui/material'
import { darkModeState } from '../../state'
import { useReactiveVar } from '@apollo/client'
import GitHubIcon from '@mui/icons-material/GitHub'

const Footer = () => {
  const isDarkMode = useReactiveVar(darkModeState)

  return (
    <Grid item container>
      <Divider sx={{ marginTop: '2em', width: '100%' }} />
      <Grid item container sx={{ margin: '1em 0em' }}>
        <Grid item container spacing={2} justifyContent="center">
          <Grid item>
            <Tooltip arrow title="https://github.com/LucasSilbernagel/bt-dt">
              <a
                href="https://github.com/LucasSilbernagel/bt-dt"
                target="_blank"
                rel="noreferrer"
                data-testid="github-link"
              >
                <GitHubIcon sx={{ color: isDarkMode ? 'white' : 'black' }} />
              </a>
            </Tooltip>
          </Grid>
          <Grid item>
            <Typography sx={{ textAlign: 'center' }}>
              Built by{' '}
              <Tooltip arrow title="https://lucassilbernagel.com/">
                <a
                  href="https://lucassilbernagel.com/"
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: isDarkMode ? 'white' : 'black' }}
                >
                  Lucas Silbernagel
                </a>
              </Tooltip>
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Footer
