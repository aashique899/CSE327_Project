import { useLocalSearchParams } from "expo-router";
import { ScrollView, Text, TextInput, View } from "react-native";
import EditPrescriptionList from "../../(component)/edit_prescription_list";

export default function EditPrescription() {
  const { photoUri } = useLocalSearchParams();

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="w-full gap-2 p-5">
        <Text className="text-black text-lg font-semibold">
          Doctor Information:
        </Text>
        <TextInput
          className="text-black border border-gray-600 rounded-xl px-4 py-5 placeholder:text-gray-600"
          placeholder="Doctor Name"
          value="Dr. Nh Ashik"
        />
      </View>

      <View className="w-full gap-2">
        <Text className="text-black text-lg font-semibold mx-4">Rx:</Text>

        <EditPrescriptionList />
        <EditPrescriptionList />
        <EditPrescriptionList />
      </View>
    </ScrollView>
  );
}
