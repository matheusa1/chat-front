'use client'

import { TRoom } from '@/@core/modules/room/entities/entity'
import Row from '@/components/common/Row'
import { Button, buttonVariants } from '@/components/ui/button'
import { useSocket } from '@/context/socketProvider'
import { ColumnDef } from '@tanstack/react-table'
import { User } from 'lucide-react'
import Link from 'next/link'

export const columns: ColumnDef<TRoom>[] = [
  {
    accessorKey: 'name',
    header: 'Nome',
  },
  {
    accessorKey: 'description',
    header: 'Descrição',
  },
  {
    accessorKey: 'clients',
    header: '',
    cell: ({ row }) => (
      <Row className="text-emerald-500">
        <User className="size-4" /> {(row.getValue('clients') as []).length}
      </Row>
    ),
  },
  {
    accessorKey: 'id',
    header: 'Ação',
    cell: ({ row }) => {
      const id: string = row.getValue('id')
      const path = `/room/${id}`
      const { enterRoom } = useSocket()

      return (
        <Link
          onClick={() => enterRoom(id)}
          className={buttonVariants({ variant: 'default' })}
          href={path}
        >
          Entrar
        </Link>
      )
    },
  },
]
