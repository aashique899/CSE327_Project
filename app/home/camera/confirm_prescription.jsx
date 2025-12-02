import { appwriteConfig, functions } from "../../../lib/appwrite/config"; // Adjust path to config

import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
// IMPORT 1: For reading the file
import * as FileSystem from "expo-file-system/legacy";
// IMPORT 2: For compressing the huge image
import * as ImageManipulator from "expo-image-manipulator";

export default function ConfirmPrescription() {
  const { photoUri } = useLocalSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const processImage = async () => {
    if (!photoUri) return;

    try {
      setLoading(true);

      // 1. COMPRESS THE IMAGE
      // Raw camera images are too big (5MB+) and will crash the server.
      // We resize it to max 1024px width and 60% quality.
      const manipulatedImage = await ImageManipulator.manipulateAsync(
        photoUri,
        [{ resize: { width: 1024 } }],
        { compress: 0.6, format: ImageManipulator.SaveFormat.JPEG }
      );

      // 2. Read the compressed image
      const base64 = await FileSystem.readAsStringAsync(manipulatedImage.uri, {
        encoding: "base64",
      });

      console.log("Image compressed & encoded. Sending to Appwrite...");

      const execution = await functions.createExecution(
        appwriteConfig.functionId,
        JSON.stringify({ image: base64 }),
        false,
        "/",
        "POST",
        { "Content-Type": "application/json" }
      );

      // 3. Handle Response
      if (execution.status === "completed") {
        const responseBody = JSON.parse(execution.responseBody);

        // Check for logic errors from Python
        if (responseBody.success === false) {
          throw new Error(
            responseBody.error || "AI could not read the prescription."
          );
        }

        router.push({
          pathname: "/home/camera/edit_prescription",
          params: {
            photoUri: photoUri,
            extractedData: JSON.stringify(responseBody),
          },
        });
      } else {
        // FIX: Handle cases where stderr is empty/undefined
        const errorDetails =
          execution.stderr || execution.responseBody || "Unknown server error";
        throw new Error(`Server Status ${execution.status}: ${errorDetails}`);
      }
    } catch (error) {
      console.error("Analysis Error:", error);
      Alert.alert(
        "Analysis Failed",
        "Please try again or retake the photo.\n\nDetails: " + error.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 justify-center items-center gap-10 bg-white">
      <Image
        source={{ uri: photoUri }}
        className="w-[340px] h-[500px] rounded-3xl"
      />

      <View className="flex-row gap-16">
        <TouchableOpacity
          className="bg-[#3D6DB4] rounded-3xl w-[120px] py-6"
          onPress={() => router.back()}
          disabled={loading}
        >
          <Text className="text-white text-lg font-bold text-center">
            Retake
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className={`bg-[#3D6DB4] rounded-3xl w-[120px] py-6 ${
            loading ? "opacity-50" : "opacity-100"
          }`}
          onPress={processImage}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text className="text-white text-lg font-bold text-center">
              Analyze
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}
