import { useState } from 'react'
import { Upload, message } from 'antd'
import { InboxOutlined } from '@ant-design/icons'
import type { RcFile } from 'antd/es/upload'
import './FileUpload.css'

export interface FileUploadProps {
  onFileSelected: (file: RcFile) => void
  maxSize?: number // in MB
  acceptedFormats?: string[]
}

export function FileUpload({
  onFileSelected,
  maxSize = 10,
  acceptedFormats = ['.pdf', '.doc', '.docx'],
}: FileUploadProps) {
  const [isDragActive, setIsDragActive] = useState(false)

  const beforeUpload = (file: RcFile) => {
    const isValidFormat = acceptedFormats.some((format) =>
      file.name.toLowerCase().endsWith(format)
    )

    if (!isValidFormat) {
      message.error(
        `Solo se permiten archivos: ${acceptedFormats.join(', ')}`
      )
      return false
    }

    const isValidSize = file.size / 1024 / 1024 < maxSize
    if (!isValidSize) {
      message.error(`El archivo no debe superar ${maxSize}MB`)
      return false
    }

    onFileSelected(file)
    return false
  }

  return (
    <div
      className={`file-upload-container ${isDragActive ? 'active' : ''}`}
      onDragEnter={() => setIsDragActive(true)}
      onDragLeave={() => setIsDragActive(false)}
      onDragOver={(e) => e.preventDefault()}
      onDrop={() => setIsDragActive(false)}
    >
      <Upload.Dragger
        maxCount={1}
        beforeUpload={beforeUpload}
        accept={acceptedFormats.join(',')}
        onChange={() => {}}
        onDrop={() => setIsDragActive(false)}
      >
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Arrastra tu archivo aquí o haz clic para seleccionar
        </p>
        <p className="ant-upload-hint">
          Formatos permitidos: PDF, DOC, DOCX (Máximo {maxSize}MB)
        </p>
      </Upload.Dragger>
    </div>
  )
}
