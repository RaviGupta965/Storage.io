'use client'

import React from 'react'
import { sortTypes } from '@/constants'
import { usePathname, useRouter } from 'next/navigation'

function Sort() {
  const path = usePathname()
  const router = useRouter()

  const handleSort = (value: string) => {
    router.push(`${path}?sort=${value}`)
  }

  return (
    <select
      className='sort-select h-9 rounded-md border border-light-300 bg-white px-3 text-sm text-light-100 shad-no-focus'
      defaultValue={sortTypes[0].value}
      onChange={(e) => handleSort(e.target.value)}
    >
      {sortTypes.map((sort) => (
        <option key={sort.value} value={sort.value}>
          {sort.label}
        </option>
      ))}
    </select>
  )
}

export default Sort
