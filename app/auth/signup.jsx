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

export default function SignUp() {
  const router = useRouter();
  const { signup } = useAuth();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  async function onSignUp() {
    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }

    if (form.password.length < 8) {
      Alert.alert("Error", "Password must be at least 8 characters long.");
      return;
    }

    setIsLoading(true);
    try {
      const user = await signup(form.email, form.password, form.name);

      if (user) {
        Alert.alert("Success", "Account created successfully!");
        router.replace("/home");
      }
    } catch (error) {
      Alert.alert("Signup Error", error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <SafeAreaView className="flex-1 justify-start items-center px-5">
      <View className="w-full gap-4 mb-10 mt-20">
        <Text className="text-black text-3xl font-bold">Sign Up</Text>
        <Text className="text-gray-600">
          Enter credentials to create new account
        </Text>
      </View>

      <View className="w-full gap-2 mb-10">
        <TextInput
          className="text-black border border-gray-600 rounded-xl px-4 py-5 placeholder:text-gray-600"
          placeholder="Name"
          value={form.name}
          onChangeText={(e) => setForm({ ...form, name: e })}
        />
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
        <TextInput
          className="text-black border border-gray-600 rounded-xl px-4 py-5 placeholder:text-gray-600"
          placeholder="Confirm Password"
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
          onPress={onSignUp}
          disabled={isLoading}
        >
          <Text className="text-white text-lg font-bold text-center">
            {isLoading ? "Signing Up..." : "Sign Up"}
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
        <Text className="text-gray-600">Already have an account?</Text>
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
