import { Suspense, lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Loading } from '@components/common/Loading'
import { MainLayout } from '@components/layout/MainLayout'
import { ROUTES } from '@config/routes'

// Lazy loaded pages
const DashboardPage = lazy(() =>
  import('@features/dashboard').then((module) => ({ default: module.DashboardPage }))
)

const CoursePage = lazy(() =>
  import('@features/course').then((module) => ({ default: module.CoursePage }))
)

const CoursesPage = lazy(() =>
  import('@features/courses').then((module) => ({ default: module.CoursesPage }))
)

const CourseDetailPage = lazy(() =>
  import('@features/courseDetail').then((module) => ({ default: module.CourseDetailPage }))
)

export function AppRouter() {
  return (
    <Suspense fallback={<Loading fullScreen />}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path={ROUTES.COURSE_DETAIL} element={<CourseDetailPage />} />
          <Route path={ROUTES.COURSES} element={<CoursesPage />} />
          <Route path={ROUTES.COURSE} element={<CoursePage />} />
          <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />
          <Route path={ROUTES.HOME} element={<Navigate to={ROUTES.COURSES} replace />} />
        </Route>
        <Route path="*" element={<Navigate to={ROUTES.COURSES} replace />} />
      </Routes>
    </Suspense>
  )
}
