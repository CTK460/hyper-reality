import { Stack, Typography } from '@mui/material'
import { QuestionCard } from './question-card.jsx'

const SCENES = [1, 2, 3]

export const QuestionList = ({ questions, onChanged }) => {
  if (questions.length === 0) {
    return <Typography color="textSecondary">No questions yet — create one above.</Typography>
  }

  return (
    <Stack spacing={4}>
      {SCENES.map((scene) => {
        const inScene = questions.filter((q) => q.scene === scene)
        const hasStart = inScene.some((q) => q.is_first)
        return (
          <Stack key={scene} spacing={2}>
            <Typography variant="h6" component="h2">Scene {scene}</Typography>
            {inScene.length === 0 && (
              <Typography color="textSecondary">No questions in this scene yet.</Typography>
            )}
            {inScene.length > 0 && !hasStart && (
              <Typography color="warning.main">
                Choose which question starts this scene (“Set as scene start”), or the scene cannot be run.
              </Typography>
            )}
            {inScene.map((q) => (
              <QuestionCard key={q.id} question={q} allQuestions={questions} onChanged={onChanged} />
            ))}
          </Stack>
        )
      })}
    </Stack>
  )
}
