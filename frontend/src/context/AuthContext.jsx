import { createContext, useCallback, useEffect, useMemo, useState } from 'react'
import * as authApi from '../services/auth'
import { setUnauthorizedHandler, tokenStore } from '../services/api'

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  // `loading` is true while we check whether a saved token is still valid.
  const [loading, setLoading] = useState(() => Boolean(tokenStore.get()))

  const logout = useCallback(() => {
    tokenStore.clear()
    setUser(null)
  }, [])

  useEffect(() => {
    setUnauthorizedHandler(logout)
  }, [logout])

  useEffect(() => {
    if (!tokenStore.get()) return
    let cancelled = false
    authApi
      .fetchMe()
      .then((u) => { if (!cancelled) setUser(u) })
      .catch(() => { if (!cancelled) { tokenStore.clear(); setUser(null) } })
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [])

  const startSession = useCallback((res) => {
    tokenStore.set(res.access_token)
    setUser(res.user)
    return res.user
  }, [])

  const login = useCallback(async (payload) => startSession(await authApi.login(payload)), [startSession])
  const register = useCallback(async (payload) => startSession(await authApi.register(payload)), [startSession])
  const saveProfile = useCallback(async (payload) => {
    const updated = await authApi.updateProfile(payload)
    setUser(updated)
    return updated
  }, [])

  const value = useMemo(
    () => ({ user, loading, isAuthenticated: Boolean(user), login, register, logout, saveProfile }),
    [user, loading, login, register, logout, saveProfile],
  )
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
