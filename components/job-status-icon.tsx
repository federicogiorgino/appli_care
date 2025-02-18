import { JobApplicationStatus } from '@prisma/client'
import { Award, FileText, HelpCircle, User, XCircle } from 'lucide-react'

type JobStatusIconProps = {
  status: JobApplicationStatus
}

export const getJobApplicationStatusIcon = (
  jobApplicationStatus: JobApplicationStatus
) => {
  switch (jobApplicationStatus) {
    case JobApplicationStatus.APPLIED:
      return <FileText size={20} className={`text-[#0288D1]`} />
    case JobApplicationStatus.INTERVIEWING:
      return <User size={20} className={`text-[#F57C00]`} />
    case JobApplicationStatus.OFFER:
      return <Award size={20} className={`text-[#43A047]`} />
    case JobApplicationStatus.REJECTED:
      return <XCircle size={20} className={`text-[#D32F2F]`} />
    default:
      return <HelpCircle size={20} className="text-gray-500" />
  }
}
function JobStatusIcon({ status }: JobStatusIconProps) {
  return (
    <div className="rounded-lg bg-zinc-200 p-2 dark:bg-zinc-800">
      {getJobApplicationStatusIcon(status)}
    </div>
  )
}

export { JobStatusIcon }
