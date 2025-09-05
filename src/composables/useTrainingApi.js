// src/composables/useTrainingApi.js
// Ce composable encapsule la récupération des plans d'entraînement via Supabase
import { supabase } from './supabaseClient'

export function useTrainingApi() {
  async function getPlans() {
    // Requête Supabase avec toutes les relations imbriquées
    const { data, error } = await supabase.from('saisons').select(`
        id, nom, description,
        semaines (
          id, numero,
          etapes (
            id, nom,
            etape_exercice (
              exercice_id,
              exercices (
                id, nom, description, duree
              )
            )
          )
        )
      `)
    console.log('Supabase getPlans response:', { data, error })
    if (error) throw error
    return data
  }

  // Nouvelle méthode indépendante pour la progression
  async function getProgression(userId) {
    const { data, error } = await supabase
      .from('progression')
      .select('status')
      .eq('user_id', userId)
    if (error) throw error
    const total_steps = data.length
    const completed_steps = data.filter(
      (row) => row.status === 'completed' || row.status === 'in_progress',
    ).length
    return { completed_steps, total_steps }
  }

  return { getPlans, getProgression }
}
