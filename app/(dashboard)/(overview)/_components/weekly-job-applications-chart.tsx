'use client'

import { useState } from 'react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { JobChart, JobDataItem } from './job-chart'
import { JobChartSkeleton } from './job-chart-skeleton'
import { useWeeklyJobApplicationStats } from '@/hooks/use-weekly-job-applications'

function WeeklyJobApplicationsChart() {
  const [chartType, setChartType] = useState<'status' | 'type' | 'location'>(
    'status'
  )

  const { stats, isLoading } = useWeeklyJobApplicationStats()

  const renderChartData = (chartType: 'status' | 'type' | 'location') => {
    switch (chartType) {
      case 'type':
        return stats['byType']

      case 'status':
        return stats['byStatus']

      case 'location':
        return stats['byLocation']
      default:
        return {
          period: '',
          NONE: '',
        }
    }
  }

  return (
    <Card className="col-span-1 space-y-4 lg:col-span-6 xl:col-span-7">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <p className="text-2xl font-semibold">Weekly Job Applications</p>
          <Select
            value={chartType}
            onValueChange={(value) =>
              setChartType(value as 'status' | 'type' | 'location')
            }
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select chart type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="status">By Status</SelectItem>
              <SelectItem value="type">By Type</SelectItem>
              <SelectItem value="location">By Location</SelectItem>
            </SelectContent>
          </Select>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <JobChartSkeleton />
        ) : (
          <JobChart
            data={renderChartData(chartType) as JobDataItem[]}
            chartType={chartType}
          />
        )}
      </CardContent>
    </Card>
  )
}

export { WeeklyJobApplicationsChart }
