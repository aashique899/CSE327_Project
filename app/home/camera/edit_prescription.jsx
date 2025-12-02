import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import EditPrescriptionList from "../../(component)/edit_prescription_list";
import { useAuth } from "../../../context/AuthContext";
import { appwriteConfig, databases, ID } from "../../../lib/appwrite/config";

export default function EditPrescription() {
  const { photoUri, extractedData } = useLocalSearchParams();
  const router = useRouter();
  const { user } = useAuth();

  const [loading, setLoading] = useState(false);
  const [doctorName, setDoctorName] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const [medications, setMedications] = useState([]);

  useEffect(() => {
    if (extractedData) {
      try {
        const parsed = JSON.parse(extractedData);
        setDoctorName(parsed.doctor_name || "");
        setHospitalName(parsed.hospital_name || "");
        const medsWithIds = (parsed.medications || []).map((med, index) => ({
          ...med,
          id: Date.now() + index,
        }));
        setMedications(medsWithIds);
      } catch (e) {
        Alert.alert("Error", "Failed to parse prescription data");
      }
    }
  }, [extractedData]);

  const updateMedication = (id, field, value) => {
    setMedications((prev) =>
      prev.map((med) => (med.id === id ? { ...med, [field]: value } : med))
    );
  };

  const handleSaveToDatabase = async () => {
    if (!user) {
      Alert.alert("Error", "You must be logged in to save.");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        user_id: user.$id,
        doctor_name: doctorName,
        hospital_name: hospitalName,
        medications: JSON.stringify(medications),
      };

      await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.collectionId,
        ID.unique(),
        payload
      );

      Alert.alert("Success", "Prescription saved successfully!", [
        { text: "OK", onPress: () => router.push("/home") },
      ]);
    } catch (error) {
      console.error("Save Error:", error);
      Alert.alert("Error", "Failed to save prescription.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-white">
      <ScrollView className="flex-1 bg-white mb-20">
        <View className="w-full gap-4 p-5">
          <Text className="text-black text-lg font-semibold">Details:</Text>

          <TextInput
            className="text-black border border-gray-600 rounded-xl px-4 py-4 placeholder:text-gray-600"
            placeholder="Hospital Name"
            value={hospitalName}
            onChangeText={setHospitalName}
          />

          <TextInput
            className="text-black border border-gray-600 rounded-xl px-4 py-4 placeholder:text-gray-600"
            placeholder="Doctor Name"
            value={doctorName}
            onChangeText={setDoctorName}
          />
        </View>

        <View className="w-full gap-2 pb-10">
          <Text className="text-black text-lg font-semibold mx-4">Rx:</Text>

          {medications.map((med, index) => (
            <EditPrescriptionList
              key={med.id}
              medication={med}
              onUpdate={updateMedication}
            />
          ))}
        </View>
      </ScrollView>

      <View className="absolute bottom-0 w-full p-4 bg-white border-t border-gray-100">
        <TouchableOpacity
          className="bg-[#3D6DB4] rounded-3xl w-full py-4 shadow-lg"
          onPress={handleSaveToDatabase}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white text-lg font-bold text-center">
              Confirm & Save
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}
