'use client'

import { format } from 'date-fns'
import Link from 'next/link'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'

import { RecentJobApplicationCard } from './recent-job-application-card'
import { useRecentJobApplications } from '@/hooks/use-recent-job-application'

function RecentJobApplications() {
  const { recentJobApplications, isLoading } = useRecentJobApplications()

  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <p className="text-xl font-semibold">Recent Applications</p>
          <Link href="/" className="text-primary underline">
            See More
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[70vh]">
          <div className="space-y-4">
            {recentJobApplications.map((application) => (
              <RecentJobApplicationCard
                jobApplication={application}
                key={application.id}
              />
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
export { RecentJobApplications }
