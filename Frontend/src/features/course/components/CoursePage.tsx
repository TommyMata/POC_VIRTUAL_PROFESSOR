import { useState } from 'react'
import { Card, Form, Input, message, Space, Typography } from 'antd'
import { PlusOutlined, FileOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import { FileUpload } from '@components/common/FileUpload'
import { Button } from '@components/common/Button'
import type { RcFile } from 'antd/es/upload'
import { PageHeader } from '@/components'

const { Text } = Typography

export function CoursePage() {
  const { t } = useTranslation()
  const [form] = Form.useForm()
  const [selectedFile, setSelectedFile] = useState<RcFile | null>(null)
  const [loading, setLoading] = useState(false)

  const handleFileSelected = (file: RcFile) => {
    setSelectedFile(file)
    message.success(t('course.messages.fileSelected', { fileName: file.name }))
  }

  const handleGenerateCourse = async () => {
    const values = form.getFieldsValue()

    if (!values.courseTitle) {
      message.error(t('course.messages.titleRequired'))
      return
    }

    if (!selectedFile) {
      message.error(t('course.messages.fileRequired'))
      return
    }

    setLoading(true)
    try {
      // Course generation API integration
      const courseData = {
        courseTitle: values.courseTitle,
        courseDescription: values.courseDescription,
        file: selectedFile,
      }

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 2000))

      message.success(t('course.messages.courseGenerated'))
      form.resetFields()
      setSelectedFile(null)
    } catch (error) {
      message.error(t('course.messages.courseError'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="course-page-container">
      <div className="course-header">
        <PageHeader
          title={t('course.create.title')}
          description={t('course.create.description')}
        />
      </div>

      <Card className="course-form-card">
        <Form
          form={form}
          layout="vertical"
        >
          <Form.Item
            label={
              <Space>
                <span>{t('course.form.courseTitle')}</span>
                <Text type="danger">*</Text>
              </Space>
            }
            name="courseTitle"
            rules={[
              {
                required: true,
                message: t('course.form.validation.titleRequired'),
              },
              {
                min: 5,
                message: t('course.form.validation.titleMinLength'),
              },
            ]}
          >
            <Input
              placeholder={t('course.form.placeholders.title')}
              size="large"
              prefix={<FileOutlined />}
            />
          </Form.Item>

          <Form.Item
            label={t('course.form.courseDescription')}
            name="courseDescription"
          >
            <Input.TextArea
              placeholder={t('course.form.placeholders.description')}
              rows={4}
              maxLength={500}
              showCount
            />
          </Form.Item>

          <Form.Item
            label={
              <Space>
                <span>{t('course.form.agenda')}</span>
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

      <div className="flex justify-end mt-6">
        <Button
          type="primary"
          size="large"
          icon={<PlusOutlined />}
          onClick={handleGenerateCourse}
          loading={loading}
        >
          {t('course.form.generateCourse')}
        </Button>
      </div>
    </div>
  )
}
