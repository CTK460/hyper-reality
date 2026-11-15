import { Box, Container, Paper } from '@mui/material'
import bg from '../../assets/check-bg.png'

export const CenteredPage = ({ children, maxWidth = 440 }) => (
  <Box
    sx={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      px: 3,
      backgroundImage: `url(${bg})`,
      backgroundSize: 'cover',
    }}
  >
    <Container disableGutters sx={{ maxWidth, m: 0 }}>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, sm: 4 },
          borderRadius: 3,
          border: '1px solid',
          borderColor: 'divider',
          background: '#fff',
          boxShadow: 'none',
        }}
      >
        {children}
      </Paper>
    </Container>
  </Box>
)
