import React from 'react'
import Sort from '@/components/Sort';
import { getFiles } from '@/lib/actions/files.action';
import { Models } from 'node-appwrite';
import Card from '@/components/Card';
import { getFileTypesParams } from '@/lib/utils';
import { convertFileSize } from '@/lib/utils';

async function page({ params, searchParams }: SearchParamProps) {
    const type = ((await params)?.type as string) || "";
    const searchText = ((await searchParams)?.query as string) || "";
    const sort = ((await searchParams)?.sort as string) || "";

    const types = getFileTypesParams(type) as FileType[];
    const files = await getFiles({ types, searchText, sort });

    if (!files) {
        return (
            <div className='page-container'>
                <p className='empty-list'>Unable to load files. Please try again.</p>
            </div>
        );
    }

    const totalSize = files.documents.reduce(
        (sum: number, file: Models.Document) => sum + (file.size || 0),
        0,
    );

    return (
        <div className='page-container'>
            <section className='w-full'>
                <h1 className='h1 capitalize'>
                    {type}
                </h1>

                <div className='total-size-section'>
                    <p className='body-1'>
                        Total: <span className='h5'>{convertFileSize(totalSize)}</span>
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
                <p className='empty-list'>No Files Uploaded</p>
            }
        </div>
    )
}

export default page
