import { useState } from 'react'
import { Card, Form, Input, Button, message, Space, Typography } from 'antd'
import { PlusOutlined, FileOutlined } from '@ant-design/icons'
import { FileUpload } from '@components/common/FileUpload'
import type { RcFile } from 'antd/es/upload'
import './CoursePage.css'

const { Title, Paragraph, Text } = Typography

export function CoursePage() {
  const [form] = Form.useForm()
  const [selectedFile, setSelectedFile] = useState<RcFile | null>(null)
  const [loading, setLoading] = useState(false)

  const handleFileSelected = (file: RcFile) => {
    setSelectedFile(file)
    message.success(`Archivo "${file.name}" seleccionado correctamente`)
  }

  const handleGenerateCurriculum = async () => {
    const values = form.getFieldsValue()

    if (!values.courseTitle) {
      message.error('Por favor ingresa el título del curso')
      return
    }

    if (!selectedFile) {
      message.error('Por favor selecciona un archivo con el temario')
      return
    }

    setLoading(true)
    try {
      // Simulamos la generación del temario
      // Aquí irá la llamada a tu API
      console.log('Generando temario...', {
        courseTitle: values.courseTitle,
        courseDescription: values.courseDescription,
        file: selectedFile.name,
      })

      // Simulamos un delay
      await new Promise((resolve) => setTimeout(resolve, 2000))

      message.success('¡Temario generado exitosamente!')
      form.resetFields()
      setSelectedFile(null)
    } catch (error) {
      message.error('Error al generar el temario')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="course-page-container">
      <div className="course-header">
        <Title level={2}>Crear Nuevo Curso</Title>
        <Paragraph className="text-neutral-600">
          Carga el temario de tu curso y personalizalo con título y descripción
        </Paragraph>
      </div>

      <Card className="course-form-card">
        <Form
          form={form}
          layout="vertical"
          className="course-form"
        >
          {/* Título del Curso */}
          <Form.Item
            label={
              <Space>
                <span>Título del Curso</span>
                <Text type="danger">*</Text>
              </Space>
            }
            name="courseTitle"
            rules={[
              {
                required: true,
                message: 'El título del curso es requerido',
              },
              {
                min: 5,
                message: 'El título debe tener al menos 5 caracteres',
              },
            ]}
          >
            <Input
              placeholder="Ej: Python para Principiantes"
              size="large"
              prefix={<FileOutlined />}
            />
          </Form.Item>

          {/* Descripción del Curso */}
          <Form.Item
            label="Descripción del Curso"
            name="courseDescription"
          >
            <Input.TextArea
              placeholder="Describe brevemente el contenido y objetivos del curso"
              rows={4}
              maxLength={500}
              showCount
            />
          </Form.Item>

          {/* Área de Drag & Drop */}
          <Form.Item
            label={
              <Space>
                <span>Temario del Curso</span>
                <Text type="danger">*</Text>
              </Space>
            }
            className="file-upload-form-item"
          >
            <FileUpload onFileSelected={handleFileSelected} />
            {selectedFile && (
              <div className="selected-file-info">
                <FileOutlined /> {selectedFile.name}
              </div>
            )}
          </Form.Item>
        </Form>
      </Card>

      {/* Botón Generar */}
      <div className="course-actions">
        <Button
          type="primary"
          size="large"
          icon={<PlusOutlined />}
          onClick={handleGenerateCurriculum}
          loading={loading}
          className="generate-button"
        >
          Generar Temario
        </Button>
      </div>
    </div>
  )
}
