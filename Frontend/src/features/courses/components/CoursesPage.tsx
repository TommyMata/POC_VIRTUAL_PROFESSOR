import { Card, Tag } from 'antd'
import { useTranslation } from 'react-i18next'
import { PageHeader } from '@components/common/PageHeader'
import { DataList } from '@components/common/DataList'

interface Course {
  id: string
  title: string
  description: string
  instructor: string
  duration: string
  level: 'beginner' | 'intermediate' | 'advanced'
}

const mockCourses: Course[] = [
  {
    id: '1',
    title: 'Introduction to React',
    description: 'Learn the fundamentals of React and build modern web applications.',
    instructor: 'John Doe',
    duration: '8 hours',
    level: 'beginner',
  },
  {
    id: '2',
    title: 'Advanced TypeScript',
    description: 'Master TypeScript with advanced types, generics, and patterns.',
    instructor: 'Jane Smith',
    duration: '12 hours',
    level: 'advanced',
  },
  {
    id: '3',
    title: 'Node.js Backend Development',
    description: 'Build scalable backend services with Node.js and Express.',
    instructor: 'Mike Johnson',
    duration: '10 hours',
    level: 'intermediate',
  },
  {
    id: '4',
    title: 'Database Design',
    description: 'Learn database modeling, SQL, and NoSQL fundamentals.',
    instructor: 'Sarah Wilson',
    duration: '6 hours',
    level: 'beginner',
  },
]

const levelColors = {
  beginner: 'green',
  intermediate: 'blue',
  advanced: 'orange',
}

export function CoursesPage() {
  const { t } = useTranslation()

  const renderCourse = (course: Course) => (
    <Card hoverable className="h-full">
      <div className="flex flex-col gap-2">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-semibold">{course.title}</h3>
          <Tag color={levelColors[course.level]}>{t(`courses.levels.${course.level}`)}</Tag>
        </div>
        <p className="text-gray-600">{course.description}</p>
        <div className="mt-auto pt-4 text-sm text-gray-500">
          <div>{t('courses.instructor')}: {course.instructor}</div>
          <div>{t('courses.duration')}: {course.duration}</div>
        </div>
      </div>
    </Card>
  )

  return (
    <div>
      <PageHeader
        title={t('courses.title')}
        description={t('courses.description')}
      />
      <DataList
        items={mockCourses}
        renderItem={renderCourse}
      />
    </div>
  )
}
