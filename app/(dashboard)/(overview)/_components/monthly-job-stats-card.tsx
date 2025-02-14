import { JobApplicationStatus } from '@prisma/client'

import { cn } from '@/lib/utils'

import { JobStatusIcon } from '@/components/job-status-icon'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

import { JobStats } from '@/types/stats'

type MonthlyJobStatsCardProps = {
  jobStats: JobStats
}

function MonthlyJobStatsCard({ jobStats }: MonthlyJobStatsCardProps) {
  const percentageChange =
    jobStats.jobs.lastMonth === 0
      ? jobStats.jobs.currentMonth > 0
        ? 100
        : 0
      : ((jobStats.jobs.currentMonth - jobStats.jobs.lastMonth) /
          jobStats.jobs.lastMonth) *
        100

  return (
    <Card className="space-y-2">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl">
          {jobStats.status.charAt(0).toUpperCase() +
            jobStats.status.slice(1).toLowerCase()}
        </CardTitle>

        <JobStatusIcon status={jobStats.status as JobApplicationStatus} />
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-md font-semibold text-muted-foreground">
            {jobStats.jobs.currentMonth}{' '}
            {jobStats.jobs.currentMonth === 1 ? 'Application' : 'Applications'}
          </p>
          <div
            className={cn(
              'flex flex-col items-end text-sm font-bold',
              percentageChange > 0
                ? 'text-green-600'
                : percentageChange < 0
                  ? 'text-red-600'
                  : 'text-muted-foreground'
            )}
          >
            {percentageChange > 0 && '+'}
            {percentageChange.toFixed(0)}%
            <p className="text-xs text-muted-foreground">vs last month</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function MonthlyJobStatsCardSkeleton() {
  return (
    <Card className="space-y-3">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <Skeleton className="h-10 w-[100px]" />
        <Skeleton className="h-5 w-5 rounded-full" />
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center justify-between">
          <Skeleton className="h-5 w-[120px]" />
          <div className="flex flex-col items-end">
            <Skeleton className="h-4 w-[60px]" />
            <Skeleton className="mt-1 h-3 w-[80px]" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export { MonthlyJobStatsCard, MonthlyJobStatsCardSkeleton }
