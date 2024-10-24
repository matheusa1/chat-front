'use client'

import './globals.css'
import { Poppins } from 'next/font/google'
import { ThemeProvider } from '@/context/themeProvider'
import ToggleTheme from './components/ToggleTheme'
import { SocketProvider } from '@/context/socketProvider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from '@/components/ui/sonner'

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--poppins-font',
  weight: ['400', '500', '600', '700'],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const queryClient = new QueryClient()

  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ToggleTheme />
          <QueryClientProvider client={queryClient}>
            <SocketProvider>
              {children}
              <Toaster />
            </SocketProvider>
          </QueryClientProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
