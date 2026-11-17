import { supabase } from '../../../lib/supabaseClient.js'

export const getSceneVideos = async () => {
  const { data, error } = await supabase.from('scenes').select('scene, intro_video_url').order('scene')
  if (error) throw new Error(error.message)
  return data || []
}

export const setSceneVideo = async (scene, url) => {
  const { error } = await supabase
    .from('scenes')
    .update({ intro_video_url: url || null })
    .eq('scene', scene)
  if (error) throw new Error(error.message)
}
