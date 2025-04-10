'use client';

import { Inter } from 'next/font/google'
import { ChakraProvider } from '@chakra-ui/react'
import { UserProvider } from '@auth0/nextjs-auth0/client'
import './globals.css'
import theme from '@/theme.config'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ChakraProvider theme={theme}>
          <UserProvider>
            {children}
          </UserProvider>
        </ChakraProvider>
      </body>
    </html>
  )
} 