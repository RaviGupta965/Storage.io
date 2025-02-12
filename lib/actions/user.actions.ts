'use server';

import { createAdminClient } from "../appwrite";
import { appwrite_config } from "../appwrite/config";
import { Query , ID, Avatars} from "node-appwrite";
import { parseStringify } from "../utils";
import Error from "next/error";
import { cookies } from "next/headers";
import { strict } from "assert";

// checking whether user exist already??
const getUserByEmail = async (email:string)=>{
    const {database}=await createAdminClient();
    
    const result=await database.listDocuments(
        appwrite_config.databaseId,
        appwrite_config.usersCollectionId,
        [Query.equal('email',email)]
    )

    return result.total > 0 ? result.documents[0] : null;
}

// sending OTP
export const sendEmailOTP=async (email:string)=>{
    const {account}=await createAdminClient();

    try {
        const session=await account.createEmailToken(ID.unique(),email);
        console.log('success sending OTP');
        return session.userId
    } catch (error) {
        console.log("ERROR :: WHILE SENDING OTP",error);
    }
}

export const createAccount = async ({username,email}:{username:string,email:string}) => {
    const  existingUser = await getUserByEmail(email);

    const accountId=await sendEmailOTP(email);

    if(!accountId){
        console.log('Failed to send OTP')
    }

    if(!existingUser){
        const {database}=await createAdminClient();
        await database.createDocument(
            appwrite_config.databaseId,
            appwrite_config.usersCollectionId,
            ID.unique(),
            {
                username,
                email,
                avatar:'https://static.vecteezy.com/system/resources/previews/009/734/564/non_2x/default-avatar-profile-icon-of-social-media-user-vector.jpg',
                accountId
            },
        );
    }

    return parseStringify({accountId})
}

export const verifySecret = async ({accountId,password}:{accountId:string,password:string})=>{
    try {
        const {account}=await createAdminClient();

        const session=await account.createSession(accountId,password);

        (await cookies()).set('appwrite-session',session.secret,{
            path:'/',
            httpOnly:true,
            sameSite:'strict',
            secure:true
        })

        return parseStringify({sessionId:session.$id})
    } catch (error) {
        console.log('ERROR :: WHILE MATCHING OTP', error)
    }
}