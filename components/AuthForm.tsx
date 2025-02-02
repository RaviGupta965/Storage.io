'use client'

import React from 'react'
import { useState } from 'react'
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form'
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Image from 'next/image'
import Link  from 'next/link'

type FormType = "Sign in" | "Sign up"


const authFormSchema = (formType : FormType)=>{
    return z.object({
        username: formType==='Sign up' ? z.string().min(2, { message: 'must contain atleast 2 characters' }).max(50) : z.string().optional(),
        email: z.string()
        .email({ message: "Required" })
    });
}



function AuthForm({ type }: { type: FormType }) {

    const [loading,setloading]=useState(false);
    const [errorMessage,seterrorMessage]=useState('');
    const FormSchema=authFormSchema(type)
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            username: "",
            email:""
        },

    });

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof FormSchema>) {
        console.log(values)
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="auth-form">
                <h1 className='form-title'>{type === 'Sign in' ? 'Sign in' : 'Sign up'}</h1>
                {/* username */}
                {type==='Sign up' && <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <div className='shad-form-item'>
                                <FormLabel className='shad-form-label'>username</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter Your Full Name" {...field} />
                                </FormControl>
                            </div>
                            <FormMessage  className='shad-form-message'/>
                        </FormItem>
                    )}
                />}

                {/* email */}
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <div className='shad-form-item'>
                                <FormLabel className='shad-form-label'>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter Your email" {...field} />
                                </FormControl>
                            </div>
                            <FormMessage  className='shad-form-message'/>
                        </FormItem>
                    )}
                />

                <Button type="submit" disabled={loading} className='form-submit-button'>{type==='Sign in'? 'Sign in': 'Sign up'}
                    {loading && <Image src='/assets/icons/loader.svg' alt='loader' height={24} width={24} className='ml-2 animate-spin'/> }
                </Button>
                {
                    errorMessage && (
                        <p>{errorMessage}</p>
                    )
                }
                <div className='body-2 flex justify-center'>
                    <p className='text-light-100'>{type==='Sign in'?'Don\'t have an account':'Already have an account'}</p>
                    <Link href={type==='Sign in'?'/sign-up':'/sign-in'} className='font-medium ml-1 text-brand'>{type==='Sign in'?'Sign up':'Sign in'} </Link>
                </div>
            </form>
        </Form>
    )
}

export default AuthForm
