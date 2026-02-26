import { Card, Image, Badge, Space, Tag, Button } from 'antd'
import { PlayCircleOutlined, AudioOutlined, FileImageOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import type { Class } from '@/types/api.types'
import './ClassCard.css'

interface ClassCardProps {
  classData: Class
  onClick?: () => void
}

export function ClassCard({ classData, onClick }: ClassCardProps) {
  const { t } = useTranslation()
  const [isPlayingVideo, setIsPlayingVideo] = useState(false)
  const hasAudio = !!classData.media.audioUrl
  const hasVideo = !!classData.media.videoUrl
  const hasImages = classData.media.images.length > 0

  const handlePlayVideo = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsPlayingVideo(true)
  }

  const handleStopVideo = () => {
    setIsPlayingVideo(false)
  }

  return (
    <Card
      hoverable
      onClick={onClick}
      className="class-card"
      cover={
        <div className="class-card-cover">
          {isPlayingVideo && hasVideo ? (
            <video
              src={classData.media.videoUrl}
              poster={classData.thumbnail} // 🎯 Thumbnail como poster
              controls
              autoPlay
              className="class-card-video"
              style={{ width: '100%', height: '200px', objectFit: 'cover' }}
              onEnded={handleStopVideo}
              onClick={(e) => e.stopPropagation()}
            >
              Tu navegador no soporta video HTML5.
            </video>
          ) : (
            <>
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
                      onClick={handlePlayVideo}
                      style={{
                        background: 'rgba(22, 119, 255, 0.9)',
                        borderColor: 'rgba(22, 119, 255, 0.9)',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
                      }}
                    />
                  )}
                </Space>
                {hasVideo && (
                  <div className="video-indicator">
                    <PlayCircleOutlined style={{ fontSize: '16px', marginRight: '4px' }} />
                    VIDEO
                  </div>
                )}
              </div>
            </>
          )}
          {hasAudio && !isPlayingVideo && (
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
            <Tag color="blue">{classData.duration} {t('classCard.minutes')}</Tag>
            {hasImages && (
              <Tag
                icon={<FileImageOutlined />}
                color="green"
              >
                {classData.media.images.length} {t('classCard.images')}
              </Tag>
            )}
          </Space>
        </div>

        {hasAudio || hasVideo || hasImages ? (
          <div className="class-card-media-info">
            <small className="text-neutral-600">
              {[
                hasVideo && t('classCard.video'),
                hasAudio && t('classCard.audio'),
                hasImages && `${classData.media.images.length} ${t('classCard.images')}`,
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
