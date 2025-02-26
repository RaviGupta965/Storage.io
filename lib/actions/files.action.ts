'use server';

import { createAdminClient } from "../appwrite";
import {InputFile} from 'node-appwrite/file'
import { appwrite_config } from "../appwrite/config";
import { ID } from "node-appwrite";
import { constructFileUrl, getFileType } from "../utils";

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