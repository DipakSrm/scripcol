import { Client, Account, Databases } from "appwrite";

const client = new Client();

const account = new Account(client);
const database = new Databases(client);
client
  .setEndpoint("https://cloud.appwrite.io/v1") // Your API Endpoint
  .setProject("64fb4e4d6e35d446bef2"); // Your project ID

export { client, account, database };
