import { Client, Account, ID } from "appwrite";
import config from "../../config/config";

class authService {
  client = new Client();
  account;
  constructor() {
    this.client
      .setEndpoint(config.appWriteUrl)
      .setProject(config.appWriteProjectId);

    this.account = new Account(this.client);
  }
  async createAccount({ email, password, name }) {
    const userAccount = await this.account.create(
      ID.unique(),
      email,
      password,
      name
    );

    return userAccount;
  }

  async loginAccount({ email, password }) {
    try {
      const user = await this.account.createEmailPasswordSession(
        email,
        password
      );
      if (user) {
        return user;
      }
    } catch (error) {
      console.log("error in appwrite login :: ", error);
      throw error;
    }
  }
  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("AppWrite Service getaccount error", error);
      if (error.type === "AppwriteException" && error.code === 401) {
        console.log("Session expired or invalid");
      }
    }
    return null;
  }
  async logOutUser() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log("Failed to logOut with appwrite service error ::", error);
    }
  }
}
const appWriteAuth = new authService();
export default appWriteAuth;
