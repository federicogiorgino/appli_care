'use server'

import { currentUser } from '@clerk/nextjs/server'
import { JobApplicationStatus, JobType } from '@prisma/client'
import { addMonths, startOfMonth, subMonths } from 'date-fns'
import { format } from 'date-fns'

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
