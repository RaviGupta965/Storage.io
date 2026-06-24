'use server';

import { createAdminClient } from "../appwrite/index";
import { InputFile } from 'node-appwrite/file'
import { appwrite_config } from "../appwrite/config";
import { ID, Query, Models } from "node-appwrite";
import { constructFileUrl, getFileType, parseStringify } from "../utils";
import { get_current_user } from "./user.actions";
import { revalidatePath } from "next/cache";

const handleError = (error: unknown, message: string) => {
    console.log(message, error);
    throw error;
};

export const uploadFile = async ({ file, ownerId, accountId, path }: UploadFileProps) => {
    const { storage, database } = await createAdminClient()
    try {
        const inputFile = InputFile.fromBuffer(file, file.name);
        const bucketFile = await storage.createFile(appwrite_config.bucketCollectionId, ID.unique(), inputFile)
        const file_document = {
            type: getFileType(bucketFile.name).type,
            name: bucketFile.name,
            url: constructFileUrl(appwrite_config.bucketCollectionId, bucketFile.$id),
            extension: getFileType(bucketFile.name).extension,
            size: bucketFile.sizeOriginal,
            owners: ownerId,
            accountId,
            users: [],
            bucketFileId: bucketFile.$id
        }

        const newfile = await database.createDocument(
            appwrite_config.databaseId,
            appwrite_config.filesCollectionId,
            ID.unique(),
            file_document
        ).catch(async (error: unknown) => {
            // Roll back the uploaded file if the document fails to persist
            await storage.deleteFile(appwrite_config.bucketCollectionId, bucketFile.$id);
            handleError(error, "ERROR :: CREATING FILE DOCUMENT");
        });

        revalidatePath(path);
        return parseStringify(newfile);
    } catch (error) {
        handleError(error, 'ERROR :: UPLOADING FILE');
    }
}

const createQueries = (
    current_user: Models.Document,
    types: string[],
    searchText: string,
    sort: string,
    limit?: number,
) => {
    const queries = [
        Query.or([
            Query.equal('owners', current_user.$id),
            Query.contains('users', current_user.email),
        ]),
    ];

    if (types.length > 0) queries.push(Query.equal('type', types));
    if (searchText) queries.push(Query.contains('name', searchText));
    if (limit) queries.push(Query.limit(limit));

    if (sort) {
        const [sortBy, orderBy] = sort.split('-');
        queries.push(
            orderBy === 'asc' ? Query.orderAsc(sortBy) : Query.orderDesc(sortBy),
        );
    }

    return queries;
}

export const getFiles = async ({
    types = [],
    searchText = '',
    sort = '$createdAt-desc',
    limit,
}: GetFilesProps) => {
    const { database } = await createAdminClient()
    try {
        const current_user = await get_current_user()

        if (!current_user) {
            throw new Error('User Not Found')
        }

        const queries = createQueries(current_user, types, searchText, sort, limit);

        const files = await database.listDocuments(
            appwrite_config.databaseId,
            appwrite_config.filesCollectionId,
            queries,
        );

        return parseStringify(files);
    } catch (error) {
        handleError(error, "ERROR :: WHILE FETCHING FILES");
    }
}

export const renameFile = async ({ fileId, name, extension, path }: RenameFileProps) => {
    const { database } = await createAdminClient();
    try {
        const newName = `${name}.${extension}`;
        const updatedFile = await database.updateDocument(
            appwrite_config.databaseId,
            appwrite_config.filesCollectionId,
            fileId,
            { name: newName },
        );

        revalidatePath(path);
        return parseStringify(updatedFile);
    } catch (error) {
        handleError(error, "ERROR :: WHILE RENAMING FILE");
    }
}

export const updateFileUsers = async ({ fileId, emails, path }: UpdateFileUsersProps) => {
    const { database } = await createAdminClient();
    try {
        const updatedFile = await database.updateDocument(
            appwrite_config.databaseId,
            appwrite_config.filesCollectionId,
            fileId,
            { users: emails },
        );

        revalidatePath(path);
        return parseStringify(updatedFile);
    } catch (error) {
        handleError(error, "ERROR :: WHILE SHARING FILE");
    }
}

export const deleteFile = async ({ fileId, bucketFileId, path }: DeleteFileProps) => {
    const { storage, database } = await createAdminClient();
    try {
        await database.deleteDocument(
            appwrite_config.databaseId,
            appwrite_config.filesCollectionId,
            fileId,
        );

        await storage.deleteFile(appwrite_config.bucketCollectionId, bucketFileId);

        revalidatePath(path);
        return parseStringify({ status: 'success' });
    } catch (error) {
        handleError(error, "ERROR :: WHILE DELETING FILE");
    }
}

export const getTotalSpaceUsed = async () => {
    const { database } = await createAdminClient();
    try {
        const current_user = await get_current_user();
        if (!current_user) throw new Error('User is not authenticated.');

        const files = await database.listDocuments(
            appwrite_config.databaseId,
            appwrite_config.filesCollectionId,
            [Query.equal('owners', [current_user.$id])],
        );

        const totalSpace = {
            image: { size: 0, latestDate: '' },
            document: { size: 0, latestDate: '' },
            video: { size: 0, latestDate: '' },
            audio: { size: 0, latestDate: '' },
            other: { size: 0, latestDate: '' },
            used: 0,
            all: 2 * 1024 * 1024 * 1024, // 2GB available bucket storage
        };

        files.documents.forEach((file) => {
            const fileType = file.type as keyof typeof totalSpace;
            if (!totalSpace[fileType] || typeof totalSpace[fileType] === 'number') return;

            (totalSpace[fileType] as { size: number; latestDate: string }).size += file.size;
            totalSpace.used += file.size;

            const bucket = totalSpace[fileType] as { size: number; latestDate: string };
            if (!bucket.latestDate || new Date(file.$updatedAt) > new Date(bucket.latestDate)) {
                bucket.latestDate = file.$updatedAt;
            }
        });

        return parseStringify(totalSpace);
    } catch (error) {
        handleError(error, "ERROR :: WHILE CALCULATING TOTAL SPACE USED");
    }
}
