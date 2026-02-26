import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Row, Col, Empty, Spin, message, Button, Space, Breadcrumb } from 'antd'
import { ArrowLeftOutlined, ReloadOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import { ClassCard } from '@components/common/ClassCard'
import { CourseMetric } from '@components/common/CourseMetric'
import type { CourseDetail, Class } from '@/types/api.types'
import { PageHeader } from '@/components'

export function CourseDetailPage() {
  const { t } = useTranslation()
  const { courseId } = useParams<{ courseId: string }>()
  const navigate = useNavigate()
  const [course, setCourse] = useState<CourseDetail | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchCourseDetail = async () => {
    setLoading(true)
    try {
      // Mock data for demonstration - replace with API call
      // const response = await api.get(ENDPOINTS.COURSE_BY_ID(courseId))
      // setCourse(response.data.course)

      // Mock data for "Advanced Database Systems" course
      const mockCourse: CourseDetail = {
        id: courseId || 'advanced-db',
        title: 'Advanced Database Systems',
        description:
          'Master advanced SQL techniques, normalized database design, query optimization, and database administration. This comprehensive course prepares you for production-level database systems.',
        thumbnail:
          'https://picsum.photos/800/400?random=database', // 🎯 Thumbnail principal que carga bien
        totalClasses: 21,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        classes: Array.from({ length: 21 }, (_, i) => ({
          id: `class-${i + 1}`,
          title: `Lesson ${i + 1}: ${[
              'Introduction to Database Systems',
              'Relational Model Fundamentals',
              'Basic SQL - SELECT Queries',
              'SQL Filtering - WHERE Clauses',
              'SQL JOIN Operations',
              'Aggregate Functions',
              'GROUP BY and HAVING Clauses',
              'Subqueries and Complex Queries',
              'Indexing and Optimization',
              'First Normal Form (1NF)',
              'Second and Third Normal Forms',
              'Transactions and ACID Properties',
              'Constraints and Triggers',
              'Views and Stored Procedures',
              'Backup and Recovery Strategies',
              'Database Security',
              'Replication and Distribution',
              'NoSQL vs Relational Databases',
              'MongoDB Fundamentals',
              'Performance Tuning',
              'Final Project Implementation',
            ][i] || `Database Concepts ${i + 1}`
            }`,
          description: `Comprehensive content for lesson ${i + 1} of Advanced Database Systems`,
          thumbnail: `http://localhost:8000/uploads/preview.png`, // 🎯 Imagen consistente profesional
          duration: 30,
          order: i + 1,
          media: {
            videoUrl: `http://localhost:8000/uploads/video_f25b141c.mp4`, // 🎯 URL completa del backend
            images: [
              {
                id: `img-${i}-1`,
                url: `http://localhost:8000/uploads/preview.png`,
                alt: `Lesson ${i + 1}`,
                order: 1,
              },
            ],
          },
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        })),
      }

      setCourse(mockCourse)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : t('courseDetail.loadError')
      message.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCourseDetail()
  }, [courseId])

  const handleClassClick = (classData: Class) => {
    // Navigate to class playback interface
    // Implementation would handle routing to video player
  }

  return (
    <div className="w-full flex flex-col h-full">
      {/* Breadcrumb and buttons */}
      <div className="flex justify-between items-center mb-6 gap-4 max-md:flex-col max-md:items-start">
        <div className="flex-1">
          <Breadcrumb
            items={[
              {
                title: (
                  <Button
                    type="link"
                    onClick={() => navigate('/classes')}
                    icon={<ArrowLeftOutlined />}
                  >
                    {t('courseDetail.classes')}
                  </Button>
                ),
              },
              {
                title: course?.title,
              },
            ]}
          />
        </div>
        <Space>
          <Button
            type="primary"
            icon={<ReloadOutlined />}
            onClick={fetchCourseDetail}
            loading={loading}
          >
            {t('common.update')}
          </Button>
        </Space>
      </div>

      <Spin spinning={loading} size="large" tip={t('courseDetail.loading')}>
        {course ? (
          <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
            {/* Course information */}
            <div className="mb-10 pb-8 border-b border-neutral-200">
              <PageHeader
                title={course.title}
                description={course.description}
              />
              <div className="flex gap-8 flex-wrap max-lg:gap-6 max-md:flex-col max-md:gap-4">
                <CourseMetric
                  label={t('courseDetail.totalClasses')}
                  value={course.totalClasses}
                />
                <CourseMetric
                  label={t('courseDetail.durationPerClass')}
                  value={`30 ${t('classCard.minutes')}`}
                />
                <CourseMetric
                  label={t('courseDetail.totalDuration')}
                  value={
                    course.totalClasses * 30 >= 60
                      ? `${Math.floor((course.totalClasses * 30) / 60)}h ${(course.totalClasses * 30) % 60}m`
                      : `${course.totalClasses * 30}m`
                  }
                />
              </div>
            </div>

            {/* Classes grid */}
            <div className="mb-8">
              <h2 className="mb-6 text-xl font-semibold text-neutral-800 max-md:text-lg">
                {t('courseDetail.courseClasses')} ({course.classes.length})
              </h2>
              <Row gutter={[16, 16]} className="w-full">
                {course.classes.map((classData) => (
                  <Col key={classData.id} xs={24} sm={24} md={12} lg={6}>
                    <ClassCard
                      classData={classData}
                      onClick={() => handleClassClick(classData)}
                    />
                  </Col>
                ))}
              </Row>
            </div>
          </div>
        ) : (
          !loading && (
            <Empty
              description={t('courseDetail.notFound')}
              className="flex items-center justify-center h-[400px] w-full"
            />
          )
        )}
      </Spin>
    </div>
  )
}
