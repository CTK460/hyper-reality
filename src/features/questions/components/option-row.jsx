import { useState } from 'react'
import {  Alert, FormControlLabel, MenuItem, Stack, Switch, TextField, Typography } from '@mui/material'
import { updateOption } from '../api/update-option.js'

export const OptionRow = ({ option, otherQuestions, onChanged }) => {
  const [draftVideo, setDraftVideo] = useState(null) // only set while typing
  const [error, setError] = useState('')

  const save = async (patch) => {
    try {
      setError('')
      await updateOption(option.id, patch)
      await onChanged?.()
      setDraftVideo(null)
    } catch (err) {
      setError(err.message)
    }
  }

  const saveVideo = () => {
    if (draftVideo === null) return
    const next = draftVideo.trim()
    if (next === (option.video_url || '')) return setDraftVideo(null)
    save({ video_url: next || null })
  }

  return (
    <Stack spacing={1} sx={{ py: 1.5 }}>
      <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
      <Typography sx={{ fontWeight: 600, color: option.is_disabled ? 'text.disabled' : 'text.primary' }}>
        {option.option_text}
      </Typography>
      <FormControlLabel
        label="Disabled"
        control={
          <Switch
            size="small"
            checked={Boolean(option.is_disabled)}
            onChange={(e) => save({ is_disabled: e.target.checked })}
          />
        }
      />
    </Stack>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
        <TextField
          size="small"
          label="Video URL if this option wins"
          value={draftVideo ?? option.video_url ?? ''}
          onChange={(e) => setDraftVideo(e.target.value)}
          onBlur={saveVideo}
          fullWidth
        />
        <TextField
          select
          size="small"
          label="Next Question to Ask"
          value={option.next_question_id || ''}
          onChange={(e) => save({ next_question_id: e.target.value || null })}
          slotProps={{ select: { displayEmpty: true }, inputLabel: { shrink: true } }}
          sx={{ minWidth: { sm: 260 } }}
          fullWidth
        >
          <MenuItem value="">
            <em>Nothing. This is the last video</em>
          </MenuItem>
          {otherQuestions.map((q) => (
            <MenuItem key={q.id} value={q.id}>
              {q.question_text}
            </MenuItem>
          ))}
        </TextField>
      </Stack>
      {error && <Alert severity="error">{error}</Alert>}
    </Stack>
  )
}
