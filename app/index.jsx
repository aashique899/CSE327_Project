import { useRouter } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import "../global.css";

export default function Index() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 justify-center items-center">
      <View className="flex-1 justify-center items-center">
        <Image
          className="size-40"
          source={require("@/assets/images/logo-t.png")}
        />
      </View>

      <View className="w-full px-10 mb-10">
        <TouchableOpacity
          className="bg-[#3D6DB4] w-full py-6 rounded-3xl"
          onPress={() => router.navigate("/auth/login")}
        >
          <Text className="text-white text-center text-lg font-bold">
            Get Started
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
