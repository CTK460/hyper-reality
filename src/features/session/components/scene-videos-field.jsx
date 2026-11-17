import { useEffect, useState } from 'react'
import { Alert, Stack, TextField } from '@mui/material'
import { getSceneVideos, setSceneVideo } from '../api/scene-videos.js'

export const SceneVideosField = () => {
  const [saved, setSaved] = useState({})
  const [drafts, setDrafts] = useState({})
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false
    getSceneVideos()
      .then((rows) => {
        if (!cancelled) setSaved(Object.fromEntries(rows.map((r) => [r.scene, r.intro_video_url || ''])))
      })
      .catch((err) => !cancelled && setError(err.message))
    return () => {
      cancelled = true
    }
  }, [])

  const save = async (scene) => {
    if (drafts[scene] === undefined) return
    const next = drafts[scene].trim()
    try {
      setError('')
      if (next !== (saved[scene] || '')) {
        await setSceneVideo(scene, next)
        setSaved((prev) => ({ ...prev, [scene]: next }))
      }
      setDrafts((prev) => ({ ...prev, [scene]: undefined }))
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <Stack spacing={1.5}>
      {[1, 2, 3].map((scene) => (
        <TextField
          key={scene}
          label={`Scene ${scene} first video URL (plays when you start Scene ${scene})`}
          value={drafts[scene] ?? saved[scene] ?? ''}
          onChange={(e) => setDrafts((prev) => ({ ...prev, [scene]: e.target.value }))}
          onBlur={() => save(scene)}
          fullWidth
        />
      ))}
      {error && <Alert severity="error">{error}</Alert>}
    </Stack>
  )
}
