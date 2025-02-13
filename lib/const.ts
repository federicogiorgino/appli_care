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
