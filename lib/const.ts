import {
  BarChart2,
  Bell,
  Briefcase,
  FileText,
  Home,
  House,
  Settings,
  Users,
} from 'lucide-react'

export const SIDEBAR_ITEMS = [
  {
    name: 'Overview',
    items: [
      { name: 'Dashboard', icon: Home, href: '/' },
      // { name: 'Analytics', icon: BarChart2, href: '/analytics' },
      {
        name: 'Job Applications',
        icon: Briefcase,
        href: '/applications',
        subItems: [
          { name: 'All', href: '/applications' },
          { name: 'Applied', href: '/applications/applied' },
          { name: 'Interviewing', href: '/applications/interviewing' },
          { name: 'Offered', href: '/applications/offered' },
          { name: 'Rejected', href: '/applications/rejected' },
        ],
      },
    ],
  },
  {
    name: 'Resources',
    items: [
      { name: 'Documents', icon: FileText, href: '/documents' },
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
