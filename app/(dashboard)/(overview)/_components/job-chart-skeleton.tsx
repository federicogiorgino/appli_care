'use client'

import { format, subDays } from 'date-fns'
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'

const skeletonData = Array.from({ length: 7 }, (_, index) => {
  const date = subDays(new Date(), 6 - index) // Reverse the order to start from 7 days ago
  return {
    day: format(date, 'dd-MMM'),
    APPLIED: Math.floor(Math.random() * 5) + 1,
    INTERVIEWING: Math.floor(Math.random() * 5) + 1,
    OFFER: Math.floor(Math.random() * 5) + 1,
    REJECTED: Math.floor(Math.random() * 5) + 1,
  }
})

const chartConfig = {
  APPLIED: { label: 'Applied', color: 'hsl(var(--primary))' },
  INTERVIEWING: { label: 'Interviewing', color: 'hsl(var(--primary))' },
  OFFER: { label: 'Offer', color: 'hsl(var(--primary))' },
  REJECTED: { label: 'Rejected', color: 'hsl(var(--primary))' },
}

function JobChartSkeleton() {
  return (
    <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
      <BarChart data={skeletonData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="day"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <ChartTooltip content={<ChartTooltipContent hideLabel />} />
        <ChartLegend
          content={<ChartLegendContent />}
          className="max-sm:hidden"
        />
        {Object.entries(chartConfig).map(([key, { color }]) => (
          <Bar key={key} dataKey={key} fill={color} radius={4} opacity={0.1} />
        ))}
      </BarChart>
    </ChartContainer>
  )
}

export { JobChartSkeleton }
