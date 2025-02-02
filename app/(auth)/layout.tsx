import React from 'react'
import Image from 'next/image'

function layout({ children }: { children: React.ReactNode }) {
    return (
        <div className='flex min-h-screen'>
            <section className='bg-brand-100 rounded-r-3xl p-10 hidden w-1/2 items-center justify-center lg:flex xl:w-2/5 lg:flex-col'>
                <div className='flex max-h-[800px] max-w-[430px] flex-col justify-center pb-8'>
                    <img src="/assets/icons/logo-full.svg" alt="Logo" width={224} height={82} className='h-auto' />
                </div>
                <div className='space-y-5 text-white p-3'>
                    <h1 className='h1'> Manage Your Files the best way </h1>
                    <p className='body-1'>
                        This is the place where u can store all your documents
                    </p>
                </div>
                <img src="/assets/images/files.png" alt="illustration" height={342} width={342} className='transition-all hover:rotate-6' />
            </section>

            <section className='flex flex-1 flex-col items-center bg-white p-4 py-10 lg:justify-center lg:p-10 lg:py-0'>
                <div className='mb-3'>
                    <Image src='assets/icons/logo-full-brand.svg' alt='logo' width={224} height={82} className='h-auto w-[200px] lg:w-[250px]'/>
                </div>
                {children}
            </section>
        </div>
    )
}

export default layout
