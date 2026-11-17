import { supabase } from '../../../lib/supabaseClient.js'

const call = async (fn, args) => {
  const { error } = await supabase.rpc(fn, args)
  if (error) throw new Error(error.message)
}

export const startSession = () => call('admin_start_session')
export const startScene = (scene) => call('admin_start_scene', { p_scene: scene })
export const sendQuestion = () => call('admin_send_question')
export const startTimer = () => call('admin_start_timer')
export const endScene = () => call('admin_end_scene')
export const nextVideo = () => call('admin_next_video')
export const endSession = () => call('admin_end_session')
