'use server';

import { createAdminClient } from "../appwrite/index";
import {InputFile} from 'node-appwrite/file'
import { appwrite_config } from "../appwrite/config";
import { ID ,Query,Models} from "node-appwrite";
import { constructFileUrl, getFileType, parseStringify } from "../utils";
import { get_current_user } from "./user.actions";
export const uploadFile=async({file,ownerId,accountId,path}:UploadFileProps)=>{
    const {storage,database}=await createAdminClient()
    try {
        const inputFile=InputFile.fromBuffer(file,file.name);
        const bucketFile=await storage.createFile(appwrite_config.bucketCollectionId,ID.unique(),inputFile)
        const file_document={
            type:getFileType(bucketFile.name).type,
            name:bucketFile.name,
            url:constructFileUrl(bucketFile.$id),
            extension:getFileType(bucketFile.name).extension,
            size:bucketFile.sizeOriginal,
            owners:ownerId,
            accountId,
            users:[],
            bucketFileId:bucketFile.$id
        }

        const newfile=await database.createDocument(
            appwrite_config.databaseId,
            appwrite_config.filesCollectionId,
            ID.unique(),
            file_document
        )

    } catch (error) {
        console.log('ERROR :: UPLOADING FILE',error);
    }
}
const createQueries=(current_user:Models.Document)=>{
    const queries=[
        Query.or([
            Query.equal('owners',current_user.$id),
            Query.contains('users',current_user.email),
        ]),
    ];
    return queries;
}
export const getFiles =async ()=>{
    const {database}=await createAdminClient()
    try {
        const current_user=await get_current_user()

        if(!current_user){
            throw new Error('User Not Found')
        }

        const queries=createQueries(current_user);

        const files=await database.listDocuments(
            appwrite_config.databaseId,
            appwrite_config.filesCollectionId,
            queries,
        );
        // console.log(files);
        return parseStringify(files);
    } catch (error) {
        console.log("ERROR :: WHILE FETCHING FILES",error)
    }
}