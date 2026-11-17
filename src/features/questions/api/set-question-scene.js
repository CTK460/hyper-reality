import { supabase } from '../../../lib/supabaseClient.js'

export const setQuestionScene = async (questionId, scene) => {
  const { error } = await supabase.rpc('admin_set_question_scene', { p_id: questionId, p_scene: scene })
  if (error) throw new Error(error.message)
}
