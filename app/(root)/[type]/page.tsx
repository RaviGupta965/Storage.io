import React from 'react'
import Sort from '@/components/Sort';
import { getFiles } from '@/lib/actions/files.action';
import { Models } from 'node-appwrite';
import Card from '@/components/Card';
async function page({ params }: SearchParamProps) {
    const type = (await params)?.type || "";
    const files =await getFiles();
    console.log(files);
    return (
        <div className='page-container'>
            <section className='w-full'>
                <h1 className='h1 capitalize'>
                    {type}
                </h1>

                <div className='total-size-section'>
                    <p className='body-1'>
                        Total: <span className='h5'>0 Mb</span>
                    </p>
                    <div className='sort-container'>
                        <p className='body-1  sm:block text-light-200'>
                            Sort by:
                        </p>
                        <Sort />
                    </div>
                </div>
            </section>

            {/* Dynamicaally rendering files */}
            {
                files.total > 0 ?
                <section className='file-list'>
                    {
                        files.documents.map((file:Models.Document)=>{
                            return <Card key={file.$id} file={file} />  
                        })
                    }
                </section> :
                <p className='empty-list'>No Files Upoloaded</p>
            }
        </div>
    )
}

export default page
