'use server'

import { currentUser } from '@clerk/nextjs/server'
import { JobApplicationStatus, JobLocation, JobType } from '@prisma/client'
import { addDays, format, startOfDay, subDays } from 'date-fns'

import { prisma } from '@/lib/prisma'

import { JobStats } from '@/types/stats'

export async function getMonthlyJobApplicationStats() {
  try {
    const user = await currentUser()

    if (!user) {
      return { status: 'error', error: 'Unauthorized' }
    }
    // Get the first day of current month
    const currentMonthStart = new Date()
    currentMonthStart.setDate(1)
    currentMonthStart.setHours(0, 0, 0, 0)

    // Get the first day of last month
    const lastMonthStart = new Date(currentMonthStart)
    lastMonthStart.setMonth(lastMonthStart.getMonth() - 1)

    // Get the first day of next month (to use as end date for current month)
    const nextMonthStart = new Date(currentMonthStart)
    nextMonthStart.setMonth(nextMonthStart.getMonth() + 1)

    // Query current month applications
    const currentMonthApplications = await prisma.jobApplication.groupBy({
      by: ['applicationStatus'],
      where: {
        userId: user.id,
        applicationDate: {
          gte: currentMonthStart,
          lt: nextMonthStart,
        },
      },
      _count: {
        applicationStatus: true,
      },
    })

    // Query last month applications
    const lastMonthApplications = await prisma.jobApplication.groupBy({
      by: ['applicationStatus'],
      where: {
        userId: user.id,
        applicationDate: {
          gte: lastMonthStart,
          lt: currentMonthStart,
        },
      },
      _count: {
        applicationStatus: true,
      },
    })

    // Create a map to store combined stats
    const statsMap = new Map<string, JobStats>()

    // Initialize stats for all possible statuses
    Object.values(JobApplicationStatus).forEach((status) => {
      statsMap.set(status, {
        status,
        jobs: {
          lastMonth: 0,
          currentMonth: 0,
        },
      })
    })

    // Process last month stats
    lastMonthApplications.forEach((stat) => {
      const status = stat.applicationStatus
      const currentStats = statsMap.get(status)
      if (currentStats) {
        currentStats.jobs.lastMonth = stat._count.applicationStatus
      }
    })

    // Process current month stats
    currentMonthApplications.forEach((stat) => {
      const status = stat.applicationStatus
      const currentStats = statsMap.get(status)
      if (currentStats) {
        currentStats.jobs.currentMonth = stat._count.applicationStatus
      }
    })

    // Convert map to array and return only statuses with non-zero counts

    return {
      status: 'success',
      data: Array.from(statsMap.values()),
    }
  } catch (error) {
    return { status: 'error', error: 'Error fetching jobs application stats' }
  }
}

export async function getWeeklyJobApplicationStats() {
  try {
    const user = await currentUser()

    if (!user) {
      console.error('No user found')
      return { status: 'error', error: 'Unauthorized' }
    }

    // Get the current date and 7 days ago
    const endDate = startOfDay(new Date())
    const startDate = subDays(endDate, 6)

    // Generate array of last 7 days
    const days = Array.from({ length: 7 }, (_, i) => {
      const date = addDays(startDate, i)
      return format(date, 'yyyy-MM-dd')
    })

    // Initialize data structure with 0 counts
    const byStatus = days.map((day) => ({
      day,
      APPLIED: 0,
      INTERVIEWING: 0,
      OFFER: 0,
      REJECTED: 0,
    }))

    const byType = days.map((day) => ({
      day,
      FULL_TIME: 0,
      PART_TIME: 0,
      CONTRACT: 0,
      INTERNSHIP: 0,
      FREELANCE: 0,
      OTHER: 0,
    }))

    const byLocation = days.map((day) => ({
      day,
      HYBRID: 0,
      ON_SITE: 0,
      REMOTE: 0,
      OTHER: 0,
    }))

    // Fetch applications grouped by day and status
    const statusResults = await prisma.$queryRaw<
      Array<{ day: string; status: JobApplicationStatus; count: bigint }>
    >`
    SELECT 
      TO_CHAR(DATE_TRUNC('day', "applicationDate"), 'YYYY-MM-DD') as day,
      "applicationStatus" as status,
      COUNT(*) as count
    FROM job_applications
    WHERE "applicationDate" >= ${startDate} AND "applicationDate" < ${addDays(endDate, 1)} AND "userId" = ${user.id}
    GROUP BY DATE_TRUNC('day', "applicationDate"), "applicationStatus"
    ORDER BY DATE_TRUNC('day', "applicationDate")
  `

    // Fetch applications grouped by day and type
    const typeResults = await prisma.$queryRaw<
      Array<{ day: string; type: JobType; count: bigint }>
    >`
    SELECT 
      TO_CHAR(DATE_TRUNC('day', "applicationDate"), 'YYYY-MM-DD') as day,
      "jobType" as type,
      COUNT(*) as count
    FROM job_applications
    WHERE "applicationDate" >= ${startDate} AND "applicationDate" < ${addDays(endDate, 1)} AND "userId" = ${user.id}
    GROUP BY DATE_TRUNC('day', "applicationDate"), "jobType"
    ORDER BY DATE_TRUNC('day', "applicationDate")
  `

    // Fetch applications grouped by day and type
    const locationResults = await prisma.$queryRaw<
      Array<{ day: string; location: JobLocation; count: bigint }>
    >`
    SELECT 
      TO_CHAR(DATE_TRUNC('day', "applicationDate"), 'YYYY-MM-DD') as day,
      "location" as location,
      COUNT(*) as count
    FROM job_applications
    WHERE "applicationDate" >= ${startDate} AND "applicationDate" < ${addDays(endDate, 1)} AND "userId" = ${user.id}
    GROUP BY DATE_TRUNC('day', "applicationDate"), "location"
    ORDER BY DATE_TRUNC('day', "applicationDate")
  `

    // Process status results
    for (const result of statusResults) {
      const dayIndex = days.indexOf(result.day)
      if (dayIndex !== -1) {
        const status = result.status
        if (status in byStatus[dayIndex]) {
          byStatus[dayIndex][status] = Number(result.count)
        }
      }
    }

    // Process type results
    for (const result of typeResults) {
      const dayIndex = days.indexOf(result.day)
      if (dayIndex !== -1) {
        const type = result.type
        if (type in byType[dayIndex]) {
          byType[dayIndex][type] = Number(result.count)
        }
      }
    }

    // Process location results
    for (const result of locationResults) {
      const dayIndex = days.indexOf(result.day)
      if (dayIndex !== -1) {
        const location = result.location
        if (location in byLocation[dayIndex]) {
          byLocation[dayIndex][location] = Number(result.count)
        }
      }
    }

    return {
      status: 'success',
      data: {
        byStatus,
        byType,
        byLocation,
      },
    }
  } catch (error) {
    return { status: 'error', error: 'Error fetching weekly job applications' }
  }
}
