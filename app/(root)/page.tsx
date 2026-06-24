import React from 'react'
import Link from 'next/link'
import { Models } from 'node-appwrite'
import { getFiles, getTotalSpaceUsed } from '@/lib/actions/files.action'
import { convertFileSize, getUsageSummary } from '@/lib/utils'
import Thumbnail from '@/components/Thumbnail'
import FormattedDateTime from '@/components/FormattedDateTime'
import ActionDropdown from '@/components/ActionDropdown'

async function Dashboard() {
  const [files, totalSpace] = await Promise.all([
    getFiles({ types: [], limit: 10 }),
    getTotalSpaceUsed(),
  ])

  const usageSummary = totalSpace ? getUsageSummary(totalSpace) : []

  return (
    <div className='dashboard-container grid gap-6 md:grid-cols-2'>
      <section>
        <h2 className='h3 mb-4'>Storage</h2>
        <ul className='dashboard-summary-list grid gap-4 sm:grid-cols-2'>
          {usageSummary.map((summary) => (
            <Link href={summary.url} key={summary.title} className='dashboard-summary-card rounded-xl border p-4'>
              <div className='flex items-center justify-between'>
                <p className='h5'>{summary.title}</p>
                <p className='body-1'>{convertFileSize(summary.size)}</p>
              </div>
              <FormattedDateTime date={summary.latestDate} className='caption' />
            </Link>
          ))}
        </ul>
      </section>

      <section className='dashboard-recent-files'>
        <h2 className='h3 mb-4'>Recent files uploaded</h2>
        {files && files.documents.length > 0 ? (
          <ul className='space-y-3'>
            {files.documents.map((file: Models.Document) => (
              <li key={file.$id} className='flex items-center justify-between gap-3 rounded-lg border p-3'>
                <Link href={file.url} target='_blank' className='flex items-center gap-3'>
                  <Thumbnail type={file.type} extension={file.extension} url={file.url} />
                  <div className='flex flex-col'>
                    <p className='subtitle-2 line-clamp-1'>{file.name}</p>
                    <FormattedDateTime date={file.$createdAt} className='caption' />
                  </div>
                </Link>
                <ActionDropdown file={file} />
              </li>
            ))}
          </ul>
        ) : (
          <p className='empty-list'>No files uploaded</p>
        )}
      </section>
    </div>
  )
}

export default Dashboard
