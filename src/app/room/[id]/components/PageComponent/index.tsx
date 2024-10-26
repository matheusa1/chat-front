'use client'

import { TsendMessageSchema } from '@/@core/modules/message/entities'
import { sendMessageSchema } from '@/@core/modules/message/schemas/sendMessage'
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
import { Form, FormControl, FormField } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { useSocket } from '@/context/socketProvider'
import { zodResolver } from '@hookform/resolvers/zod'
import { Send } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import notification from '@/assets/sounds/notification.mp3'
import left from '@/assets/sounds/left.mp3'
import enter from '@/assets/sounds/enter.mp3'
import { TChangeNameSchema } from '@/@core/modules/client/entities/entity'
import { changeNameSchema } from '@/@core/modules/client/schemas/changeName'

export type TPageComponent = {
  id: string
}

const PageComponent: React.FC<TPageComponent> = ({ id }) => {
  const { socket } = useSocket()
  const [roomData, setRoomData] = useState<TRoom>({} as TRoom)
  const scrollRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const audioRef = useRef<HTMLAudioElement>(null)
  const audioLeftRef = useRef<HTMLAudioElement>(null)
  const audioEnterRef = useRef<HTMLAudioElement>(null)

  const form = useForm<TsendMessageSchema>({
    resolver: zodResolver(sendMessageSchema),
    defaultValues: {
      content: '',
    },
  })

  const changeNameForm = useForm<TChangeNameSchema>({
    resolver: zodResolver(changeNameSchema),
    defaultValues: {
      name: '',
    },
  })

  const getRoomData = useCallback(async () => {
    const room = await getRoomApi(id)
    setRoomData(room)
  }, [])

  useEffect(() => {
    getRoomData()
  }, [id])

  const changeName = (data: TChangeNameSchema) => {
    socket?.emit('changeName', {
      name: data.name,
      roomId: id,
    })
  }

  const sendMessage = (data: TsendMessageSchema) => {
    socket?.emit('sendMessage', {
      content: data.content,
      roomId: id,
    })

    form.reset()
  }

  useEffect(() => {
    socket?.on('newMessage', (data: TMessage) => {
      setRoomData((prev) => ({
        ...prev,
        messages: [data, ...prev.messages],
      }))
      audioRef.current?.play()
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

      audioLeftRef.current?.play()
    })

    socket?.on('userEnter', (data: { socketId: string; name: string }) => {
      setRoomData((prev) => ({
        ...prev,
        clients: [...(prev?.clients as []), data],
      }))

      audioEnterRef.current?.play()
    })

    socket?.on('changeName', (data: { socketId: string; name: string }) => {
      setRoomData((prev) => {
        const clients = prev.clients.map((client) => {
          if (client.socketId === data.socketId) {
            return {
              ...client,
              name: data.name,
            }
          }
          return client
        })
        return {
          ...prev,
          clients: clients,
        }
      })
    })

    return () => {
      socket?.off('userEnter')
      socket?.off('userLeave')
      socket?.off('newMessage')
      socket?.off('changeName')
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
              <audio src={notification} ref={audioRef}>
                <track kind="captions" />
              </audio>
              <audio src={left} ref={audioLeftRef}>
                <track kind="captions" />
              </audio>
              <audio src={enter} ref={audioEnterRef}>
                <track kind="captions" />
              </audio>
              <ScrollArea ref={scrollRef} className="h-[80vh]">
                <Col justify={'end'} align={'start'} className="pr-5">
                  {roomData.messages?.map((message) => (
                    <Card
                      key={`${message.sender.id}-${message.date}`}
                      className="text-zinc-400 mb-4 w-fit data-[mine=true]:self-end animate-in"
                      data-mine={socket?.id === message.sender.id}
                    >
                      <CardContent
                        className="p-2 data-[mine=true]:bg-primary/50 rounded-lg"
                        data-mine={socket?.id === message.sender.id}
                      >
                        <CardHeader className="px-0 py-1 text-black dark:text-white">
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
              <Form {...form}>
                <form onSubmit={form.handleSubmit(sendMessage)}>
                  <Row className="w-full">
                    <FormField
                      control={form.control}
                      name="content"
                      render={({ field }) => (
                        <FormControl>
                          <Input
                            className="w-full"
                            placeholder="Nome"
                            {...field}
                          />
                        </FormControl>
                      )}
                    />
                    <Button type={'submit'} size="icon">
                      <Send />
                    </Button>
                  </Row>
                </form>
              </Form>
            </Layout>

            <Row className="size-full" align={'start'}>
              <Separator orientation="vertical" />
              <Col className="space-y-10" align={'start'} justify={'start'}>
                Usuários
                <Form {...changeNameForm}>
                  <form onSubmit={changeNameForm.handleSubmit(changeName)}>
                    <Row>
                      <FormField
                        control={changeNameForm.control}
                        name="name"
                        render={({ field }) => (
                          <FormControl>
                            <Input
                              className="w-full"
                              placeholder="Trocar nome"
                              {...field}
                            />
                          </FormControl>
                        )}
                      />
                      <Button type={'submit'}>Salvar</Button>
                    </Row>
                  </form>
                </Form>
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
