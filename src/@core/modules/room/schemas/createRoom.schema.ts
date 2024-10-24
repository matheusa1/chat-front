import { z } from 'zod'

export const createRoomSchema = z.object({
  name: z.string({ required_error: 'Nome da sala é obrigatório' }),
  description: z.string({ required_error: 'Descrição da sala é obrigatória' }),
})
