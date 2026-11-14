import { Box, Typography } from '@mui/material'
import robot from '../../../assets/Robot mobile.png'

const COPY = {
  not_started: { title: 'Waiting for the session to start', sub: 'Welcome to the show!' },
  idle: { title: 'Look at the play in front of you!', sub: 'The first question and options will appear in a while' },
  video: { title: 'Look at the play in front of you!', sub: 'The question and options will appear in a while' },
}


export const IdleScreen = ({ phase, voterName }) => {
  const copy = COPY[phase]
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ bgcolor: '#5b78c7', color: '#fff', px: 5, py: 5 }}>
        <Box sx={{ maxWidth: 560, mx: 'auto', textAlign: 'center' }}>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
            {copy.title}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          px: 5,
        }}
      >
        <Typography variant="h4" sx={{ maxWidth: 560, fontWeight: 700, color: '#1d2a44', lineHeight: 1.3 }}>
          {copy.sub}
        </Typography>
        <Typography variant="h5" sx={{ maxWidth: 560, fontWeight: 700, color: '#8a8d97', lineHeight: 1.3, pt: 10 }}>
          IntELLAgence not Available
        </Typography>
        <Box component="img" src={robot} alt="" sx={{ width: 150, height: 'auto', mt: 4 }} />
      </Box>
    </Box>
  )
}