import { useCallback, useState } from 'react'
import { Box, Button } from '@mui/material'
import { useSessionState } from '../../features/session/hooks/use-session-state.js'
import { useSessionTimer } from '../../features/session/hooks/use-session-timer.js'
import { useCurrentQuestion } from '../../features/session/hooks/use-current-question.js'
import { useLiveResults } from '../../features/results/hooks/use-live-results.js'
import { VideoBackground } from '../../features/results/components/video-background.jsx'
import { ResultsBoard } from '../../features/results/components/results-board.jsx'
import { MessageScreen } from '../../features/results/components/message-screen.jsx'

const QUESTION_PHASES = ['question', 'voting', 'results']
const VIDEO_PHASES = ['idle', 'question', 'voting', 'results', 'video']

export const DisplayRoute = () => {
  const [blocked, setBlocked] = useState(false)
  const [clicked, setClicked] = useState(false)
  const soundOn = clicked || !blocked
  const handleBlocked = useCallback(() => setBlocked(true), [])

  const { state, loading } = useSessionState()
  const timer = useSessionTimer(state, { autoFinish: true })

  const phase = state?.phase
  const questionId = QUESTION_PHASES.includes(phase) ? state.current_question_id : null
  const { question } = useCurrentQuestion(questionId)
  const { counts, totalVoters } = useLiveResults(questionId, phase)

  const showBoard = Boolean(questionId && question)
  const videoUrl = VIDEO_PHASES.includes(phase) ? state.current_video_url : null

  return (
    <Box sx={{ position: 'relative', minHeight: '100vh', bgcolor: '#0b0c10' }}>
      <VideoBackground videoUrl={videoUrl} dimmed={showBoard} sound={soundOn} onSoundBlocked={handleBlocked} />

      {blocked && !clicked && (
        <Box sx={{ position: 'fixed', inset: 0, zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'rgba(11,12,16,0.85)' }}>
          <Button variant="contained" size="large" onClick={() => setClicked(true)}>
            Click to start
          </Button>
        </Box>
      )}

      {(loading || !state || phase === 'not_started') && (
        <MessageScreen title="Waiting for the session to start" />
      )}
      {phase === 'ended' && <MessageScreen title="Thanks for taking part!" pulsing={false} />}
      {phase === 'idle' && !videoUrl && <MessageScreen title="Get ready…" />}

      {showBoard && (
        <ResultsBoard
          phase={phase}
          questionText={question.question_text}
          options={question.options}
          counts={counts}
          totalVoters={totalVoters}
          winningOptionId={state.winning_option_id}
          secondsLeft={timer.secondsLeft}
          timerSeconds={state.timer_seconds}
        />
      )}
    </Box>
  )
}
