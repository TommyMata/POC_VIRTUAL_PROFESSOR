import { Suspense, lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Loading } from '@components/common/Loading'
import { MainLayout } from '@components/layout/MainLayout'
import { ROUTES } from '@config/routes'

// Lazy loaded pages
const DashboardPage = lazy(() =>
  import('@features/dashboard').then((module) => ({ default: module.DashboardPage }))
)
const CoursesPage = lazy(() =>
  import('@features/courses').then((module) => ({ default: module.CoursesPage }))
)

export function AppRouter() {
  return (
    <Suspense fallback={<Loading fullScreen />}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />
          <Route path={ROUTES.COURSES} element={<CoursesPage />} />
          <Route path={ROUTES.HOME} element={<Navigate to={ROUTES.DASHBOARD} replace />} />
        </Route>
        <Route path="*" element={<Navigate to={ROUTES.DASHBOARD} replace />} />
      </Routes>
    </Suspense>
  )
}
