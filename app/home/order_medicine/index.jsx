import { Query } from "appwrite";
import { useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import OrderMedicineList from "../../(component)/order_medicine_list";
import { useAuth } from "../../../context/AuthContext";
import { appwriteConfig, databases } from "../../../lib/appwrite/config";

export default function OrderMedicine() {
  const { user } = useAuth();
  const router = useRouter();

  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  const getMockPrice = (name) => {
    return name.length * 5 + 10;
  };

  useEffect(() => {
    fetchPrescriptions();
  }, [user]);

  useEffect(() => {
    calculateTotal();
  }, [medicines]);

  const fetchPrescriptions = async () => {
    if (!user) return;

    try {
      if (!refreshing) setLoading(true);

      const response = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.collectionId,
        [Query.equal("user_id", user.$id)]
      );

      let extractedMedicines = [];

      response.documents.forEach((doc) => {
        if (doc.medications) {
          try {
            const medArray = JSON.parse(doc.medications);

            const formattedMeds = medArray.map((med, index) => ({
              id: med.id || `${doc.$id}-${index}`,
              name: med.name,
              dose: `${med.doses_time_01?.join(", ")} ${med.doses_time_02}`,
              price: getMockPrice(med.name),
              quantity: 1,
            }));

            extractedMedicines = [...extractedMedicines, ...formattedMeds];
          } catch (e) {
            console.error("Error parsing medications JSON", e);
          }
        }
      });

      setMedicines(extractedMedicines);
    } catch (error) {
      console.error("Error fetching prescriptions:", error);
      Alert.alert("Error", "Could not fetch medicine list.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchPrescriptions();
  }, []);

  const calculateTotal = () => {
    const total = medicines.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotalPrice(total);
  };

  const handleIncrease = (id) => {
    setMedicines((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrease = (id) => {
    setMedicines((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const handleDelete = (id) => {
    setMedicines((prev) => prev.filter((item) => item.id !== id));
  };

  const handleCheckout = () => {
    if (medicines.length === 0) {
      Alert.alert("Empty Cart", "Please add items to cart first.");
      return;
    }

    router.push({
      pathname: "/home/order_medicine/invoice",
      params: {
        orderData: JSON.stringify(medicines),
        total: totalPrice,
      },
    });
  };

  if (loading && !refreshing) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#3D6DB4" />
        <Text className="mt-2 text-gray-500">Loading Prescriptions...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1">
      <ScrollView
        className="bg-white p-5 pt-0"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View className="h-5"></View>

        {medicines.length === 0 ? (
          <View className="items-center mt-10">
            <Text className="text-gray-400 text-lg">
              No medicines found in your prescriptions.
            </Text>
          </View>
        ) : (
          medicines.map((item) => (
            <OrderMedicineList
              key={item.id}
              item={item}
              onIncrease={() => handleIncrease(item.id)}
              onDecrease={() => handleDecrease(item.id)}
              onDelete={() => handleDelete(item.id)}
            />
          ))
        )}

        {/* Spacer for bottom view */}
        <View className="h-20"></View>
      </ScrollView>

      <View className="bg-white p-5 gap-2 border-t border-gray-100 shadow-lg">
        <View className="flex-row justify-between px-2">
          <Text className="text-black text-lg font-bold">Total:</Text>
          <Text className="text-black text-lg font-bold">
            ৳{totalPrice.toFixed(2)}
          </Text>
        </View>

        <TouchableOpacity
          className="bg-[#3D6DB4] rounded-3xl py-4"
          onPress={handleCheckout}
        >
          <Text className="text-white text-lg font-bold text-center">
            Checkout
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
