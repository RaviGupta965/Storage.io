'use server';

import { createAdminClient } from "../appwrite";
import { appwrite_config } from "../appwrite/config";
import { Query , ID} from "node-appwrite";
const getUserByEmail = async (email:string)=>{
    const {database}=await createAdminClient();

    const result=await database.listDocuments(
        appwrite_config.databaseId,
        appwrite_config.usersCollectionId,
        [Query.equal('email',email)]
    )

    return result.total > 0 ? result.documents[0] : null;
}

const sendEmailOTP=async (email:string)=>{
    const {account}=await createAdminClient();

    try {
        const session=await account.createEmailToken(ID.unique(),email);

        return session.userId
    } catch (error) {
        console.log("ERROR :: WHILE SENDING OTP",error);
    }
}
const createAccount = async ({fullName,email}:{fullName:string,email:string}) => {
    const  existingUser = await getUserByEmail(email);

    const accountId=await sendEmailOTP(email);

    if(!accountId){
        throw new Error('Failed to send an OTP')
    }

    if(!existingUser){
        const {database}=await createAdminClient();
        await database.createDocument(
            appwrite_config.databaseId,
            appwrite_config.usersCollectionId,
            ID.unique()
        )
    }
}