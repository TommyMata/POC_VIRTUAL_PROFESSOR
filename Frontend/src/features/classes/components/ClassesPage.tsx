import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Row, Col, Empty, Spin, message, Button, Space, Card } from 'antd'
import { ReloadOutlined } from '@ant-design/icons'
import type { Course } from '@/types/api.types'
import './ClassesPage.css'

export function ClassesPage() {
  const navigate = useNavigate()
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)

  const fetchCourses = async () => {
    setLoading(true)
    try {
      // TODO: Reemplazar con llamada real al endpoint
      // const response = await api.get(ENDPOINTS.COURSES)
      // setCourses(response.data)

      // Simulamos datos de ejemplo
      const mockCourses: Course[] = [
        {
          id: 'db-2',
          title: 'Base de Datos II',
          description:
            'Aprende SQL avanzado, diseño de bases de datos normalizadas, optimización de consultas y administración de bases de datos.',
          thumbnail:
            'https://images.unsplash.com/photo-1516321318423-f06f70504466?w=500&h=300&fit=crop',
          totalClasses: 21,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: 'react-101',
          title: 'React 101',
          description:
            'Introducción completa a React. Aprende componentes, hooks, estado y cómo construir aplicaciones web modernas.',
          thumbnail:
            'https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=500&h=300&fit=crop',
          totalClasses: 18,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: 'typescript-adv',
          title: 'TypeScript Avanzado',
          description:
            'Domina TypeScript con tipos genéricos, decoradores, patrones avanzados y mejores prácticas.',
          thumbnail:
            'https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=500&h=300&fit=crop',
          totalClasses: 24,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ]

      setCourses(mockCourses)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al cargar los cursos'
      message.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCourses()
  }, [])

  const handleCourseClick = (course: Course) => {
    navigate(`/courses/${course.id}`)
  }

  return (
    <div className="classes-page-container">
      <div className="classes-header">
        <div className="classes-header-title">
          <h1>Cursos Disponibles</h1>
          <p className="classes-header-subtitle">
            Selecciona un curso para ver todas sus clases
          </p>
        </div>
        <Space>
          <Button
            type="primary"
            icon={<ReloadOutlined />}
            onClick={fetchCourses}
            loading={loading}
          >
            Actualizar
          </Button>
        </Space>
      </div>

      <Spin spinning={loading} size="large" tip="Cargando cursos...">
        <div className="classes-grid-container">
          {courses.length > 0 ? (
            <Row gutter={[16, 16]} className="classes-grid">
              {courses.map((course) => (
                <Col key={course.id} xs={24} sm={24} md={12} lg={8}>
                  <Card
                    hoverable
                    onClick={() => handleCourseClick(course)}
                    className="course-card"
                    cover={
                      <div className="course-card-cover">
                        <img
                          src={course.thumbnail}
                          alt={course.title}
                          className="course-card-image"
                        />
                      </div>
                    }
                  >
                    <h3 className="course-card-title">{course.title}</h3>
                    <p className="course-card-description">{course.description}</p>
                    <div className="course-card-meta">
                      <span className="course-card-classes">
                        {course.totalClasses} clases
                      </span>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          ) : (
            !loading && (
              <Empty
                description="No hay cursos disponibles"
                className="classes-empty-state"
              />
            )
          )}
        </div>
      </Spin>
    </div>
  )
}
