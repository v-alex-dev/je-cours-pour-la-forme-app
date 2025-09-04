import { supabase } from './supabaseClient'

export function useSupabaseAuth() {
  // Inscription utilisateur
  const signUp = async ({ email, password, name }) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name },
      },
    })
    return { data, error }
  }

  // Connexion utilisateur
  const signIn = async ({ email, password }) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    return { data, error }
  }

  // Déconnexion
  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    return { error }
  }

  // Récupérer l'utilisateur courant
  const getUser = () => supabase.auth.getUser()

  return { signUp, signIn, signOut, getUser, supabase }
}
