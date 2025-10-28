import { Link, useRouter } from "expo-router";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ResetPassword() {
  const router = useRouter();

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
        />
        <TextInput
          className="text-black border border-gray-600 rounded-xl px-4 py-5 placeholder:text-gray-600"
          placeholder="Confirm New Password"
        />
      </View>

      <View className="w-full mb-10">
        <TouchableOpacity
          className="bg-[#3D6DB4] rounded-3xl py-6"
          onPress={() => router.navigate("/auth/login")}
        >
          <Text className="text-white text-lg font-bold text-center">
            Reset Password
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
