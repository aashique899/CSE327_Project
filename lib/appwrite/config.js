import { Account, Client, ID } from "appwrite";

require("react-native-url-polyfill/auto");

const appwriteConfig = {
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
  deepLinkScheme: "cse327project",
};

const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId);

const account = new Account(client);

export { account, appwriteConfig, client, ID };
