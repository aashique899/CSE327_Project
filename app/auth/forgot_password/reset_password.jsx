import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { resetPassword } from "../../../lib/appwrite/auth";

export default function ResetPassword() {
  const router = useRouter();

  const { userId, secret } = useLocalSearchParams();

  const [form, setForm] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const [userIdState, setUserIdState] = useState("");
  const [secretState, setSecretState] = useState("");

  useEffect(() => {
    if (userId && typeof userId === "string") {
      setUserIdState(userId);
    }
    if (secret && typeof secret === "string") {
      setSecretState(secret);
    }

    if (!userId || !secret) {
      console.log("Waiting for user ID and secret from URL...");
    }
  }, [userId, secret]);

  const onReset = async () => {
    if (!form.newPassword || !form.confirmPassword) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    if (!userIdState || !secretState) {
      Alert.alert(
        "Error",
        "Invalid or expired session. Please request a new reset link."
      );
      return;
    }

    setIsLoading(true);
    try {
      const success = await resetPassword(
        userIdState,
        secretState,
        form.newPassword,
        form.confirmPassword
      );

      if (success) {
        Alert.alert(
          "Success",
          "Password reset successfully. You can now log in."
        );
        router.replace("/auth/login");
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  if (!userIdState || !secretState) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center px-5">
        <Text className="text-gray-600">Loading recovery session...</Text>
        <Text className="text-gray-600 mt-2 text-center">
          If you didn't open this from an email link, please request a password
          reset.
        </Text>
        <Link
          className="text-[#5892E8] font-semibold text-center mt-4"
          href={"/auth/login"}
        >
          Back to Login
        </Link>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 justify-start items-center px-5">
      <View className="w-full gap-4 mb-10 mt-20">
        <Text className="text-black text-3xl font-bold">Reset Password</Text>
        <Text className="text-gray-600">Enter a new password to reset it</Text>
      </View>

      <View className="w-full gap-2 mb-10">
        <TextInput
          className="text-black border border-gray-600 rounded-xl px-4 py-5 placeholder:text-gray-600"
          placeholder="New Password"
          value={form.newPassword}
          onChangeText={(e) => setForm({ ...form, newPassword: e })}
          secureTextEntry
        />
        <TextInput
          className="text-black border border-gray-600 rounded-xl px-4 py-5 placeholder:text-gray-600"
          placeholder="Confirm New Password"
          value={form.confirmPassword}
          onChangeText={(e) => setForm({ ...form, confirmPassword: e })}
          secureTextEntry
        />
      </View>

      <View className="w-full mb-10">
        <TouchableOpacity
          className={`bg-[#3D6DB4] rounded-3xl py-6 ${
            isLoading ? "opacity-50" : ""
          }`}
          onPress={onReset}
          disabled={isLoading}
        >
          <Text className="text-white text-lg font-bold text-center">
            {isLoading ? "Resetting..." : "Reset Password"}
          </Text>
        </TouchableOpacity>
      </View>

      <View className="flex-row items-center gap-2 mb-10">
        <View className="bg-gray-500 w-[200px] h-[1px]"></View>
      </View>

      <View className="flex-row gap-1">
        <Text className="text-gray-600">Remember your password?</Text>
        <Link
          className="text-[#5892E8] font-semibold text-right"
          href={"/auth/login"}
        >
          Login
        </Link>
      </View>
    </SafeAreaView>
  );
}
