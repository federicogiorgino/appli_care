'use client'

import { format } from 'date-fns'
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'

import {
  JOB_LOCATION_COLORS,
  JOB_STATUS_COLORS,
  JOB_TYPE_COLORS,
} from '@/lib/const'

import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'

export type JobDataItem = {
  day: string
  [key: string]: string | number
}

export type ChartConfigItem = {
  label: string
  color: string
}

const chartConfigs: Record<
  'status' | 'type' | 'location',
  Record<string, ChartConfigItem>
> = {
  status: {
    APPLIED: {
      label: 'Applied',
      color: JOB_STATUS_COLORS.APPLIED,
    },
    INTERVIEWING: {
      label: 'Interviewing',
      color: JOB_STATUS_COLORS.INTERVIEWING,
    },
    OFFER: {
      label: 'Offer',
      color: JOB_STATUS_COLORS.OFFER,
    },
    REJECTED: {
      label: 'Rejected',
      color: JOB_STATUS_COLORS.REJECTED,
    },
  },
  type: {
    FULL_TIME: {
      label: 'Full Time',
      color: JOB_TYPE_COLORS.FULL_TIME,
    },
    PART_TIME: {
      label: 'Part Time',
      color: JOB_TYPE_COLORS.PART_TIME,
    },
    CONTRACT: {
      label: 'Contract',
      color: JOB_TYPE_COLORS.CONTRACT,
    },
    INTERNSHIP: {
      label: 'Internship',
      color: JOB_TYPE_COLORS.INTERNSHIP,
    },
    FREELANCE: {
      label: 'Freelance',
      color: JOB_TYPE_COLORS.FREELANCE,
    },
    OTHER: {
      label: 'Other',
      color: JOB_TYPE_COLORS.OTHERS,
    },
  },
  location: {
    REMOTE: {
      label: 'Remote',
      color: JOB_LOCATION_COLORS.REMOTE,
    },
    HYBRID: {
      label: 'Hybrid',
      color: JOB_LOCATION_COLORS.HYBRID,
    },
    ON_SITE: {
      label: 'On Site',
      color: JOB_LOCATION_COLORS.ON_SITE,
    },
    OTHER: {
      label: 'Other',
      color: JOB_LOCATION_COLORS.OTHER,
    },
  },
}

type JobChartProps = {
  data: JobDataItem[]
  chartType: 'status' | 'type' | 'location'
}

function JobChart({ data, chartType }: JobChartProps) {
  const chartConfig = chartConfigs[chartType]

  return (
    <ChartContainer
      config={chartConfig as ChartConfig}
      className="min-h-[200px] w-full xl:h-[68vh]"
    >
      <BarChart data={data}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="day"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(date) => format(date, 'dd MMM')} // Show only the day
        />
        <ChartTooltip
          content={
            <ChartTooltipContent
              hideLabel
              labelFormatter={(data) => format(data, 'dd MMM')}
            />
          }
        />
        <ChartLegend
          content={<ChartLegendContent />}
          className="max-sm:hidden"
        />
        {Object.entries(chartConfig).map(([key, { color, label }]) => (
          <Bar key={key} dataKey={key} fill={color} name={label} radius={4} />
        ))}
      </BarChart>
    </ChartContainer>
  )
}

export { JobChart }
