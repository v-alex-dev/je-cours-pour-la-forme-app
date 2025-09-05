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

  async function getSessionProgression() {
    // Remplacer par l'appel API Supabase pour récupérer la progression de l'utilisateur courant avec le statut 'in_progress'
    // Exemple :
    // const { data } = await supabase.from('progression').select('exercices:exercice_id(*)').eq('user_id', userId).eq('status', 'in_progress')
    // return data.map(item => item.exercices)
    return [
      { nom: 'Cours', description: 'Cours 10 min', duree: 10 },
      { nom: 'Trottes', description: 'Trottes 5 min', duree: 10 },
    ]
  }
  async function validateSessionProgression(userId) {
    // 1. Mettre à jour la progression du jour en 'finished'
    const { data: current, error: errorCurrent } = await supabase
      .from('progression')
      .update({ status: 'finished' })
      .eq('user_id', userId)
      .eq('status', 'in_progress')
      .select()
    if (errorCurrent) throw errorCurrent

    // 2. Chercher la progression suivante (la plus proche avec status 'not_started')
    const { data: next, error: errorNext } = await supabase
      .from('progression')
      .select('*')
      .eq('user_id', userId)
      .eq('status', 'not_started')
      .order('date', { ascending: true })
      .limit(1)
    if (errorNext) throw errorNext

    // 3. Passer la progression suivante en 'in_progress' si elle existe
    if (next && next.length > 0) {
      await supabase.from('progression').update({ status: 'in_progress' }).eq('id', next[0].id)
    }
  }
  return {
    getPlans,
    getProgression,
    getSessionProgression,
    validateSessionProgression,
  }
}
