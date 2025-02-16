'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { usePathname } from 'next/navigation';
import { Separator } from './ui/separator';
import { nav_item } from '@/constants';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import FileUploader from './FileUploader';
import { signOutButton } from '@/lib/actions/user.actions';
interface props {
  ownerId: string,
  accountId: string,
  username: string,
  email: string,
  avatar: string
}
function Navigation({ ownerId, accountId, username, email, avatar }: props) {
  const [open, setopen] = useState(false);
  const pathname = usePathname()
  return (
    <header className='mobile-header'>
      <Image src='/assets/icons/logo-full-brand.svg' alt='logo' height={120} width={52} className='h-auto' />
      <Sheet open={open} onOpenChange={setopen}>
        <SheetTrigger>
          <Image src='/assets/icons/menu.svg' alt='nev-btn' height={30} width={30} />
        </SheetTrigger>
        <SheetContent className='shad-sheet h-screen px-3'>
          <SheetHeader>
            <SheetTitle>
              <div className='header-user'>
                <Image src={avatar} alt='avatar' height={44} width={44} className='header-user-avatar' />
                <div className='sm:hidden lg:block'>
                  <p className='subtitle-2 capitalize'>{username}</p>
                  <p className='caption'>{email}</p>
                </div>
              </div>
              <Separator className='mb-4 bg-light-200' />
            </SheetTitle>
          </SheetHeader>

          <nav className='mobile-nav'>
            <ul className='mobile-nav-list'>
              {nav_item.map(({ url, name, icons }) => (
                <Link key={name} href={url} className='lg:w-full' >
                  <li key={name} className={cn('mobile-nav-item', pathname === url && 'shad-active')}>
                    <Image className={cn(
                      'nav-icon',
                      pathname === url && 'nav-icon-active')} src={icons} alt={name} width={24} height={24} />
                    <p className='block'>{name}</p>
                  </li>
                </Link>
              ))}
            </ul>
          </nav>
          <Separator className='mb-4 bg-light-200' />
          <div className='flex flex-col justify-between gap-5 pb-5'>
            <FileUploader />
            <Button type='submit' onClick={async ()=>await signOutButton} className='mobile-sign-out-button'>
                <Image src='/assets/icons/logout.svg' alt='logo' height={24} width={24}/>
                <p>Logout</p>
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  )
}

export default Navigation
