import { create } from 'zustand'
import { auth } from '@/lib/firebase'
import { signOut as firebaseSignOut } from 'firebase/auth'

export interface UserProfile {
  uid: string
  email: string | null
  displayName: string | null
  photoURL: string | null
  username?: string
  emailVerified?: boolean
}

interface AuthState {
  user: UserProfile | null
  isGuest: boolean
  loading: boolean
  authModalOpen: boolean
  authModalTab: 'login' | 'signup' | 'verify-email'
  redirectViewAfterAuth: string | null // For redirecting gracefully after authentication

  setUser: (user: UserProfile | null) => void
  setGuest: (isGuest: boolean) => void
  setLoading: (loading: boolean) => void
  setAuthModalOpen: (open: boolean, tab?: 'login' | 'signup' | 'verify-email') => void
  setAuthModalTab: (tab: 'login' | 'signup' | 'verify-email') => void
  setRedirectViewAfterAuth: (view: string | null) => void
  logout: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isGuest: false,
  loading: true,
  authModalOpen: false,
  authModalTab: 'login',
  redirectViewAfterAuth: null,

  setUser: (user) => set({ user, isGuest: user ? false : false }),
  setGuest: (isGuest) => set({ isGuest, user: isGuest ? null : null }),
  setLoading: (loading) => set({ loading }),
  setAuthModalOpen: (open, tab = 'login') => set({ authModalOpen: open, authModalTab: tab }),
  setAuthModalTab: (tab) => set({ authModalTab: tab }),
  setRedirectViewAfterAuth: (view) => set({ redirectViewAfterAuth: view }),
  logout: async () => {
    try {
      await firebaseSignOut(auth)
    } catch (e) {
      console.error("Firebase signout error:", e)
    }
    set({ user: null, isGuest: false, redirectViewAfterAuth: null })
  }
}))
