export interface ApiResponse<T> {
  data: T
  status: number
  success: boolean
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    pageSize: number
    total: number
    totalPages: number
  }
}

export interface ApiError {
  message: string
  code?: string
  status?: number
  details?: Record<string, unknown>
}

// Class types
export interface ClassImage {
  id: string
  url: string
  alt: string
  order: number
}

export interface ClassMedia {
  audioUrl?: string
  videoUrl?: string
  images: ClassImage[]
}

export interface Class {
  id: string
  title: string
  description: string
  thumbnail: string
  duration: number // en minutos
  order: number
  media: ClassMedia
  createdAt: string
  updatedAt: string
}

export interface ClassesResponse {
  classes: Class[]
  total: number
}

// Course types
export interface Course {
  id: string
  title: string
  description: string
  thumbnail: string
  totalClasses: number
  createdAt: string
  updatedAt: string
}

export interface CourseDetail extends Course {
  classes: Class[]
}

export interface CourseDetailResponse {
  course: CourseDetail
}
