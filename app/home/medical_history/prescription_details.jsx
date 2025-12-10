import { useLocalSearchParams, useRouter } from "expo-router";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function PrescriptionDetails() {
  const { data } = useLocalSearchParams();
  const router = useRouter();

  const prescription = data ? JSON.parse(data) : null;

  if (!prescription) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>No data found.</Text>
      </View>
    );
  }

  const medications = prescription.medications
    ? typeof prescription.medications === "string"
      ? JSON.parse(prescription.medications)
      : prescription.medications
    : [];

  return (
    <ScrollView className="flex-1 bg-white p-5">
      <Image
        source={
          prescription.image_url
            ? { uri: prescription.image_url }
            : require("@/assets/images/Prescription.jpg")
        }
        className="w-full h-[400px] rounded-3xl mb-6"
        resizeMode="contain"
      />

      <View className="mb-6 border-b border-gray-100 pb-4">
        <Text className="text-gray-500 text-sm font-medium uppercase mb-1">
          Doctor
        </Text>
        <Text className="text-black text-2xl font-bold mb-4">
          {prescription.doctor_name}
        </Text>

        <Text className="text-gray-500 text-sm font-medium uppercase mb-1">
          Hospital
        </Text>
        <Text className="text-black text-lg font-medium">
          {prescription.hospital_name}
        </Text>
      </View>

      <View className="mb-10">
        <Text className="text-[#3D6DB4] text-xl font-bold mb-4">
          Medications
        </Text>
        {medications.map((med, index) => (
          <View
            key={index}
            className="bg-gray-50 p-4 rounded-xl mb-3 border border-gray-100"
          >
            <Text className="text-lg font-bold text-black">{med.name}</Text>

            <View className="flex-row flex-wrap gap-2 mt-2">
              {med.doses_time_01 &&
                med.doses_time_01.map((time, tIndex) => (
                  <Text
                    key={tIndex}
                    className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded capitalize"
                  >
                    {time}
                  </Text>
                ))}
              <Text className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded capitalize">
                {med.doses_time_02}
              </Text>
            </View>
          </View>
        ))}
      </View>

      <TouchableOpacity
        onPress={() => router.back()}
        className="bg-[#3D6DB4] py-4 rounded-xl mb-10"
      >
        <Text className="text-white text-center font-bold text-lg">Back</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
