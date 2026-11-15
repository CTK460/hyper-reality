import { Box, Paper, Stack, Typography } from '@mui/material'

const OPTION_COLORS = ['#63c74d', '#3a46b4', '#c0392b']
const LETTERS = 'ABC'

export const VoteOptions = ({ options, myVoteOptionId, submitting, disabled, onVote }) => (
  <Stack spacing={2.5}>
    {options.map((option, index) => {
      const isMine = myVoteOptionId === option.id
      const isLocked = Boolean(myVoteOptionId) || disabled
      const color = OPTION_COLORS[index % OPTION_COLORS.length]

      return (
        <Box
          key={option.id}
          sx={{
            display: 'flex',
            alignItems: 'center',
            opacity: isLocked && !isMine ? 0.3 : 1,
            transition: 'opacity 0.2s',
          }}
        >
          <Box
            aria-hidden
            sx={{
              zIndex: 1,
              flexShrink: 0,
              width: 46,
              height: 46,
              mr: -2.5,
              borderRadius: '50%',
              bgcolor: '#fff',
              border: `4px solid ${color}`,
              color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '1.4rem',
            }}
          >
            {LETTERS[index] || index + 1}
          </Box>

          <Paper
            component="button"
            onClick={() => onVote(option.id)}
            disabled={isLocked || submitting}
            elevation={0}
            sx={{
              flex: 1,
              minHeight: 64,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              pl: 4.5,
              pr: 3,
              py: 1.5,
              borderRadius: '14px 28px 28px 14px',
              border: 0,
              bgcolor: color,
              color: '#fff',
              cursor: isLocked ? 'default' : 'pointer',
              font: 'inherit',
              fontSize: '1.05rem',
              fontWeight: 700,
              '&:disabled': { color: '#fff' },
            }}
          >
            {option.option_text}
          </Paper>
        </Box>
      )
    })}
    {myVoteOptionId && (
      <Typography variant="body2" sx={{ mt: 1, color: '#3a46b4', fontWeight: 600, textAlign: 'center' }} role="status">
        Your vote is in. Thanks for weighing in.
      </Typography>
    )}
  </Stack>
)