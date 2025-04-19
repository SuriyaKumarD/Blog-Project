import { Client, ID, Storage } from "appwrite";
import config from "../config/config";

export class File {
  client = new Client();
  buckets;
  constructor() {
    this.client.setEndpoint(config.APPWRITE_URL).setProject(config.PROJECT_ID);
    this.buckets = new Storage(this.client);
  }

  async uploadFile(file) {
    try {
      return await this.buckets.createFile(config.BUCKET_ID, ID.unique(), file);
    } catch (error) {
      console.log("error in uploadFile", error);
    }
  }

  async deleteFile(fileId) {
    try {
      await this.buckets.deleteFile(config.BUCKET_ID, fileId);
      return true;
    } catch (error) {
      console.log("error in deleteFile", error);
      return false;
    }
  }

  async preview(fileId) {
    try {
      var response = await this.buckets.getFilePreview(
        config.BUCKET_ID,
        fileId
      );
      console.log("response in preview", response);
      return response;
    } catch (error) {
      console.log("error in preview", error);
    }
  }
}

const file = new File();

export default file;
