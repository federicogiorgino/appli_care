import { EditCompanyDialog } from '@/app/(dashboard)/companies/_components/edit-company-dialog'
import { EditContactDialog } from '@/app/(dashboard)/contacts/_components/edit-contact-dialog'
import { EditJobApplicationDialog } from '@/app/(dashboard)/job-applications/_components/edit-job-application-dialog'
import { EditResumeDialog } from '@/app/(dashboard)/resumes/_components/edit-resume-dialog'

import { CreateCompanyForm } from './create-company-form'
import { CreateContactForm } from './create-contact-form'
import { CreateCoverLetterForm } from './create-cover-letter-form'
import { CreateJobApplicationForm } from './create-job-application-form'
import { CreateResumeForm } from './create-resume-form'
import { ControlledDialog } from './ui/controlled-dialog'

function DialogsProvider() {
  return (
    <>
      <EditResumeDialog />
      <EditContactDialog />
      <EditCompanyDialog />
      <EditJobApplicationDialog />
      <ControlledDialog
        id="jobApplicationCreateDialog"
        title="Add New Job Application"
        description="Fill all the required fields"
        content={<CreateJobApplicationForm />}
      />
      <ControlledDialog
        id="coverLetterCreateDialog"
        title="Add New Cover Letters"
        description="Fill all the required fields"
        content={<CreateCoverLetterForm />}
      />
      <ControlledDialog
        id="resumeCreateDialog"
        title="Add New Resume"
        description="Fill all the required fields"
        content={<CreateResumeForm />}
      />
      <ControlledDialog
        id="contactCreateDialog"
        title="Add New Contact"
        description="Fill all the required fields"
        content={<CreateContactForm />}
      />
      <ControlledDialog
        id="companyCreateDialog"
        title="Add New Company"
        description="Fill all the required fields"
        content={<CreateCompanyForm />}
      />
    </>
  )
}

export { DialogsProvider }
