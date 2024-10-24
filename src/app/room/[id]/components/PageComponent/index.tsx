'use client'

import { TMessage, TRoom } from '@/@core/modules/room/entities/entity'
import { getRoomApi } from '@/@core/modules/room/service/service'
import Col from '@/components/common/Col'
import Layout from '@/components/common/Layout'
import Row from '@/components/common/Row'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { useSocket } from '@/context/socketProvider'
import { Send } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useCallback, useEffect, useRef, useState } from 'react'

export type TPageComponent = {
  id: string
}

const PageComponent: React.FC<TPageComponent> = ({ id }) => {
  const { socket } = useSocket()
  const [roomData, setRoomData] = useState<TRoom>({} as TRoom)
  const [message, setMessage] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const getRoomData = useCallback(async () => {
    const room = await getRoomApi(id)
    setRoomData(room)
  }, [])

  useEffect(() => {
    getRoomData()
  }, [id])

  const sendMessage = () => {
    socket?.emit('sendMessage', {
      content: message,
      roomId: id,
    })
  }

  useEffect(() => {
    socket?.on('newMessage', (data: TMessage) => {
      setRoomData((prev) => ({
        ...prev,
        messages: [...prev.messages, data],
      }))
    })

    socket?.on('userLeave', (data: { socketId: string }) => {
      setRoomData((prev) => {
        const clients = prev.clients.filter(
          (client) => client.socketId !== data.socketId,
        )
        return {
          ...prev,
          clients: clients,
        }
      })
    })

    socket?.on('userEnter', (data: { socketId: string; name: string }) => {
      setRoomData((prev) => ({
        ...prev,
        clients: [...prev?.clients, data],
      }))
    })

    return () => {
      socket?.off('userEnter')
      socket?.off('userLeave')
      socket?.off('newMessage')
    }
  }, [socket])

  useEffect(() => {
    if (!socket) {
      router.push('/')
    }
  }, [])

  return (
    <Layout screen className={''}>
      <Card className="size-full">
        <CardContent className="size-full pt-7">
          <div className="grid grid-cols-4 h-full">
            <Layout className="py-0 col-span-3">
              <ScrollArea ref={scrollRef} className="h-[80vh]">
                <Col justify={'start'} align={'start'} className="pr-5">
                  {roomData.messages?.map((message) => (
                    <Card
                      key={`${message.sender.id}-${message.date}`}
                      className="text-zinc-400 mb-4 w-fit data-[mine=true]:self-end"
                      data-mine={socket?.id === message.sender.id}
                    >
                      <CardContent
                        className="p-2 data-[mine=true]:bg-primary/50 rounded-lg"
                        data-mine={socket?.id === message.sender.id}
                      >
                        <CardHeader className="px-0 py-1">
                          <CardTitle>{message.content}</CardTitle>
                        </CardHeader>
                        <CardDescription>
                          {message.sender.name} -{' '}
                          {new Date(message.date).toLocaleTimeString()}
                        </CardDescription>
                      </CardContent>
                    </Card>
                  ))}
                </Col>
              </ScrollArea>
              <Row>
                <Input
                  placeholder="Digite sua mensagem"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <Button onClick={sendMessage} size="icon">
                  <Send />
                </Button>
              </Row>
            </Layout>

            <Row className="size-full" align={'start'}>
              <Separator orientation="vertical" />
              <Col className="space-y-10" align={'start'} justify={'start'}>
                Usuários
                <Col justify={'start'} align={'start'}>
                  {roomData?.clients?.map((client) => (
                    <div className="text-zinc-400" key={client.socketId}>
                      {client.name} {socket?.id === client.socketId && '(Você)'}
                    </div>
                  ))}
                </Col>
              </Col>
            </Row>
          </div>
        </CardContent>
      </Card>
    </Layout>
  )
}

export default PageComponent
