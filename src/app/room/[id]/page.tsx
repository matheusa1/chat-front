import PageComponent from './components/PageComponent'

export type TRoomPage = {
  params: {
    id: string
  }
}

const Room: React.FC<TRoomPage> = ({ params: { id } }) => {
  return <PageComponent id={id} />
}

export default Room
