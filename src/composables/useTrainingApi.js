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
  return { getPlans }
}
