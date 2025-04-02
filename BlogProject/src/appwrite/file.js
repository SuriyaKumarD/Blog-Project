import { Client, ID } from "appwrite";
import { config } from "../config/config";

export class File {
  client = new Client();
  bucket;
  constructor() {
    this.client.setEndpoint(config.APPWRITE_URL).setProject(config.PROJECT_ID);
    this.bucket = new Storage(this.client);
  }

  async uploadFile(file) {
    try {
      return await this.bucket.createFile(config.BUCKET_ID, ID.unique(), file);
    } catch (error) {
      console.log("error in uploadFile", error);
    }
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(config.BUCKET_ID, fileId);
      return true;
    } catch (error) {
      console.log("error in deleteFile", error);
      return false;
    }
  }

  async preview(fileId) {
    try {
      return await this.bucket.getFilePreview(config.BUCKET_ID, fileId);
    } catch (error) {
      console.log("error in preview", error);
    }
  }
}

const file = new File();

export default file;
