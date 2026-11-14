import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Alert, Box, Stack, Typography } from '@mui/material'
import { CenteredPage } from '../../components/layout/centered-page.jsx'
import { voterStorage } from '../../features/voters/utils/voter-storage.js'
import { useCastVote } from '../../features/voting/hooks/use-cast-vote.js'
import { VoteOptions } from '../../features/voting/components/vote-options.jsx'
import robot from '../../assets/Robot mobile.png'
import Timer from '../../components/timer.jsx'
import { useSessionState } from '../../features/session/hooks/use-session-state.js'
import { useSessionTimer } from '../../features/session/hooks/use-session-timer.js'
import { useCurrentQuestion } from '../../features/session/hooks/use-current-question.js'
import { IdleScreen } from '../../features/voting/components/idle-screen.jsx'
import { useLiveResults } from '../../features/results/hooks/use-live-results.js'

const QUESTION_PHASES = ['question', 'voting', 'results']

export const VoteRoute = () => {
  const navigate = useNavigate()
  const voterId = voterStorage.getId()
  const voterName = voterStorage.getName()

  useEffect(() => {
    if (!voterId) navigate('/')
  }, [voterId, navigate])

  const { state, loading } = useSessionState()
  const timer = useSessionTimer(state) // voter phones only display it; display/admin close voting
  const phase = state?.phase
  const questionId = QUESTION_PHASES.includes(phase) ? state.current_question_id : null

  const { question } = useCurrentQuestion(questionId)
  const { myVoteOptionId, submitting, error, castVote } = useCastVote({
    questionId,
    voterId,
    onInvalidVoter: () => {
      voterStorage.clear()
      navigate('/')
    },
  });

  const { counts } = useLiveResults(phase === 'results' ? questionId : null, phase)

  if (!voterId) return null

  if (loading || !state) {
    return (
      <CenteredPage>
        <Typography variant="h5" component="h1">Loading…</Typography>
      </CenteredPage>
    )
  }

  if (phase === 'ended') {
    return (
      <CenteredPage>
        <Stack spacing={1.5} sx={{ textAlign: 'center' }}>
          <Typography variant="h4" component="h1">Thank you for taking part!</Typography>
          <Typography color="textSecondary">The session has ended.</Typography>
        </Stack>
      </CenteredPage>
    )
  }

  if (!QUESTION_PHASES.includes(phase)) {
    return (
      <IdleScreen phase={phase} voterName={voterName} />
    )
  }

  if (!question) {
    return (
      <CenteredPage>
        <Stack spacing={1.5} alignItems="center" textAlign="center">
          <Typography variant="overline" fontWeight={600}>
            Signed in as {voterName || 'you'}
          </Typography>
          <Typography variant="h4" component="h2">Waiting for the next question</Typography>
        </Stack>
      </CenteredPage>
    )
  }

  if (phase === 'results') {
    const myOption = question.options.find((o) => o.id === myVoteOptionId)
    const winnerIndex = question.options.findIndex((o) => o.id === state.winning_option_id)
    const winner = question.options[winnerIndex]
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', bgcolor: '#fff' }}>
      <Timer
        variant="band"
        secondsLeft={timer.secondsLeft}
        seconds={state.timer_seconds}
        label={"RESULT"}
      />

      <Box sx={{ bgcolor: '#5b78c7', color: '#fff', px: 3, py: 3 }}>
        <Box sx={{ maxWidth: 560, mx: 'auto', textAlign: 'center' }}>
          <Typography variant="overline" component="h1" sx={{ display: 'block', fontWeight: 600, opacity: 0.85 }}>
            Live question
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 700, lineHeight: 1.25 }} component="h2">
            {question.question_text}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 5, minHeight: '60vh'}}>
        <Typography sx={{ fontWeight: 700, fontSize: 'clamp(1.2rem, 2.6vw, 2.6rem)', lineHeight: 1.2, padding: 3, color:'#5b78c7'}}>
          WINNING OPTION
        </Typography>
        <Box
          sx={{
            minWidth: 0,
            padding: 5,
            borderRadius: 4,
            bgcolor: 'rgba(175, 189, 224, 0.80)',
            color: '#1d2a44',
            textAlign: 'center',
          }}
        >
          <Typography sx={{ fontWeight: 700, fontSize: 'clamp(1.2rem, 2.6vw, 2.6rem)', lineHeight: 1.2 }}>
            {winner.option_text}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', px: 2, pb: 2 }}>
        <Box component="img" src={robot} alt="robot" sx={{ width: 110, height: 'auto' }} />
      </Box>
    </Box>
    )
  }

  const votingClosed = phase === 'voting' && timer.expired

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', bgcolor: '#fff' }}>
      <Timer
        variant="band"
        secondsLeft={timer.secondsLeft}
        seconds={state.timer_seconds}
        label={votingClosed ? "TIME'S UP" : undefined}
      />

      <Box sx={{ bgcolor: '#5b78c7', color: '#fff', px: 3, py: 3 }}>
        <Box sx={{ maxWidth: 560, mx: 'auto', textAlign: 'center' }}>
          <Typography variant="overline" component="h1" sx={{ display: 'block', fontWeight: 600, opacity: 0.85 }}>
            Live question
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 700, lineHeight: 1.25 }} component="h2">
            {question.question_text}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', px: 3, py: 4 }}>
        <Stack spacing={3} sx={{ width: '100%', maxWidth: 560 }}>
          <VoteOptions
            options={question.options}
            myVoteOptionId={myVoteOptionId}
            submitting={submitting}
            disabled={votingClosed}
            onVote={castVote}
          />

          {error && <Alert severity="warning">{error}</Alert>}
          {votingClosed && !myVoteOptionId && (
            <Typography color="textSecondary" align="center" role="status">Time’s up - results coming…</Typography>
          )}
        </Stack>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', px: 2, pb: 2 }}>
        <Box component="img" src={robot} alt="robot" sx={{ width: 110, height: 'auto' }} />
      </Box>
    </Box>
  )
}
