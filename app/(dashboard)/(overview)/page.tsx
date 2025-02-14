import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

import { MonthlyJobStats } from './_components/monthly-job-stats'

async function OverviewPage() {
  const user = await currentUser()
  if (!user) redirect('/sign-in')

  return (
    <div className="flex-1 space-y-8">
      <MonthlyJobStats />
    </div>
  )
}

export default OverviewPage
