import Col from '@/components/common/Col'
import Layout from '@/components/common/Layout'
import Row from '@/components/common/Row'
import CreateRoomForm from './components/CreateRoomForm'
import ListRoom from './components/ListRoom'

export default function Home() {
  return (
    <Layout screen>
      <Row justify={'evenly'} className="h-full">
        <Col>
          <ListRoom />
        </Col>
        <Col>
          <CreateRoomForm />
        </Col>
      </Row>
    </Layout>
  )
}
