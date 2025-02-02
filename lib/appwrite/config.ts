export const appwrite_config={
    endpointUrl: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!,
    projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT!,
    databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE!,
    usersCollectionId:process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION!,
    filesCollectionId:process.env.NEXT_PUBLIC_APPWRITE_FILES_COLLECTION!,
    bucketCollectionId:process.env.NEXT_PUBLIC_APPWRITE_BUCKET_COLLECTION!,
    secret_key:process.env.NEXT_APPWRITE_KEY!,  
}
