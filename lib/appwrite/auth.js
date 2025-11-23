import { Alert } from "react-native";
import { account, appwriteConfig, ID } from "./config";

export async function createUser(email, password, name) {
  try {
    const newAccount = await account.create(ID.unique(), email, password, name);

    if (!newAccount) throw Error;

    const session = await loginUser(email, password);
    return session;
  } catch (error) {
    console.error("Error in createUser:", error.message);
    Alert.alert("Error", error.message);
    return null;
  }
}

export async function loginUser(email, password) {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    console.error("Error in loginUser:", error.message);
    Alert.alert("Error", error.message);
    return null;
  }
}

export async function getCurrentUser() {
  try {
    const currentAccount = await account.get();
    return currentAccount;
  } catch (error) {
    console.log("Error in getCurrentUser: ", error.message);
    return null;
  }
}

export async function logoutUser() {
  try {
    await account.deleteSession("current");
  } catch (error) {
    console.error("Error in logoutUser:", error.message);
    Alert.alert("Error", error.message);
  }
}

export async function sendPasswordResetEmail(email) {
  const resetURL = `${appwriteConfig.deepLinkScheme}://auth/forgot_password/reset_password`;

  console.log("Attempting to send reset link with URL:", resetURL);

  try {
    await account.createRecovery(email, resetURL);
    return true;
  } catch (error) {
    console.error("Error in sendPasswordResetEmail:", error.message);
    Alert.alert("Error", error.message);
    return false;
  }
}

export async function resetPassword(
  userId,
  secret,
  newPassword,
  confirmPassword
) {
  if (newPassword !== confirmPassword) {
    Alert.alert("Error", "Passwords do not match.");
    return false;
  }

  if (newPassword.length < 8) {
    Alert.alert("Error", "Password must be at least 8 characters long.");
    return false;
  }

  try {
    await account.updateRecovery(userId, secret, newPassword, confirmPassword);
    return true;
  } catch (error) {
    console.error("Error in resetPassword:", error.message);
    Alert.alert("Error", error.message);
    return false;
  }
}
