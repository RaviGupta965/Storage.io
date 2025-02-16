'use client'

import { avatarPlaceholderUrl, nav_item } from '@/constants'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { cn } from '@/lib/utils'

interface props {
  username: string,
  avatar: string,
  email: string
}
function Sidebar({ username, avatar, email }: props) {
  const pathname = usePathname()

  return (
    <aside className='sidebar'>
      <Link href='/'>
        <Image src='/assets/icons/logo-full-brand.svg' alt='logo' height={50} width={160} className='hidden h-auto lg:block' />
        <Image src='/assets/icons/logo-brand.svg' alt='logo' height={52} width={52} className='lg:hidden' />
      </Link>

      <nav className='sidebar-nav'>
        <ul className='flex flex-col flex-1 gap-6'>
          {nav_item.map(({ url, name, icons }) => (
            <Link key={name} href={url} className='lg:w-full' >
              <li key={name} className={cn('sidebar-nav-item', pathname === url && 'shad-active')}>
                <Image className={cn(
                  'nav-icon',
                  pathname === url && 'nav-icon-active')} src={icons} alt={name} width={24} height={24} />
                <p className='hidden lg:block'>{name}</p>
              </li>
            </Link>
          ))}
        </ul>
      </nav>

      <Image className='w-full' src='/assets/images/files-2.png' alt='logo' width={500} height={400} />
      <div className='sidebar-user-info'>
        <Image src={avatarPlaceholderUrl} alt='avatar' height={44} width={44} className='sidebar-user-avatar' />
        <div className='hidden lg:block'>
          <p className='subtitle-2 capitalize'>{username}</p>
          <p className='caption'>{email}</p>
        </div>
      </div>

    </aside>
  )
}

export default Sidebar
