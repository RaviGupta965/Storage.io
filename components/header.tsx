import React from 'react'
import { Button } from './ui/button'
import Image from 'next/image'
import Search from './Search'
import FileUploader from './FileUploader'

function Header() {
  return (
    <header className='header'>
      <Search/>
      <div className='header-wrapper'>
        <FileUploader/>
        <form action="">
            <Button type='submit' className='sign-out-button'>
                <Image src='/assets/icons/logout.svg' alt='logo' height={24} width={24} className='w-6'/>
            </Button>
        </form>
      </div>
    </header>
  )
}

export default Header
