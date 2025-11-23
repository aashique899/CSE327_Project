import { Link, useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const router = useRouter();
  const { login } = useAuth();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  async function onLogin() {
    if (!form.email || !form.password) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    setIsLoading(true);
    try {
      const user = await login(form.email, form.password);

      if (user) {
        Alert.alert("Success", "Logged in successfully!");
        router.replace("/home");
      }
    } catch (error) {
      Alert.alert("Login Error", error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <SafeAreaView className="flex-1 justify-start items-center px-5">
      <View className="w-full gap-4 mb-10 mt-20">
        <Text className="text-black text-3xl font-bold">Log In</Text>
        <Text className="text-gray-600">Enter your email and password</Text>
      </View>

      <View className="w-full gap-2 mb-2">
        <TextInput
          className="text-black border border-gray-600 rounded-xl px-4 py-5 placeholder:text-gray-600"
          placeholder="Email"
          value={form.email}
          onChangeText={(e) => setForm({ ...form, email: e.toLowerCase() })}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          className="text-black border border-gray-600 rounded-xl px-4 py-5 placeholder:text-gray-600"
          placeholder="Password"
          value={form.password}
          onChangeText={(e) => setForm({ ...form, password: e })}
          secureTextEntry
        />
      </View>

      <View className="w-full mb-10">
        <Link
          className="text-[#5892E8] font-semibold text-right"
          href={"/auth/forgot_password/send_verification_code"}
        >
          Forgot Password?
        </Link>
      </View>

      <View className="w-full mb-10">
        <TouchableOpacity
          className={`bg-[#3D6DB4] rounded-3xl py-6 ${
            isLoading ? "opacity-50" : ""
          }`}
          onPress={onLogin}
          disabled={isLoading}
        >
          <Text className="text-white text-lg font-bold text-center">
            {isLoading ? "Logging In..." : "Log In"}
          </Text>
        </TouchableOpacity>
      </View>

      <View className="flex-row items-center gap-2 mb-10">
        <View className="bg-gray-500 w-[100px] h-[1px]"></View>
        <Text className="text-gray-600">or continue with</Text>
        <View className="bg-gray-500 w-[100px] h-[1px]"></View>
      </View>

      <View className="flex-row gap-4 mb-10">
        <Image
          className="border border-gray-600 rounded-xl"
          source={require("@/assets/images/google.png")}
        />
        <Image
          className="border border-gray-600 rounded-xl"
          source={require("@/assets/images/apple.png")}
        />
      </View>

      <View className="flex-row gap-1">
        <Text className="text-gray-600">Don’t have an account?</Text>
        <Link
          className="text-[#5892E8] font-semibold text-right"
          href={"/auth/signup"}
        >
          Sign Up
        </Link>
      </View>
    </SafeAreaView>
  );
}
