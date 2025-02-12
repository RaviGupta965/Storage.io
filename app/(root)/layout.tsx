import React from 'react'
import Sidebar from '@/components/sidebar'
import Navigation from '@/components/navigation'
import Header from '@/components/header'
function layout({children}:{children:React.ReactNode}) {
  return (
    <div className='flex h-screen'>
        <Sidebar/>
        <section className='flex h-full flex-1 flex-col'>
            <Navigation/> <Header/>
            <div className='main-content'>
                {children}
            </div>
        </section>
    </div>
  )
}

export default layout
