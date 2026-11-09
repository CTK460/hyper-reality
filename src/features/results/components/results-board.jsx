import { Box, Typography } from '@mui/material'
import Timer from '../../../components/timer.jsx'

const LETTER_COLORS = ['#3bb54a', '#2f6fd8', '#d63b3b']
const LETTERS = 'ABC'

const LetterBadge = ({ index }) => (
  <Box
    sx={{
      zIndex: 1,
      flexShrink: 0,
      width: 'clamp(48px, 5.2vw, 84px)',
      height: 'clamp(48px, 5.2vw, 84px)',
      mr: 'clamp(-22px, -1.8vw, -14px)',
      borderRadius: '50%',
      bgcolor: LETTER_COLORS[index % LETTER_COLORS.length],
      border: '4px solid #fff',
      boxShadow: '0 3px 10px rgba(0,0,0,0.3)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 800,
      fontSize: 'clamp(1.5rem, 2.8vw, 2.8rem)',
    }}
  >
    {LETTERS[index] || index + 1}
  </Box>
)

export const ResultsBoard = ({
  phase,
  questionText,
  options,
  counts,
  totalVoters,
  winningOptionId,
  secondsLeft,
  timerSeconds,
}) => {
  const totalVotes = Object.values(counts).reduce((a, b) => a + b, 0)
  const max = Math.max(0, ...Object.values(counts))
  const isResult = phase === 'results'
  const winnerIndex = options.findIndex((o) => o.id === winningOptionId)
  const winner = options[winnerIndex]

  return (
    <Box
      sx={{
        position: 'relative',
        zIndex: 1,
        height: '100vh',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxSizing: 'border-box',
        px: 2,
        pt: 'clamp(64px, 8vw, 120px)',
        pb: 'clamp(14px, 2.4vw, 36px)',
      }}
    >
      <Box sx={{ position: 'absolute', top: 'clamp(12px, 2.5vw, 32px)', right: 'clamp(12px, 2.5vw, 40px)' }}>
        <Timer secondsLeft={secondsLeft} seconds={timerSeconds} label={isResult ? 'RESULT' : undefined} size="large" />
      </Box>
      <Box
        sx={{
          flex: 1,
          minHeight: 0,
          width: 'min(1150px, 92vw)',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          gap: 'clamp(8px, 1vw, 16px)',
          p: 'clamp(14px, 2vw, 32px)',
          borderRadius: 5,
          bgcolor: 'rgba(176, 196, 224, 0.78)',
          backdropFilter: 'blur(6px)',
          border: '4px solid rgba(255,255,255,0.85)',
          boxShadow: '0 12px 40px rgba(0,0,0,0.35)',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            flexShrink: 0,
            px: 4,
            py: 'clamp(8px, 1.1vw, 16px)',
            borderRadius: 4,
            bgcolor: '#5f86d6',
            border: '3px solid rgba(255,255,255,0.9)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
            textAlign: 'center',
          }}
        >
          <Typography
            component="h1"
            sx={{ fontWeight: 700, fontSize: 'clamp(1.2rem, 2.4vw, 2.4rem)', lineHeight: 1.2 }}
          >
            {questionText}
          </Typography>
        </Box>
        <Box
          sx={{
            flex: 1,
            minHeight: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            gap: 'clamp(10px, 1.2vw, 20px)',
          }}
        >
          {isResult ? (
            winner && (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <LetterBadge index={winnerIndex} />
                <Box
                  sx={{
                    flex: 1,
                    minWidth: 0,
                    pl: 'clamp(28px, 3.2vw, 52px)',
                    pr: 'clamp(16px, 3vw, 48px)',
                    py: 'clamp(16px, 2.2vw, 36px)',
                    borderRadius: 4,
                    bgcolor: 'rgba(255,255,255,0.94)',
                    color: '#1d2a44',
                    textAlign: 'center',
                  }}
                >
                  <Typography sx={{ fontWeight: 700, fontSize: 'clamp(1.2rem, 2.6vw, 2.6rem)', lineHeight: 1.2 }}>
                    {winner.option_text}
                  </Typography>
                </Box>
              </Box>
            )
          ) : (
            options.map((option, i) => {
              const count = counts[option.id] || 0
              const percent = totalVotes ? Math.round((count / totalVotes) * 100) : 0
              const color = LETTER_COLORS[i % LETTER_COLORS.length]
              const isLeader = max > 0 && count === max

              return (
                <Box key={option.id} sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <LetterBadge index={i} />
                    <Box
                      sx={{
                        flex: 1,
                        minWidth: 0,
                        pl: 'clamp(28px, 3.2vw, 52px)',
                        pr: 'clamp(16px, 3vw, 48px)',
                        py: 'clamp(8px, 1.2vw, 20px)',
                        borderRadius: 4,
                        bgcolor: 'rgba(255,255,255,0.94)',
                        color: '#1d2a44',
                        border: '3px solid rgba(255,255,255,0.95)',
                        boxShadow: isLeader ? `0 0 0 3px ${color}88` : 'none',
                        textAlign: 'center',
                        transition: 'box-shadow 0.4s ease',
                      }}
                    >
                      <Typography sx={{ fontWeight: 700, fontSize: 'clamp(1.05rem, 2vw, 2rem)', lineHeight: 1.2 }}>
                        {option.option_text}
                      </Typography>
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      ml: 'calc(clamp(48px, 5.2vw, 84px) - clamp(14px, 1.8vw, 22px))',
                      position: 'relative',
                      height: 'clamp(30px, 3.4vw, 54px)',
                      borderRadius: 9,
                      bgcolor: '#808b9e',
                      boxSizing: 'border-box',
                      overflow: 'hidden',
                    }}
                  >
                    <Box
                      sx={{
                        width: `${percent}%`,
                        height: '100%',
                        bgcolor: color,
                        borderRadius: 9,
                        transition: 'width 0.5s ease',
                      }}
                    />
                    <Typography
                      sx={{
                        position: 'absolute',
                        top: '50%',
                        left: `${percent}%`,
                        transform: percent >= 14 ? 'translate(-100%, -50%)' : 'translate(0, -50%)',
                        px: 'clamp(8px, 1vw, 16px)',
                        color: percent >= 14 ? '#fff' : '#1d2a44',
                        fontWeight: 800,
                        lineHeight: 1,
                        fontSize: 'clamp(0.95rem, 1.7vw, 1.7rem)',
                        fontVariantNumeric: 'tabular-nums',
                        transition: 'left 0.5s ease',
                      }}
                    >
                      {percent}%
                    </Typography>
                  </Box>
                </Box>
              )
            })
          )}
        </Box>

        {!isResult && (
          <Typography
            sx={{
              flexShrink: 0,
              textAlign: 'center',
              color: 'rgba(29,42,68,0.8)',
              fontWeight: 600,
              fontSize: 'clamp(0.9rem, 1.3vw, 1.3rem)',
            }}
          >
            {totalVotes} of {totalVoters} responded
          </Typography>
        )}
      </Box>
    </Box>
  )
}
