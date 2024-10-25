import { z } from 'zod'
import { sendMessageSchema } from '../schemas/sendMessage'

export type TsendMessageSchema = z.infer<typeof sendMessageSchema>
