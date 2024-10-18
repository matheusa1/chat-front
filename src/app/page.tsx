import Col from '@/components/common/Col'
import Layout from '@/components/common/Layout'
import Row from '@/components/common/Row'
import CreateRoomForm from './components/CreateRoomForm'

export default function Home() {
  return (
    <Layout screen>
      <Row justify={'evenly'} className="h-full">
        <Col>teste</Col>
        <Col>
          <CreateRoomForm />
        </Col>
      </Row>
    </Layout>
  )
}
