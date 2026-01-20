import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Row, Col, Empty, Spin, message, Button, Space, Breadcrumb } from 'antd'
import { ArrowLeftOutlined, ReloadOutlined } from '@ant-design/icons'
import { ClassCard } from '@components/common/ClassCard'
import type { CourseDetail, Class } from '@/types/api.types'
import './CourseDetailPage.css'

export function CourseDetailPage() {
  const { courseId } = useParams<{ courseId: string }>()
  const navigate = useNavigate()
  const [course, setCourse] = useState<CourseDetail | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchCourseDetail = async () => {
    setLoading(true)
    try {
      // TODO: Reemplazar con llamada real al endpoint
      // const response = await api.get(ENDPOINTS.COURSE_BY_ID(courseId))
      // setCourse(response.data.course)

      // Simulamos datos de ejemplo para "Base de Datos II"
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
          title: `Clase ${i + 1}: ${
            [
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
      const errorMessage = err instanceof Error ? err.message : 'Error al cargar el curso'
      message.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCourseDetail()
  }, [courseId])

  const handleClassClick = (classData: Class) => {
    console.log('Clase seleccionada:', classData)
    // TODO: Navegar a la página de reproducción de la clase
  }

  return (
    <div className="course-detail-page-container">
      {/* Breadcrumb y botones */}
      <div className="course-detail-header">
        <div className="course-detail-breadcrumb">
          <Breadcrumb
            items={[
              {
                title: (
                  <Button
                    type="link"
                    onClick={() => navigate('/classes')}
                    icon={<ArrowLeftOutlined />}
                  >
                    Clases
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
            Actualizar
          </Button>
        </Space>
      </div>

      <Spin spinning={loading} size="large" tip="Cargando curso...">
        {course ? (
          <div className="course-detail-content">
            {/* Información del curso */}
            <div className="course-detail-info">
              <h1 className="course-detail-title">{course.title}</h1>
              <p className="course-detail-description">{course.description}</p>
              <div className="course-detail-stats">
                <div className="stat-item">
                  <span className="stat-label">Total de Clases:</span>
                  <span className="stat-value">{course.totalClasses}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Duración por Clase:</span>
                  <span className="stat-value">30 minutos</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Duración Total:</span>
                  <span className="stat-value">
                    {course.totalClasses * 30 >= 60
                      ? `${Math.floor((course.totalClasses * 30) / 60)}h ${(course.totalClasses * 30) % 60}m`
                      : `${course.totalClasses * 30}m`}
                  </span>
                </div>
              </div>
            </div>

            {/* Grid de clases */}
            <div className="course-detail-classes">
              <h2 className="classes-section-title">
                Clases del Curso ({course.classes.length})
              </h2>
              <Row gutter={[16, 16]} className="classes-grid">
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
              description="No se encontró el curso"
              className="course-detail-empty-state"
            />
          )
        )}
      </Spin>
    </div>
  )
}
