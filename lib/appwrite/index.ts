'use server'

import { cookies } from "next/headers"
import { appwrite_config } from "./config"
import { Account, Avatars, Client, Databases,Storage } from "node-appwrite"

export const createSessionClient= async()=>{
    const client=new Client()
    .setEndpoint(appwrite_config.endpointUrl)
    .setProject(appwrite_config.projectId)

    const session =(await cookies()).get('appwrite-session')

    if(!session || !session?.value){
        return null;
    }
    
    client.setSession(session.value)

    return {
        get account(){
            return new Account (client);
        },
        get database(){
            return new Databases (client);
        },
    }
}

export const createAdminClient=async()=>{
    const admin=new Client()
    .setEndpoint(appwrite_config.endpointUrl)
    .setProject(appwrite_config.projectId)
    .setKey(appwrite_config.secret_key)
    

    return {
        get account(){
            return new Account (admin);
        },
        get database(){
            return new Databases (admin);
        },
        get storage(){
            return new Storage(admin);
        },
        get avatars(){
            return new Avatars (admin);
        },
    }
}