import { Box, LinearProgress, Typography } from '@mui/material'

const formatTime = (totalSeconds) => {
  const s = Math.max(0, totalSeconds)
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`
}

/**
 * Display only. The countdown comes from useSessionTimer,
 * so the admin, user and screen pages all show the same value.
 */
const Timer = ({ secondsLeft, seconds = 15, label, size = 'medium' }) => {
  const urgent = secondsLeft <= 5 && secondsLeft > 0
  const big = size === 'large'

  return (
    <Box
      role="timer"
      sx={{
        display: 'inline-block',
        boxSizing: 'border-box',
        width: big ? 'clamp(150px, 15vw, 260px)' : 130,
        px: big ? 'clamp(12px, 1.6vw, 28px)' : 2,
        pt: big ? 0.5 : 0.25,
        pb: big ? 'clamp(8px, 1vw, 14px)' : 1,
        borderRadius: 3,
        bgcolor: '#14161c',
        border: '3px solid #fff',
        boxShadow: '0 2px 8px rgba(0,0,0,0.25)',
        textAlign: 'center',
        color: urgent ? '#ff6b6b' : '#fff',
      }}
    >
      <Box
        sx={{
          fontFamily: '"Roboto Mono", ui-monospace, Menlo, Consolas, monospace',
          fontWeight: 700,
          fontSize: big ? 'clamp(1.4rem, 2.6vw, 2.6rem)' : '1.6rem',
          letterSpacing: '0.06em',
          fontVariantNumeric: 'tabular-nums',
          lineHeight: 1.4,
        }}
      >
        {label ?? formatTime(secondsLeft)}
      </Box>

      {!label && (
        <LinearProgress
          variant="determinate"
          color={urgent ? 'error' : 'primary'}
          value={seconds > 0 ? Math.min(100, (secondsLeft / seconds) * 100) : 0}
          sx={{
            mt: 0.5,
            height: big ? 6 : 4,
            borderRadius: 3,
            bgcolor: 'rgba(255,255,255,0.25)',
            visibility: label ? 'hidden' : 'visible',
            '& .MuiLinearProgress-bar': { transition: 'transform 1s linear' },
          }}
        />
      )}
    </Box>
  )
}

export default Timer
