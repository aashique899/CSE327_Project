import { Image, Text, View } from "react-native";

export default function MedicalHistoryList() {
  return (
    <View className="flex-1 flex-row bg-white shadow rounded-3xl max-h-[240px] p-4 mt-4">
      <Image
        className="w-20 h-24 rounded-xl mr-2"
        source={require("@/assets/images/Prescription.jpg")}
      />

      <View>
        <Text className="text-black text-xl font-bold">Dr. Ashik Huda</Text>
        <Text className="text-black text-base font-normal">City Hospital</Text>
        <Text className="text-black text-base font-light mt-auto">
          Nov 01, 2025
        </Text>
      </View>

      <View className="flex justify-start items-end gap-2 ml-auto">
        <Text className="bg-green-500 text-white text-sm font-medium px-2 rounded-full">
          #Fever
        </Text>
        <Text className="bg-green-500 text-white text-sm font-medium px-2 rounded-full">
          #Ceveh
        </Text>
      </View>
    </View>
  );
}
