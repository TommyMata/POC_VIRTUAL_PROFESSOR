export const ROUTES = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  COURSE: '/course',
  COURSE_DETAIL: '/courses/:courseId',
  COURSES: '/courses',
} as const

export type RouteKey = keyof typeof ROUTES
export type RoutePath = (typeof ROUTES)[RouteKey]
