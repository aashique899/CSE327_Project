import { Account, Client, Databases, Functions, ID, Storage } from "appwrite";

require("react-native-url-polyfill/auto");

const appwriteConfig = {
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
  databaseId: "69348642001237d724f7",
  collectionId: "69348657003598807974",
  functionId: "69348762003e4304ce30",
  bucketId: "6934883c001ae3f9a4a9",
  deepLinkScheme: "rxsynccse299",
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
