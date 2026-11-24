import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Landing from './pages/Landing'
import ComingSoon from './pages/ComingSoon'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<ComingSoon title="Log in" phase="Phase 2" />} />
        <Route path="/register" element={<ComingSoon title="Sign up" phase="Phase 2" />} />
        <Route path="*" element={<ComingSoon title="This page" phase="a later phase" />} />
      </Routes>
    </>
  )
}
