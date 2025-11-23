import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { sendPasswordResetEmail } from "../../../lib/appwrite/auth";

export default function SendVerificationCode() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSend = async () => {
    console.log("onSend function called.");

    if (!email) {
      Alert.alert("Error", "Please enter your email address.");
      return;
    }

    console.log("Email is valid, calling Appwrite with:", email);
    setIsLoading(true);

    try {
      const success = await sendPasswordResetEmail(email);

      console.log("sendPasswordResetEmail returned:", success);

      if (success) {
        Alert.alert(
          "Check Your Email",
          "A password reset link has been sent to your email. Please check your inbox (and spam folder)."
        );
      } else {
        console.log(
          "sendPasswordResetEmail returned false (error already alerted)."
        );
      }
    } catch (error) {
      console.error("An unexpected error occurred in onSend:", error.message);
      Alert.alert("An Unexpected Error Occurred", error.message);
    } finally {
      setIsLoading(false);
      console.log("onSend function finished.");
    }
  };

  return (
    <SafeAreaView className="flex-1 justify-start items-center px-5">
      <View className="w-full gap-4 mb-10 mt-20">
        <Text className="text-black text-3xl font-bold">Forgot Password?</Text>
        <Text className="text-gray-600">
          Enter your email address for a verification link
        </Text>
      </View>

      <View className="w-full gap-2 mb-10">
        <TextInput
          className="text-black border border-gray-600 rounded-xl px-4 py-5 placeholder:text-gray-600"
          placeholder="Email"
          value={email}
          onChangeText={(e) => setEmail(e.toLowerCase())}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <View className="w-full mb-10">
        <TouchableOpacity
          className={`bg-[#3D6DB4] rounded-3xl py-6 ${
            isLoading ? "opacity-50" : ""
          }`}
          onPress={onSend}
          disabled={isLoading}
        >
          <Text className="text-white text-lg font-bold text-center">
            {isLoading ? "Sending..." : "Send Reset Link"}
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
