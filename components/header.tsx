import React from 'react'
import { Button } from './ui/button'
import Image from 'next/image'
import Search from './Search'
import FileUploader from './FileUploader'
import { signOutButton } from '@/lib/actions/user.actions'

function Header() {
  return (
    <header className='header'>
      <Search/>
      <div className='header-wrapper'>
        <FileUploader/>
        <form action={async()=>{
          'use server'
          await signOutButton()
        }} >
            <Button type='submit' className='sign-out-button'>
                <Image src='/assets/icons/logout.svg' alt='logo' height={24} width={24} className='w-6'/>
            </Button>
        </form>
      </div>
    </header>
  )
}

export default Header
