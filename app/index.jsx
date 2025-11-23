import { useRouter } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../context/AuthContext";
import "../global.css";

export default function Index() {
  const router = useRouter();
  const { isLoggedIn, isLoading } = useAuth();

  const handlePress = () => {
    if (isLoggedIn) {
      router.navigate("/home");
    } else {
      router.navigate("/auth/login");
    }
  };

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
          className={`bg-[#3D6DB4] w-full py-6 rounded-3xl ${
            isLoading ? "opacity-50" : ""
          }`}
          onPress={handlePress}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <Text className="text-white text-center text-lg font-bold">
              Get Started
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
