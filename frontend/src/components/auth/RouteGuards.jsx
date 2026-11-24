import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { FullPageSpinner } from '../ui/Spinner'

/** Only logged-in users get through; everyone else goes to /login and comes back after. */
export function ProtectedRoute() {
  const { isAuthenticated, loading } = useAuth()
  const location = useLocation()
  if (loading) return <FullPageSpinner />
  if (!isAuthenticated) return <Navigate to="/login" replace state={{ from: location.pathname }} />
  return <Outlet />
}

/** Login/register pages are pointless once you're signed in. */
export function GuestRoute() {
  const { isAuthenticated, loading } = useAuth()
  if (loading) return <FullPageSpinner />
  if (isAuthenticated) return <Navigate to="/dashboard" replace />
  return <Outlet />
}
