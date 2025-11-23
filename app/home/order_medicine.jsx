import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import OrderMedicineList from "../(component)/order_medicine_list";

export default function OrderMedicine() {
  return (
    <View className="flex-1">
      <ScrollView className="bg-white p-5 pt-0">
        <View className="h-5"></View>
        <OrderMedicineList />
        <OrderMedicineList />
        <OrderMedicineList />
        <OrderMedicineList />
        <OrderMedicineList />
        <OrderMedicineList />
        <OrderMedicineList />
      </ScrollView>

      <View className="bg-white p-5 gap-2">
        <View className="flex-row justify-between px-2">
          <Text className="text-black text-lg font-bold">Total:</Text>
          <Text className="text-black text-lg font-bold">৳1,245.00</Text>
        </View>

        <TouchableOpacity className="bg-[#3D6DB4] rounded-3xl py-6">
          <Text className="text-white text-lg font-bold text-center">
            Checkout
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
