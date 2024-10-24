import { z } from 'zod'
import { createRoomSchema } from '../schemas/createRoom.schema'

export type TRoom = {
  id: string
  name: string
  description: string
  clients: {
    name: string
    socketId: string
  }[]
  messages: TMessage[]
}

export type TMessage = {
  content: string
  sender: {
    id: string
    name: string
  }
  date: Date
}

export type TCreateRoomSchema = z.infer<typeof createRoomSchema>
