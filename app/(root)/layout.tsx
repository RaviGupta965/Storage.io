import React from 'react'
import Sidebar from '@/components/sidebar'
import Navigation from '@/components/navigation'
import Header from '@/components/header'
import { get_current_user } from '@/lib/actions/user.actions'
import { redirect } from 'next/navigation'
import { Toaster } from "@/components/ui/sonner"

async function layout({children}:{children:React.ReactNode}) {
  const current_user=await get_current_user();
  if(!current_user){
    return redirect('/sign-in')
  }
  return (
    <div className='flex h-screen'>
        <Sidebar {...current_user} />
        <section className='flex h-full flex-1 flex-col'>
            <Navigation {...current_user} /> 
            <Header userId={current_user.$id} accountId={current_user.accountId}/>
            <div className='main-content'>
                {children}
            </div>
        </section>
        <Toaster/>
    </div>
  )
}

export default layout
