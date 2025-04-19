import { Client, Account, Databases, ID, Query } from "appwrite";
import config from "../config/config.js";

export class Service {
  client = new Client();
  databases;

  constructor() {
    this.client.setEndpoint(config.APPWRITE_URL).setProject(config.PROJECT_ID);
    this.databases = new Databases(this.client);
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        config.DATABASE_ID,
        config.COLLECTION_ID,
        slug,
        { title, content, featuredImage, status, userId }
      );
    } catch (error) {
      console.log("error in createPost", error);
    }
  }

  async updatePost(slug, { title, content, featuredImage, status, userId }) {
    try {
      return await this.databases.updateDocument(
        config.DATABASE_ID,
        config.COLLECTION_ID,
        slug,
        { title, content, featuredImage, status, userId }
      );
    } catch (error) {
      console.log("error in updatePost", error);
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        config.DATABASE_ID,
        config.COLLECTION_ID,
        slug
      );
      return true;
    } catch (error) {
      console.log("error in deletePost", error);
      return false;
    }
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        config.DATABASE_ID,
        config.COLLECTION_ID,
        slug
      );
    } catch (error) {
      console.log("error in getPost", error);
    }
  }

  async getPosts(queries = [Query.equal[("status", "active")]]) {
    try {
      return await this.databases.getDocument(
        config.DATABASE_ID,
        config.COLLECTION_ID,
        queries
      );
    } catch (error) {
      console.log("error in getPost", error);
    }
  }
}

const service = new Service();

export default service;
