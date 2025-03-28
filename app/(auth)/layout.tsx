import React from 'react'

import '@/app/globals.css'

function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-full">
      <div className="flex w-full items-center justify-center lg:w-1/2">
        {children}
      </div>
      <div className="relative hidden h-full w-1/2 items-center justify-center bg-gray-100 dark:bg-zinc-900 lg:flex">
        <div className="h-60 w-60 animate-pulse rounded-full bg-gradient-to-tr from-primary to-primary-foreground" />
        <div className="absolute bottom-0 h-1/2 w-full bg-gray-100/10 backdrop-blur-lg dark:bg-zinc-900/10" />
      </div>
    </div>
  )
}

export default AuthLayout
