import { Image, Text, TouchableOpacity, View } from "react-native";

export default function MedicalHistoryList({
  doctorName,
  hospitalName,
  date,
  imageUrl,
  onPress,
}) {
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-1 flex-row bg-white shadow-sm shadow-gray-300 rounded-3xl p-4 mt-4 border border-gray-100"
    >
      <Image
        className="w-20 h-24 rounded-xl mr-4 bg-gray-200"
        source={
          imageUrl
            ? { uri: imageUrl }
            : require("@/assets/images/Prescription.jpg")
        }
      />

      <View className="flex-1 justify-between py-1">
        <View>
          <Text className="text-black text-lg font-bold" numberOfLines={1}>
            {doctorName || "Unknown Doctor"}
          </Text>
          <Text className="text-gray-500 text-sm font-normal" numberOfLines={1}>
            {hospitalName || "Unknown Hospital"}
          </Text>
        </View>

        <Text className="text-blue-500 text-xs font-bold mt-auto">
          {formattedDate}
        </Text>
      </View>

      <View className="flex justify-center">
        <Text className="text-gray-300">›</Text>
      </View>
    </TouchableOpacity>
  );
}
