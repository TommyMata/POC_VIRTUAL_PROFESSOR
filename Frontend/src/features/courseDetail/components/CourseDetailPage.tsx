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
      // TODO: Replace with real API call
      // const response = await api.get(ENDPOINTS.COURSE_BY_ID(courseId))
      // setCourse(response.data.course)

      // Mock data for "Database II" course
      const mockCourse: CourseDetail = {
        id: courseId || 'db-2',
        title: 'Base de Datos II',
        description:
          'Aprende SQL avanzado, diseño de bases de datos normalizadas, optimización de consultas y administración de bases de datos. Este curso te preparará para trabajar con sistemas de bases de datos en producción.',
        thumbnail:
          'https://images.unsplash.com/photo-1516321318423-f06f70504466?w=800&h=400&fit=crop',
        totalClasses: 21,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        classes: Array.from({ length: 21 }, (_, i) => ({
          id: `class-${i + 1}`,
          title: `Clase ${i + 1}: ${[
              'Introducción a Bases de Datos',
              'Modelo Relacional',
              'SQL Básico - SELECT',
              'SQL Básico - WHERE y Operadores',
              'SQL - JOIN Operations',
              'SQL - Aggregate Functions',
              'SQL - GROUP BY y HAVING',
              'Subqueries y Consultas Complejas',
              'Índices y Optimización',
              'Normalización - 1NF',
              'Normalización - 2NF y 3NF',
              'Transacciones y ACID',
              'Constraints y Triggers',
              'Vistas y Stored Procedures',
              'Backup y Recovery',
              'Seguridad en Bases de Datos',
              'Replicación y Distribución',
              'NoSQL vs SQL',
              'MongoDB Basics',
              'Performance Tuning',
              'Proyecto Final',
            ][i] || `Contenido Clase ${i + 1}`
            }`,
          description: `Contenido detallado de la clase ${i + 1} del curso Base de Datos II`,
          thumbnail: `https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=500&h=280&fit=crop&t=${i}`,
          duration: 30,
          order: i + 1,
          media: {
            videoUrl: `https://example.com/video/db2-class-${i + 1}.mp4`,
            images: [
              {
                id: `img-${i}-1`,
                url: `https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=800`,
                alt: `Clase ${i + 1}`,
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
    console.log('Selected class:', classData)
    // TODO: Navigate to class playback page
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
