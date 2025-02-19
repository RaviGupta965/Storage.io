'use client';

import React,{ useCallback ,useState}  from 'react'
import {useDropzone} from 'react-dropzone'
import { Button } from './ui/button';
import { cn, convertFileToUrl, getFileType } from '@/lib/utils';
import Image from 'next/image';
import Thumbnail from './Thumbnail';


interface props{
  ownerId:string,
  accountId:string,
  className? :string
}

function FileUploader({ ownerId,accountId,className}:props) {

  const [files,setfiles]=useState<File[]>([]);
  
  const onDrop = useCallback(async (acceptedFiles:File[]) => {
     setfiles(acceptedFiles)
  }, [])

  const handleRemoveFile=(e:React.MouseEvent,filename:string)=>{
    e.stopPropagation()
    setfiles((prev)=>prev.filter((file)=>file.name!==filename))
  }
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
              files.map((item,index)=>{
                // console.log(item);
                const {type,extension}=getFileType(item.name);
                return(
                  <li key={`${item.name}-${index}`} className='uploader-preview-item'>
                    <div className='flex items-center gap-3'>
                      <Thumbnail type={type} extension={extension} url={convertFileToUrl(item)} />


                      <div className='preview-item-name'>
                        {item.name}
                        <Image src='/assets/icons/file-loader.gif' width={80} height={26}  alt='image-thumbnail'/>
                      </div>
                    </div>
                    <Image src='/assets/icons/remove.svg' height={24} width={24} alt='remove' onClick={(e)=>handleRemoveFile(e,item.name)} />
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
