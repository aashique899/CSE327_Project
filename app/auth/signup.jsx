import { Link } from "expo-router";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignUp() {
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
        />
        <TextInput
          className="text-black border border-gray-600 rounded-xl px-4 py-5 placeholder:text-gray-600"
          placeholder="Email"
        />
        <TextInput
          className="text-black border border-gray-600 rounded-xl px-4 py-5 placeholder:text-gray-600"
          placeholder="Password"
        />
        <TextInput
          className="text-black border border-gray-600 rounded-xl px-4 py-5 placeholder:text-gray-600"
          placeholder="Confirm Password"
        />
      </View>

      <View className="w-full mb-10">
        <TouchableOpacity className="bg-[#3D6DB4] rounded-3xl py-6">
          <Text className="text-white text-lg font-bold text-center">
            Sign Up
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
