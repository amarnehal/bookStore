import config from "../../config/config";
import { Client, Databases, Storage, ID, Query } from "appwrite";

class db {
  client = new Client();
  databases;
  storage;

  constructor() {
    this.client
      .setEndpoint(config.appWriteUrl)
      .setProject(config.appWriteProjectId);

    this.databases = new Databases(this.client);
    this.storage = new Storage(this.client);
  }
  async createBook({
    name,
    category,
    description,
    author,
    price,
    rating,
    image,
    userId,
    fileId,
    Id = ID.unique(),
  }) {
    try {
      price = parseInt(price);
      rating = parseFloat(rating);
      const bookCreated = await this.databases.createDocument(
        config.appWriteDatabaseId,
        config.appWriteCollectionId,
        Id,
        {
          name,
          category,
          description,
          author,
          price,
          rating,
          image,
          userId,
          fileId,
        }
      );
      return bookCreated;
    } catch (error) {
      console.log("error in creting Book collection appwrite :: ", error);
      throw error;
    }
  }
  async updateBook(
    id,
    {
      name,
      category,
      description,
      author,
      price,
      rating,
      condition,
      image,
      fileId,
    }
  ) {
    try {
      await this.databases.updateDocument(
        config.appWriteDatabaseId,
        config.appWriteCollectionId,
        id,
        {
          name,
          category,
          description,
          author,
          price,
          rating,
          condition,
          image,
          fileId,
        }
      );
    } catch (error) {
      console.log("Error while updating the book with appWrite :: ", error);
    }
  }
  async deleteBook(id) {
    try {
      await this.databases.deleteDocument(
        config.appWriteDatabaseId,
        config.appWriteCollectionId,
        id
      );
      return true;
    } catch (error) {
      console.log("Error occured while deleting this book :: ", error);
      return false;
    }
  }
  async getBook(id) {
    try {
      const book = await this.databases.getDocument(
        config.appWriteDatabaseId,
        config.appWriteCollectionId,
        id
      );
      return book;
    } catch (error) {
      console.log("Error in getting the book with appwrite call :: ", error);
    }
  }
  async getBooks() {
    try {
      const result = await this.databases.listDocuments(
        config.appWriteDatabaseId,
        config.appWriteCollectionId
      );
      console.log("result", result);
      return result;
    } catch (error) {
      console.log("Error in getting books with appwrite", error);
    }
  }

  //// storage file upload
  async fileUpload(file) {
    if (file) {
      console.log("file ----", file, typeof file);
      const fileNameParts = file.name.split(".");
      const fileExtension =
        fileNameParts[fileNameParts.length - 1].toLowerCase();
      // Check if file extension is allowed
      const allowedExtensions = ["jpg", "jpeg", "png", "gif"];
      if (!allowedExtensions.includes(fileExtension)) {
        throw new Error("File extension not allowed");
      }
      console.log("file extenstion ----------", fileExtension);
      try {
        const uploadedFile = await this.storage.createFile(
          config.appWriteBucketID,
          ID.unique(),
          file
        );
        const url = uploadedFile.$id; // Assuming $id contains the URL of the uploaded file
        console.log("Uploaded file URL:", url);
        return url; // Return the URL of the uploaded file
      } catch (error) {
        console.log(
          "Error occured while uploading file with appwrite :: ",
          error
        );
      }
    } else {
      console.log("No file is Selected for upload ");
    }
  }

  async deleteFile(fileId) {
    try {
      console.log("file Id from db ", fileId);
      await this.storage.deleteFile(config.appWriteBucketID, fileId);
      return true;
    } catch (error) {
      console.log("Error occured while deleting this file :: ", error);
      return false;
    }
  }
  async getFilePreview(fileId) {
    try {
      const previewFile = await this.storage.getFilePreview(
        config.appWriteBucketID,
        fileId
      );
      console.log("preview File", previewFile);
      return previewFile; // Return the result of getFilePreview
    } catch (error) {
      console.log("Failed to get file preview ", error);
      throw error; // Rethrow the error
    }
  }

  //////// user registeration with adittional fields //////////
  async registerUserWithDetails({
    userId,
    streetAddress,
    city,
    postalCode,
    phone,
    name,
    email,
    Id = ID.unique(),
  }) {
    try {
      const userDetails = await this.databases.createDocument(
        config.appWriteDatabaseId,
        config.appWriteUsersCollectionId,
        Id,
        {
          userId,
          streetAddress,
          city,
          postalCode,
          phone,
          name,
          email,
        }
      );
      return userDetails;
    } catch (error) {
      console.log("failed to register user with details", error);
      throw error;
    }
  }

  async getUserById(userId) {
    try {
      const query = [Query.equal("userId", userId)];
      const response = await this.databases.listDocuments(
        config.appWriteDatabaseId,
        config.appWriteUsersCollectionId,
        query
      );
      const user = response.documents[0];
      if (!user) {
        throw new Error(`User with userId ${userId} not found`);
      }
      return user;
    } catch (error) {
      console.log("Failed to fetch user by Id", error);
      throw error;
    }
  }
}

const dbServices = new db();
export default dbServices;
