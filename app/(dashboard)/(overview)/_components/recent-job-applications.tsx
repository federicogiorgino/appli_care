'use client'

import Link from 'next/link'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'

import {
  RecentJobApplicationCard,
  RecentJobApplicationCardSkeleton,
} from './recent-job-application-card'
import { useRecentJobApplications } from '@/hooks/use-recent-job-application'

function RecentJobApplications() {
  const { recentJobApplications, isLoading } = useRecentJobApplications()

  return (
    <Card className="col-span-1 gap-3 md:col-span-4 xl:col-span-3">
      <CardHeader className="mb-4">
        <CardTitle className="flex items-center justify-between">
          <p className="text-2xl font-semibold">Recent Applications</p>
          <Link href="/" className="text-primary underline">
            See More
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="md:h-[70vh]">
          <div className="flex flex-col gap-6">
            {isLoading
              ? Array.from({ length: 5 }).map((el, i) => (
                  <RecentJobApplicationCardSkeleton key={i} />
                ))
              : recentJobApplications.map((application) => (
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
