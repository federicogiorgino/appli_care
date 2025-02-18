import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'

import { MonthlyJobStats } from './_components/monthly-job-stats'
import { RecentJobApplications } from './_components/recent-job-applications'
import { WeeklyJobApplicationsChart } from './_components/weekly-job-applications-chart'

async function OverviewPage() {
  const user = await currentUser()
  if (!user) redirect('/sign-in')

  return (
    <Suspense>
      <div className="flex-1 space-y-8">
        <MonthlyJobStats />
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-10">
          <WeeklyJobApplicationsChart />
          <RecentJobApplications />
        </div>
      </div>
    </Suspense>
  )
}

export default OverviewPage
