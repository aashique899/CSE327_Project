import { Link, useRouter } from "expo-router";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Verification() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 justify-start items-center px-5">
      <View className="w-full gap-4 mb-10 mt-20">
        <Text className="text-black text-3xl font-bold">Verification</Text>
        <Text className="text-gray-600">
          Enter 4-digit verification code sent to your email
        </Text>
      </View>

      <View className="flex-row justify-evenly items-center w-full gap-2 mb-10">
        <TextInput
          className="text-black text-center border border-gray-600 rounded-xl px-4 py-5 w-16 placeholder:text-gray-600"
          placeholder="*"
        />
        <TextInput
          className="text-black text-center border border-gray-600 rounded-xl px-4 py-5 w-16 placeholder:text-gray-600"
          placeholder="*"
        />
        <TextInput
          className="text-black text-center border border-gray-600 rounded-xl px-4 py-5 w-16 placeholder:text-gray-600"
          placeholder="*"
        />
        <TextInput
          className="text-black text-center border border-gray-600 rounded-xl px-4 py-5 w-16 placeholder:text-gray-600"
          placeholder="*"
        />
      </View>

      <View className="flex-row gap-1 mb-10">
        <Text className="text-gray-600">
          Didn't receive a verification code?
        </Text>
        <TouchableOpacity>
          <Text className="text-[#5892E8] font-semibold text-right">
            Resend
          </Text>
        </TouchableOpacity>

        {/* <Text className="text-gray-600">Resend verification code in</Text>
        <Text className="text-[#5892E8] font-semibold text-right">46s</Text> */}
      </View>

      <View className="w-full mb-10">
        <TouchableOpacity
          className="bg-[#3D6DB4] rounded-3xl py-6"
          onPress={() =>
            router.navigate("/auth/forgot_password/reset_password")
          }
        >
          <Text className="text-white text-lg font-bold text-center">
            Verify
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
