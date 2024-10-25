import { z } from 'zod'
import { changeNameSchema } from '../schemas/changeName'

export type TChangeNameSchema = z.infer<typeof changeNameSchema>
