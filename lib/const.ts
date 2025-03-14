import { Briefcase, FileText, Home, House, Users } from 'lucide-react'

import { FilterLabels, TableType } from '@/components/data-table'

export const SIDEBAR_ITEMS = [
  {
    name: 'Overview',
    items: [
      { name: 'Dashboard', icon: Home, href: '/' },
      {
        name: 'Job Applications',
        icon: Briefcase,
        href: '/job-applications',
        subItems: [
          { name: 'All', href: '/job-applications' },
          { name: 'Applied', href: '/job-applications?status=APPLIED' },
          {
            name: 'Interviewing',
            href: '/job-applications?status=interviewing',
          },
          { name: 'Offered', href: '/job-applications?status=offered' },
          { name: 'Rejected', href: '/job-applications?status=rejected' },
        ],
      },
    ],
  },
  {
    name: 'Resources',
    items: [
      { name: 'Resumes', icon: FileText, href: '/resumes' },
      // { name: 'Cover Letters', icon: Mail, href: '/cover-letters' },
      { name: 'Contacts', icon: Users, href: '/contacts' },
      { name: 'Companies', icon: House, href: '/companies' },
    ],
  },
]

export const JOB_TYPE_COLORS = {
  FULL_TIME: '#2E7D32',
  PART_TIME: '#2E7D32',
  CONTRACT: '#FFA000',
  INTERNSHIP: '#E64A19',
  FREELANCE: '#7B1FA2',
  OTHERS: '#455A64',
}

export const JOB_STATUS_COLORS = {
  APPLIED: '#0288D1',
  INTERVIEWING: '#F57C00',
  OFFER: '#43A047',
  REJECTED: '#D32F2F',
}

export const JOB_LOCATION_COLORS = {
  REMOTE: '#1E88E5', // Blue
  ON_SITE: '#43A047', // Green
  HYBRID: '#8E24AA', // Purple
  OTHER: '#757575', // Grey
}

export const tableFilters: Record<TableType, FilterLabels> = {
  contacts: {
    name: 'Name',
    email: 'Email',
    phoneNumber: 'Phone',
    role: 'Role',
  },
  companies: {
    name: 'Name',
    website: 'Website',
    industry: 'Industry',
    location: 'Location',
    size: 'Size',
  },
  resumes: {
    name: 'Name',
    url: 'Source',
  },
  coverLetters: {
    name: 'Name',
    body: 'Body',
  },
  // jobApplications: {}
}
