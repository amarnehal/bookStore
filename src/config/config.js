const config = {
  appWriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
  appWriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
  appWriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
  appWriteCollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
  appWriteUsersCollectionId: String(
    import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID
  ),
  appWriteBucketID: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
  emailjsServiceId: String(import.meta.env.VITE_EMAILJS_SERVICE_ID),
  emailjsTemplateId: String(import.meta.env.VITE_EMAILJS_TEMPLATE_ID),
  emailjsPublicKey: String(import.meta.env.VITE_EMAILJS_PUBLICK_KEY),
};
export default config;
