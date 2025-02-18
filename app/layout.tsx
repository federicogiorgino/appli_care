import { ClerkProvider } from '@clerk/nextjs'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from 'sonner'

import { Providers } from '@/components/providers'
import { ThemeProvider } from '@/components/theme-provider'

import '@/app/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Applicare',
  description: 'The job seeker best friend',
}

function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <Toaster className={inter.className} />

          <Providers>
            <ThemeProvider>{children}</ThemeProvider>
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  )
}

export default RootLayout
