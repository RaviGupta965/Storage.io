import React from 'react'

function layout({children}:{children:React.ReactNode}) {
  return (
    <div className='flex h-screen'>
        sidebar
        <section className='flex h-full flex-1 flex-col'>
            MobileNavigation header
            <div className='main-content'>
                {children}
            </div>
        </section>
    </div>
  )
}

export default layout
