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
    // Stocker userId et token dans localStorage si succès
    if (data?.user && data?.session) {
      localStorage.setItem('userId', data.user.id)
      localStorage.setItem('token', data.session.access_token)
    }
    return { data, error }
  }

  // Connexion utilisateur
  const signIn = async ({ email, password }) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    // Stocker userId et token dans localStorage si succès
    if (data?.user && data?.session) {
      localStorage.setItem('userId', data.user.id)
      localStorage.setItem('token', data.session.access_token)
    }
    return { data, error }
  }

  // Déconnexion
  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    // Nettoyer le localStorage
    localStorage.removeItem('userId')
    localStorage.removeItem('token')
    return { error }
  }

  // Récupérer l'utilisateur courant
  const getUser = () => supabase.auth.getUser()

  // Récupérer userId et token depuis localStorage
  const getLocalUser = () => {
    const userId = localStorage.getItem('userId')
    const token = localStorage.getItem('token')
    return { userId, token }
  }

  return { signUp, signIn, signOut, getUser, getLocalUser, supabase }
}
