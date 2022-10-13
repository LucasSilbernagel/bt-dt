import LocationCityIcon from '@mui/icons-material/LocationCity'
import AttractionsIcon from '@mui/icons-material/Attractions'
import { Grid, Typography, Tooltip } from '@mui/material'

const MapLegend = () => {
  return (
    <Grid container sx={{ marginTop: '0.5em' }}>
      <Grid item sm={1}></Grid>
      <Grid item container xs={6} sm={4}>
        <Grid item>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
            Cities
          </Typography>
        </Grid>
        <Grid item container>
          <Grid item xs={3}>
            <Tooltip arrow title="All attractions visited">
              <LocationCityIcon
                data-testid="all-visited-icon"
                tabIndex={0}
                sx={{
                  fontSize: '2rem',
                  color: '#009E73',
                }}
              />
            </Tooltip>
          </Grid>
          <Grid item xs={3}>
            <Tooltip arrow title="Some attractions visited">
              <LocationCityIcon
                data-testid="some-visited-icon"
                tabIndex={0}
                sx={{
                  fontSize: '2rem',
                  color: '#56B4E9',
                }}
              />
            </Tooltip>
          </Grid>
          <Grid item xs={3}>
            <Tooltip arrow title="No attractions visited">
              <LocationCityIcon
                data-testid="none-visited-icon"
                tabIndex={0}
                sx={{
                  fontSize: '2rem',
                  color: '#E69F00',
                }}
              />
            </Tooltip>
          </Grid>
        </Grid>
      </Grid>
      <Grid item container xs={6} sm={4}>
        <Grid item>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
            Attractions
          </Typography>
        </Grid>
        <Grid item container>
          <Grid item xs={3}>
            <Tooltip arrow title="Visited">
              <AttractionsIcon
                data-testid="visited-icon"
                tabIndex={0}
                sx={{ fontSize: '2rem', color: '#009E73' }}
              />
            </Tooltip>
          </Grid>
          <Grid item xs={3}>
            <Tooltip arrow title="Not visited">
              <AttractionsIcon
                data-testid="not-visited-icon"
                tabIndex={0}
                sx={{ fontSize: '2rem', color: '#E69F00' }}
              />
            </Tooltip>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default MapLegend
