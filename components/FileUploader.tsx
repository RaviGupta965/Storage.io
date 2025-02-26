'use client';

import React,{ useCallback ,useState}  from 'react'
import {useDropzone} from 'react-dropzone'
import { Button } from './ui/button';
import { cn, convertFileToUrl, getFileType } from '@/lib/utils';
import Image from 'next/image';
import Thumbnail from './Thumbnail';
import { MAX_FILE_SIZE } from '@/constants';
import { toast } from "sonner"
import { uploadFile } from '@/lib/actions/files.action';
import { usePathname } from 'next/navigation';

interface props{
  ownerId:string,
  accountId:string,
  className? :string
}

function FileUploader({ ownerId,accountId,className}:props) {
  const path=usePathname()
  const [files,setfiles]=useState<File[]>([]);
  
  const onDrop = useCallback(async (acceptedFiles:File[]) => {
     setfiles(acceptedFiles)
     const uploadpromises=await acceptedFiles.map(async(file)=>{
      if(file.size>MAX_FILE_SIZE){
        setfiles((prev)=> prev.filter((f)=>f.name!==file.name));

        return toast(<p className='body-2 text-white'><span className='font-semibold'>{file.name}</span> is too large.Max File size is 50MB</p>,
          {
            className: "error-toast",
          }
        );
      }

      try {
        const uploadedFile = await uploadFile({ file, ownerId, accountId, path });
        setfiles((prev) => prev.filter((f) => f.name !== file.name));
      } catch (error) {
        console.error("Upload failed for:", file.name, error);
      }
     }) 

     await Promise.all(uploadpromises);
  }, [ownerId,accountId,path])

  const handleRemoveFile=(e:React.MouseEvent,filename:string)=>{
    e.stopPropagation()
    setfiles((prev)=>prev.filter((file)=>file.name!==filename))
  }
  const {getRootProps, getInputProps} = useDropzone({onDrop})

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
    </div>
  )
}

export default FileUploader
