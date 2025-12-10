import { Account, Client, Databases, Functions, ID, Storage } from "appwrite";

require("react-native-url-polyfill/auto");

const appwriteConfig = {
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
  databaseId: "692f432a0027bc9a2c01",
  collectionId: "692f437d0005573cdd8e",
  functionId: "692f3b830030492ff5c9",
  bucketId: "692f4587000b6898b26a",
  deepLinkScheme: "cse327project",
};

const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId);

const account = new Account(client);
const databases = new Databases(client);
const functions = new Functions(client);
const storage = new Storage(client);

export { account, appwriteConfig, client, databases, functions, ID, storage };
