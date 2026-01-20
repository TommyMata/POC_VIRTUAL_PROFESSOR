import { Card, Image, Badge, Space, Tag, Button } from 'antd'
import { PlayCircleOutlined, AudioOutlined, FileImageOutlined } from '@ant-design/icons'
import type { Class } from '@/types/api.types'
import './ClassCard.css'

interface ClassCardProps {
  classData: Class
  onClick?: () => void
}

export function ClassCard({ classData, onClick }: ClassCardProps) {
  const hasAudio = !!classData.media.audioUrl
  const hasVideo = !!classData.media.videoUrl
  const hasImages = classData.media.images.length > 0

  return (
    <Card
      hoverable
      onClick={onClick}
      className="class-card"
      cover={
        <div className="class-card-cover">
          <Image
            src={classData.thumbnail}
            alt={classData.title}
            className="class-card-image"
            preview={false}
          />
          <div className="class-card-overlay">
            <Space className="class-card-actions">
              {hasVideo && (
                <Button
                  type="primary"
                  shape="circle"
                  size="large"
                  icon={<PlayCircleOutlined />}
                  onClick={(e) => e.stopPropagation()}
                />
              )}
            </Space>
          </div>
          {hasAudio && (
            <Badge
              count={<AudioOutlined className="class-card-badge-icon" />}
              className="class-card-badge"
            />
          )}
        </div>
      }
    >
      <div className="class-card-content">
        <h3 className="class-card-title">{classData.title}</h3>
        
        <p className="class-card-description">{classData.description}</p>

        <div className="class-card-meta">
          <Space size="small">
            <Tag color="blue">{classData.duration} min</Tag>
            {hasImages && (
              <Tag
                icon={<FileImageOutlined />}
                color="green"
              >
                {classData.media.images.length} imágenes
              </Tag>
            )}
          </Space>
        </div>

        {hasAudio || hasVideo || hasImages ? (
          <div className="class-card-media-info">
            <small className="text-neutral-600">
              {[
                hasVideo && 'Video',
                hasAudio && 'Audio',
                hasImages && `${classData.media.images.length} imágenes`,
              ]
                .filter(Boolean)
                .join(' • ')}
            </small>
          </div>
        ) : null}
      </div>
    </Card>
  )
}
