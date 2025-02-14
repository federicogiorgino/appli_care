'use client'

import {
  MonthlyJobStatsCard,
  MonthlyJobStatsCardSkeleton,
} from './monthly-job-stats-card'
import { useMonthlyJobStats } from '@/hooks/use-monthly-job-stats'

function MonthlyJobStats() {
  const { monthlyJobStats, isLoading, error } = useMonthlyJobStats()

  if (isLoading || !!error) {
    return (
      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <MonthlyJobStatsCardSkeleton key={i} />
        ))}
      </div>
    )
  }

  return (
    <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      {isLoading
        ? Array.from({ length: 4 }).map((_, i) => (
            <MonthlyJobStatsCardSkeleton key={i} />
          ))
        : monthlyJobStats.map((el, i) => (
            <MonthlyJobStatsCard jobStats={el} key={i} />
          ))}
    </div>
  )
}

export { MonthlyJobStats }
