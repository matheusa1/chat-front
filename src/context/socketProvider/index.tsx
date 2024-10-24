'use client'

import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from 'react'
import { io, Socket } from 'socket.io-client'

type SocketContextType = {
  socket?: Socket
  connectSocket: () => void
  disconnectSocket: () => void
  enterRoom: (roomId: string) => void
}

const socketContext = createContext<SocketContextType>({} as SocketContextType)

export const SocketProvider: FC<{
  children: ReactNode
}> = ({ children }) => {
  const [socketState, setSocketState] = useState<Socket>()

  const connectSocket = () => {
    const socket = io(process.env.NEXT_PUBLIC_URL_SOCKET as string)
    setSocketState(socket)
    return socket
  }

  const enterRoom = async (roomId: string) => {
    const socket = socketState || connectSocket()
    socket.emit('enterRoom', roomId)
  }

  const disconnectSocket = () => {
    socketState?.disconnect()
    setSocketState(undefined)
  }

  const values = useMemo(
    () => ({ socket: socketState, connectSocket, disconnectSocket, enterRoom }),
    [socketState],
  )

  return (
    <socketContext.Provider value={values}>{children}</socketContext.Provider>
  )
}

export const useSocket = () => {
  const context = useContext(socketContext)
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider')
  }
  return context
}
