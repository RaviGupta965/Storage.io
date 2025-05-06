'use client';

import React, { useState } from "react";
import {
  Dialog
} from "@/components/ui/dialog";
import { actionsDropdownItems } from "@/constants";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import {Models} from 'node-appwrite'
import Link from "next/link";
import { constructDownloadUrl } from "@/lib/utils";

function ActionDropdown({file} : {file : Models.Document}) {
  const [modelopen,setmodelopen]=useState(false);
  const [DropDownopen,setDropDownopen]=useState(false);
  const [action,setaction]=useState('');
  return (
      <Dialog  open={modelopen} onOpenChange={setmodelopen}>
        <DropdownMenu open={DropDownopen} onOpenChange={setDropDownopen}>
          <DropdownMenuTrigger className="shad-no-focus"><Image src='/assets/icons/dots.svg' alt="dots" height={34} width={34} /></DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel className="max-w-[200px] truncate "></DropdownMenuLabel>
            <DropdownMenuSeparator />
            {
              actionsDropdownItems.map((items)=>(
                <DropdownMenuItem onClick={()=>{
                  setaction(items.value);
                  if(['rename','share','delete','details'].includes(items.value)){

                  }
                }} className="shadow-dropdown-item" key={items.value}>
                  {items.value==='Download'?
                  (
                    <Link href={constructDownloadUrl(file.bucketFileId)} download={file.name} className="flex items-center gap-2" >
                    <Image height={25} width={25} src={items.icon} alt={items.label} /> {items.label}</Link>
                  ):(
                    <div href={constructDownloadUrl(file.bucketFileId)} download={file.name} className="flex items-center gap-2" >
                    <Image height={25} width={25} src={items.icon} alt={items.label} /> {items.label}</div>
                  )}
                </DropdownMenuItem>
              ))
            }
          </DropdownMenuContent>
        </DropdownMenu>
      </Dialog>
  );
}

export default ActionDropdown;
