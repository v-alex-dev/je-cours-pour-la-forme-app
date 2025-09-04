import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

const supabase = createClient(supabaseUrl, supabaseAnonKey)

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
