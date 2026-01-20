export const ENDPOINTS = {
  // Classes
  CLASSES: '/classes',
  CLASS_BY_ID: (id: string) => `/classes/${id}`,
  // Courses
  COURSES: '/courses',
  COURSE_BY_ID: (id: string) => `/courses/${id}`,
} as const
