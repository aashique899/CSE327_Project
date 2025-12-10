import { Query } from "appwrite";
import { useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";

import MedicalHistoryList from "../../(component)/medical_history_list";
import { useAuth } from "../../../context/AuthContext";
import { appwriteConfig, databases } from "../../../lib/appwrite/config";

export default function MedicalHistory() {
  const { user } = useAuth();
  const router = useRouter();
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchHistory();
  }, [user]);

  const fetchHistory = async () => {
    if (!user) return;
    try {
      if (!refreshing) setLoading(true);

      const response = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.collectionId,
        [Query.equal("user_id", user.$id), Query.orderDesc("$createdAt")]
      );
      setPrescriptions(response.documents);
    } catch (error) {
      console.error("Error fetching history:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchHistory();
  }, []);

  const filteredPrescriptions = prescriptions.filter(
    (p) =>
      p.doctor_name.toLowerCase().includes(search.toLowerCase()) ||
      p.hospital_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <ScrollView
      className="flex-1 bg-white p-5"
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Text className="text-2xl font-bold mb-4 mt-2">Medical History</Text>

      <TextInput
        className="text-black border border-gray-200 rounded-xl px-4 py-4 placeholder:text-gray-400 bg-gray-50 mb-2"
        placeholder="Search doctor or hospital..."
        value={search}
        onChangeText={setSearch}
      />

      {loading && !refreshing ? (
        <ActivityIndicator size="large" color="#3D6DB4" className="mt-10" />
      ) : (
        filteredPrescriptions.map((item) => (
          <MedicalHistoryList
            key={item.$id}
            doctorName={item.doctor_name}
            hospitalName={item.hospital_name}
            date={item.$createdAt}
            imageUrl={item.image_url}
            onPress={() =>
              router.push({
                pathname: "/home/medical_history/prescription_details",
                params: { data: JSON.stringify(item) },
              })
            }
          />
        ))
      )}

      {!loading && filteredPrescriptions.length === 0 && (
        <Text className="text-center text-gray-400 mt-10">
          No prescriptions found.
        </Text>
      )}

      <View className="h-20" />
    </ScrollView>
  );
}
