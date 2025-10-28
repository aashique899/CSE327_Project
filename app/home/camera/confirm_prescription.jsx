import { useLocalSearchParams, useRouter } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function ConfirmPrescription() {
  const { photoUri } = useLocalSearchParams();
  const router = useRouter();

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
        >
          <Text className="text-white text-lg font-bold text-center">
            Retake
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-[#3D6DB4] rounded-3xl w-[120px] py-6"
          onPress={() =>
            router.push({
              pathname: "/home/camera/edit_prescription",
              params: {
                photoUri: photoUri,
              },
            })
          }
        >
          <Text className="text-white text-lg font-bold text-center">Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
