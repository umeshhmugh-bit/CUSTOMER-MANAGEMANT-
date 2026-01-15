import { defineStore } from 'pinia'
import { supabase } from '../supabase'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    loading: true,
  }),

  actions: {
    async initialize() {
      // Get initial session
      const { data } = await supabase.auth.getSession()
      this.user = data.session?.user || null
      this.loading = false

      // Listen for changes
      supabase.auth.onAuthStateChange((_event, session) => {
        this.user = session?.user || null
        this.loading = false
      })
    },

    async login(email, password) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) throw error
      this.user = data.user
      return data
    },

    async register(email, password, metadata) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata,
        },
      })
      if (error) throw error
      return data
    },

    async socialLogin(provider) {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: window.location.origin + '/dashboard',
        },
      })
      if (error) throw error
    },

    async updateUser(data) {
      const { error } = await supabase.auth.updateUser(data)
      if (error) throw error
      await this.initialize() // Refresh user data
    },

    async logout() {
      await supabase.auth.signOut()
      this.user = null
    },
  },
})
