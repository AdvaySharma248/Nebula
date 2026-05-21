const DEFAULT_BACKEND_PORT = '4000'

export type BackendSyncProfile = {
  uid: string
  email: string | null
  displayName: string | null
  photoURL: string | null
  username: string
  emailVerified: boolean
  provider: string
}

function backendBaseUrl() {
  const configuredUrl = process.env.NEXT_PUBLIC_BACKEND_URL?.trim()
  if (configuredUrl) return configuredUrl.replace(/\/+$/, '')

  if (typeof window !== 'undefined') {
    const { protocol, hostname } = window.location
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      const port = process.env.NEXT_PUBLIC_BACKEND_PORT || DEFAULT_BACKEND_PORT
      return `${protocol}//${hostname}:${port}`
    }
  }

  return `http://localhost:${DEFAULT_BACKEND_PORT}`
}

export async function syncUserWithBackend(profile: BackendSyncProfile) {
  try {
    const response = await fetch(`${backendBaseUrl()}/api/auth/firebase-sync`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        uid: profile.uid,
        email: profile.email || '',
        username: profile.username,
        displayName: profile.displayName || profile.username,
        avatarUrl: profile.photoURL || '',
        provider: profile.provider,
        emailVerified: profile.emailVerified,
      }),
    })
    if (!response.ok) {
      const err = await response.json()
      console.warn('Backend sync warning:', err)
    }
  } catch (error) {
    console.error('Backend sync failed. Standalone fallback active:', error)
  }
}
