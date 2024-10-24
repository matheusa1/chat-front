import { http } from '@/@core/common/http'
import { TCreateRoomSchema, TRoom } from '../entities/entity'

export const createRoomApi = async (
  data: TCreateRoomSchema,
): Promise<TRoom> => {
  const response = http.post<TRoom>('/room', data).then((res) => res.data)

  return response
}

export const getAllRoomsApi = async (): Promise<TRoom[]> => {
  const response = http.get<TRoom[]>('/room').then((res) => res.data)

  return response
}

export const getRoomApi = async (id: string): Promise<TRoom> => {
  const response = http.get<TRoom>(`/room/${id}`).then((res) => res.data)

  return response
}
