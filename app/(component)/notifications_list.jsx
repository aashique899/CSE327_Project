import Checkbox from "expo-checkbox";
import { useState } from "react";
import { Image, Text, View } from "react-native";

export default function NotificationsList({
  medicineName,
  instruction,
  timeSlot,
  onDone,
}) {
  const [isChecked, setChecked] = useState(false);

  const handleCheck = (value) => {
    setChecked(value);
    if (value) {
      setTimeout(() => {
        onDone();
      }, 500);
    }
  };

  return (
    <View className="flex-row bg-white shadow-sm shadow-gray-300 rounded-3xl p-4 mb-4 border border-gray-100 items-center">
      <View className="bg-blue-50 w-16 h-16 rounded-2xl items-center justify-center mr-4">
        <Image
          source={require("@/assets/images/Medicine.jpg")}
          className="w-12 h-12 rounded-lg"
          resizeMode="cover"
        />
      </View>

      <View className="flex-1">
        <View className="flex-row justify-between items-start">
          <Text className="text-black text-lg font-bold flex-1">
            {medicineName}
          </Text>
          <View className="bg-red-50 px-2 py-1 rounded-full mt-6">
            <Text className="text-red-500 text-xs font-bold capitalize">
              Now: {timeSlot}
            </Text>
          </View>
        </View>

        <Text className="text-gray-500 text-sm font-medium mt-1">
          {instruction}
        </Text>
      </View>

      <View className="ml-3">
        <Checkbox
          value={isChecked}
          onValueChange={handleCheck}
          color={isChecked ? "#3D6DB4" : undefined}
          style={{ width: 24, height: 24 }}
        />
      </View>
    </View>
  );
}
