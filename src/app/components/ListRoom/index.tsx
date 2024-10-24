'use client'

import { TRoom } from '@/@core/modules/room/entities/entity'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { FC, useEffect } from 'react'
import { columns } from './columns'
import { DataTable } from './dataTable'
import { useQuery } from '@tanstack/react-query'
import { getAllRoomsApi } from '@/@core/modules/room/service/service'
import { ScrollArea } from '@/components/ui/scroll-area'
import Row from '@/components/common/Row'
import Col from '@/components/common/Col'
import { Button } from '@/components/ui/button'
import { RefreshCcw } from 'lucide-react'
import { useSocket } from '@/context/socketProvider'

const tableColumns = [
  {
    key: 'id',
    title: 'nome',
  },
]

const rooms: TRoom[] = [
  {
    clients: [],
    id: '1',
    name: 'Sala 1',
    description: 'Sala 1',
    messages: [],
  },
]

const ListRoom: FC = () => {
  const { disconnectSocket } = useSocket()
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['roomsList'],
    queryFn: getAllRoomsApi,
  })

  useEffect(() => {
    disconnectSocket()
  }, [])

  return (
    <Card className="w-full">
      <CardHeader>
        <Row justify={'between'}>
          <Col align={'start'} className="space-y-2">
            <CardTitle>Salas</CardTitle>
            <CardDescription>Lista de salas</CardDescription>
          </Col>
          <Button onClick={() => refetch()} size={'icon'}>
            <RefreshCcw />
          </Button>
        </Row>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-80">
          <DataTable columns={columns} data={data ?? []} loading={isLoading} />
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

export default ListRoom
