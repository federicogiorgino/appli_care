import { Suspense } from 'react'

import { ContactsTable } from './_components/contacts-table'

function ContactsPage() {
  return (
    <Suspense>
      <h1 className="mb-5 text-4xl font-bold">Contacts</h1>

      <ContactsTable />
    </Suspense>
  )
}

export default ContactsPage
