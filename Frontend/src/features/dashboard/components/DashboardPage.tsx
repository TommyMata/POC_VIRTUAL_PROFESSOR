import { Card, Typography, Row, Col, Statistic } from 'antd'
import {
  UserOutlined,
  BookOutlined,
  RocketOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons'
import { useTranslation } from 'react-i18next'

const { Title, Paragraph } = Typography

export function DashboardPage() {
  const { t } = useTranslation()

  return (
    <div>
      <Title level={2}>{t('dashboard.title')}</Title>
      <Paragraph className="text-neutral-600">{t('dashboard.description')}</Paragraph>

      <Row gutter={[16, 16]} className="mt-6">
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title={t('dashboard.stats.users')}
              value={1234}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#1677ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title={t('dashboard.stats.courses')}
              value={56}
              prefix={<BookOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title={t('dashboard.stats.active')}
              value={89}
              prefix={<RocketOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title={t('dashboard.stats.completed')}
              value={432}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
      </Row>

      <Card className="mt-6">
        <Title level={4}>{t('dashboard.welcome')}</Title>
        <Paragraph>
          {t('dashboard.intro')}
        </Paragraph>
        <ul className="list-disc pl-6">
          <li>{t('dashboard.technologies.vite')}</li>
          <li>{t('dashboard.technologies.antd')}</li>
          <li>{t('dashboard.technologies.tailwind')}</li>
          <li>{t('dashboard.technologies.axios')}</li>
          <li>{t('dashboard.technologies.router')}</li>
          <li>{t('dashboard.technologies.i18n')}</li>
          <li>{t('dashboard.technologies.context')}</li>
          <li>{t('dashboard.technologies.typescript')}</li>
        </ul>
      </Card>
    </div>
  )
}
