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
              title="Usuarios"
              value={1234}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#1677ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Cursos"
              value={56}
              prefix={<BookOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Activos"
              value={89}
              prefix={<RocketOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Completados"
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
          Este es un proyecto base de React configurado con:
        </Paragraph>
        <ul className="list-disc pl-6">
          <li>Vite - Build tool moderno y r&aacute;pido</li>
          <li>Ant Design - Biblioteca de componentes UI</li>
          <li>Tailwind CSS - Utilidades CSS</li>
          <li>Axios - Cliente HTTP</li>
          <li>React Router - Navegaci&oacute;n</li>
          <li>i18next - Internacionalizaci&oacute;n (Espa&ntilde;ol/Ingl&eacute;s)</li>
          <li>Context API - Estado global</li>
          <li>TypeScript - Tipado est&aacute;tico</li>
        </ul>
      </Card>
    </div>
  )
}
