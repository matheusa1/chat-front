'use client'

import { TCreateRoomSchema } from '@/@core/modules/room/entities/entity'
import { createRoomSchema } from '@/@core/modules/room/schemas/createRoom.schema'
import { createRoomApi } from '@/@core/modules/room/service/service'
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
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

const CreateRoomForm: FC = () => {
  const queryClient = useQueryClient()
  const form = useForm<TCreateRoomSchema>({
    resolver: zodResolver(createRoomSchema),
    defaultValues: {
      name: '',
      description: '',
    },
  })

  const { mutateAsync: createRoomFn, isPending } = useMutation({
    mutationKey: ['createRoom'],
    mutationFn: createRoomApi,
    onSuccess: () => {
      form.reset()
      toast.success('Sala criada com sucesso!', {
        position: 'top-right',
        richColors: true,
      })
      queryClient.refetchQueries({
        queryKey: ['roomsList'],
      })
    },
    onError: (err) => {
      console.log(err)
    },
  })

  const onHandleCreateRoom = (data: TCreateRoomSchema) => {
    createRoomFn(data)
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
            <Button type="submit" loading={isPending}>
              Criar sala
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  )
}

export default CreateRoomForm
