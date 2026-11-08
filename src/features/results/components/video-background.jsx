import { useEffect, useRef } from 'react'
import { Box } from '@mui/material'

export const VideoBackground = ({ videoUrl, dimmed = false, sound = false, onSoundBlocked }) => {
  const ref = useRef(null)

  useEffect(() => {
    const vid = ref.current
    if (!vid) return
    vid.muted = !sound
    const attempt = vid.play?.()
    if (attempt && typeof attempt.catch === 'function') {
      attempt.catch(() => {
        vid.muted = true
        vid.play?.()?.catch?.(() => {})
        if (sound) onSoundBlocked?.()
      })
    }
  }, [videoUrl, sound, onSoundBlocked])

  if (!videoUrl) return null

  return (
    <Box sx={{ position: 'fixed', inset: 0, overflow: 'hidden', zIndex: 0, bgcolor: '#000' }}>
      <Box
        component="video"
        ref={ref}
        key={videoUrl}
        src={videoUrl}
        autoPlay
        playsInline
        preload="auto"
        disablePictureInPicture
        disableRemotePlayback
        controlsList="nodownload nofullscreen noremoteplayback"
        onContextMenu={(e) => e.preventDefault()}
        sx={{ width: '100%', height: '100%', objectFit: 'cover', pointerEvents: 'none' }}
      />
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          bgcolor: 'rgba(11, 12, 16, 0.62)',
          opacity: dimmed ? 1 : 0,
          transition: 'opacity 0.6s ease',
        }}
      />
    </Box>
  )
}
