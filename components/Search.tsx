'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

function Search() {
  const [query, setQuery] = useState('')
  const searchParams = useSearchParams()
  const searchQuery = searchParams.get('query') || ''
  const router = useRouter()
  const path = usePathname()

  useEffect(() => {
    if (!searchQuery) setQuery('')
  }, [searchQuery])

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (query) {
        router.push(`/${path.split('/')[1] || ''}?query=${encodeURIComponent(query)}`)
      } else if (searchQuery) {
        router.push(path)
      }
    }, 300)

    return () => clearTimeout(debounce)
  }, [query, path, router, searchQuery])

  return (
    <div className='search'>
      <div className='search-input-wrapper flex items-center gap-2 rounded-full border px-4'>
        <Image src='/assets/icons/search.svg' alt='search' width={24} height={24} />
        <Input
          value={query}
          placeholder='Search...'
          className='search-input border-none shadow-none focus-visible:ring-0'
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
    </div>
  )
}

export default Search
