import { supabase } from '../../../lib/supabaseClient.js'

export const createQuestion = async ({ questionText, timerSeconds, options, displayOrder }) => {
  const { data: question, error } = await supabase
    .from('questions')
    .insert({
      question_text: questionText,
      timer_seconds: timerSeconds,
      display_order: displayOrder,
    })
    .select('id')
    .single()

  if (error) throw error

  const { error: optionsError } = await supabase.from('options').insert(
    options.map((option, index) => ({
      question_id: question.id,
      option_text: option.text,
      video_url: option.videoUrl || null,
      display_order: index,
    }))
  )

  if (optionsError) {
    await supabase.from('questions').delete().eq('id', question.id) // don't leave an empty question behind
    throw optionsError
  }

  return question
}
