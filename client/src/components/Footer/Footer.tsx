import { Divider, Grid, Typography } from '@mui/material'

interface FooterProps {
  isDarkMode: boolean
}

const Footer = (props: FooterProps) => {
  const { isDarkMode } = props

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
