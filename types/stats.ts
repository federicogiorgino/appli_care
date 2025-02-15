export type JobStats = {
  status: string
  jobs: {
    lastMonth: number
    currentMonth: number
  }
}

export type JobByTypeStats = {
  month: string
  FULL_TIME: number
  PART_TIME: number
  CONTRACT: number
  INTERNSHIP: number
  FREELANCE: number
  OTHER: number
}

export type JobByStatusStats = {
  month: string
  APPLIED: number
  INTERVIEWING: number
  OFFER: number
  REJECTED: number
}

export type JobApplicationStats = {
  byStatus: JobByStatusStats[]
  byType: JobByTypeStats[]
}

export type TimeFrame = 'week' | 'month' | 'year'
