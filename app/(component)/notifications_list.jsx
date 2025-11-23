import Checkbox from "expo-checkbox";
import { useState } from "react";
import { Image, Text, View } from "react-native";

export default function NotificationsList() {
  const [isChecked, setChecked] = useState(false);

  return (
    <View className="flex-1 flex-row bg-white shadow rounded-3xl max-h-[240px] p-4 mt-4">
      <Image
        className="w-20 h-20 rounded-xl mr-2"
        source={require("@/assets/images/Medicine.jpg")}
      />

      <View>
        <Text className="text-black text-xl font-bold">Napa</Text>
        <Text className="text-black text-base font-normal">500mg</Text>
        <Text className="text-black text-base font-light mt-auto">
          Morning Dose
        </Text>
      </View>

      <View className="flex justify-center ml-auto">
        <Checkbox
          value={isChecked}
          onValueChange={setChecked}
          color={isChecked ? "#3D6DB4" : undefined}
        />
      </View>
    </View>
  );
}
