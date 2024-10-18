'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { zodResolver } from '@hookform/resolvers/zod'

import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const createRoomSchema = z.object({
  name: z.string({ required_error: 'Nome da sala é obrigatório' }),
  description: z.string({ required_error: 'Descrição da sala é obrigatória' }),
})

type TCreateRoomSchema = z.infer<typeof createRoomSchema>

const CreateRoomForm: FC = () => {
  const form = useForm<TCreateRoomSchema>({
    resolver: zodResolver(createRoomSchema),
    defaultValues: {
      name: '',
      description: '',
    },
  })

  const onHandleCreateRoom = (data: TCreateRoomSchema) => {
    console.log(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onHandleCreateRoom)}>
        <Card>
          <CardHeader>
            <CardTitle>Criar sala</CardTitle>
            <CardDescription>
              Crie uma sala para conversar com seus amigos!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome" {...field} />
                  </FormControl>
                  <FormDescription>Escreva o nome da sua sala.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Descrição" {...field} />
                  </FormControl>
                  <FormDescription>
                    Escreva uma breve descrição da sua sala.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit">Criar sala</Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  )
}

export default CreateRoomForm
