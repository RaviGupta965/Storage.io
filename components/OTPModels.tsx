import React, { useState } from 'react'
import Image from 'next/image';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { Button } from './ui/button';


function OTPModels({ email, accountId }: { email: string, accountId: string }) {

    const [open,setopen]=useState(true);
    const [pass,setpass]=useState('');
    const [loading,setloading]=useState(false);

    const handleSubmit=async (e : React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault();
        setloading(true);

        try {
            // Call an API to verify OTP


        } catch (error) {
            console.log('ERROR :: Failed to verify OTP',error.message);
        }
    }

    const handleResendOTP=async()=>{
        // Call API to resend OTP

    }
    return (
        <div>
            <AlertDialog open={open} onOpenChange={setopen}>
                <AlertDialogContent className='shad-alert-dialog'>
                    <AlertDialogHeader className='relative flex justify-center '>
                        <AlertDialogTitle className='h2 text-center'>Enter Your OTP</AlertDialogTitle>
                        <Image  src='/assets/icons/close-dark.svg' height={20} width={20} alt='close'  onClick={()=>setopen(false)} className='otp-close-button'/>
                        <AlertDialogDescription className='subtitle-2 text-center text-light-100'>
                            We&apos;ve sent a code to <span className='pl-1 text-brand'>{email}</span>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <InputOTP maxLength={6}>
                        <InputOTPGroup>
                            <InputOTPSlot index={0} className='shad-otp-slot'/>
                            <InputOTPSlot index={1} className='shad-otp-slot'/>
                            <InputOTPSlot index={2} className='shad-otp-slot'/>
                            <InputOTPSlot index={3} className='shad-otp-slot'/>
                            <InputOTPSlot index={4} className='shad-otp-slot'/>
                            <InputOTPSlot index={5} className='shad-otp-slot'/>
                        </InputOTPGroup>
                    </InputOTP>
                    <AlertDialogFooter>
                        <div className='flex w-full flex-col gap-4'>
                            <AlertDialogAction type='button' onClick={handleSubmit} className='shad-submit-btn h-12'>Submit {loading && <Image src='/assets/icons/loader.svg' alt='loader' height={24} width={24} className='ml-2 animate-spin' />} </AlertDialogAction>
                        </div>
                    </AlertDialogFooter>
                        <div className='subtitle-2 mt-2 text-center text-light-100'>
                            Didn&apos;t Recieve Code? <Button type='buttton' variant='link' className='pl-1 text-brand' onClick={handleResendOTP} >click to resend</Button>
                        </div>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}

export default OTPModels
