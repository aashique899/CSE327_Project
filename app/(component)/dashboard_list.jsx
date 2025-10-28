import Checkbox from "expo-checkbox";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function DashboardList() {
  const [isChecked, setChecked] = useState(false);

  return (
    <View className="flex-row justify-between mb-6">
      <View>
        <Text className="text-black text-lg font-medium mb-1">
          Medicine Name
        </Text>
        <Text className="text-black/70 text-lg font-medium">Doctor Name</Text>
        <Text className="text-black/70 text-base font-medium">
          Night - After Meal
        </Text>
      </View>

      <View className="flex justify-between">
        <Checkbox
          value={isChecked}
          onValueChange={setChecked}
          color={isChecked ? "#3D6DB4" : undefined}
        />
        <TouchableOpacity>
          <Text className="text-[#5892E8] text-base font-bold">Skip</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
