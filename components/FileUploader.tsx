'use client';

import React,{ useCallback ,useState}  from 'react'
import {useDropzone} from 'react-dropzone'
import { Button } from './ui/button';
import { cn, getFileType } from '@/lib/utils';
import Image from 'next/image';


interface props{
  ownerId:string,
  accountId:string,
  className? :string
}

function FileUploader({ ownerId,accountId,className}:props) {

  const [files,setfiles]=useState([]);
  const onDrop = useCallback(async (acceptedFiles:File[]) => {
    setfiles(acceptedFiles)
  }, [])

  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div {...getRootProps()} className='cursor-pointer'>
      <input {...getInputProps()} />
      <Button type='button' className={cn('uploader-button')}>
        <Image alt='upload' src='/assets/icons/upload.svg' width={24} height={24} />
        <p className=''>Upload</p>
      </Button>

      {
        files.length>0 && (
          <ul className='uploader-preview-list'>
            <h4 className='h4 text-light-100'>Uploading</h4>

            {
              files.map((item)=>{
                const [type,ext]=getFileType(files.name);
                return(
                  <li key={`${file.name}-${index}`} className='uploader-preview-item'>

                  </li>
                )
              })
            }
          </ul>
        )
      }
      {
        isDragActive ?
          <p>Drop the files here ...</p> :
          <p>Drag 'n' drop some files here, or click to select files</p>
      }
    </div>
  )
}

export default FileUploader
