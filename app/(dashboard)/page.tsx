import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

async function RootPage() {
  const user = await currentUser()
  if (!user) redirect('/sign-in')

  return <div></div>
}

export default RootPage
