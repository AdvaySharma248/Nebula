'use client'

import React, { useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { syncUserWithBackend } from '@/lib/backend-auth'
import { useAuthStore } from '@/stores/auth-store'
import { Toaster } from 'sonner'
import AuthModal from './AuthModal'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { setUser, setLoading, setAuthModalOpen } = useAuthStore()

  useEffect(() => {
    // Sync Firebase Authentication state with Zustand store
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          await firebaseUser.reload()
        } catch (error) {
          console.warn('Could not refresh Firebase user verification state:', error)
        }

        const username = firebaseUser.displayName
          ? firebaseUser.displayName.toLowerCase().replace(/\s+/g, '')
          : firebaseUser.email
          ? firebaseUser.email.split('@')[0]
          : 'user'

        const rawProvider = firebaseUser.providerData[0]?.providerId || 'email'
        const provider = rawProvider.includes('google')
          ? 'google'
          : rawProvider.includes('github')
          ? 'github'
          : 'email'

        const usesPasswordProvider = firebaseUser.providerData.some(
          (providerData) => providerData.providerId === 'password',
        )

        if (usesPasswordProvider && !firebaseUser.emailVerified) {
          setUser(null)
          setAuthModalOpen(true, 'verify-email')
          setLoading(false)
          return
        }

        const profile = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
          username,
          emailVerified: firebaseUser.emailVerified,
        }

        setUser(profile)

        // Sync in background
        void syncUserWithBackend({
          ...profile,
          provider,
          emailVerified: firebaseUser.emailVerified,
        })
      } else {
        setUser(null)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [setUser, setLoading, setAuthModalOpen])

  return (
    <>
      {children}
      <AuthModal />
      <Toaster 
        theme="dark" 
        position="bottom-right" 
        toastOptions={{
          style: {
            background: '#151515',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            color: '#F5F5F5',
            fontFamily: 'var(--font-inter)',
            borderRadius: '12px',
          },
        }}
      />
    </>
  )
}
