import EvilIcons from "@expo/vector-icons/EvilIcons";
import Feather from "@expo/vector-icons/Feather";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function OrderMedicineList({
  item,
  onIncrease,
  onDecrease,
  onDelete,
}) {
  const subtotal = item.price * item.quantity;

  return (
    <View className="flex-1 flex-row bg-white shadow rounded-3xl max-h-[240px] p-4 mb-4">
      <Image
        className="w-20 h-20 rounded-xl mr-2"
        source={require("@/assets/images/Napa.webp")}
        resizeMode="contain"
      />

      <View className="flex-1">
        <Text className="text-black text-lg font-bold" numberOfLines={1}>
          {item.name}
        </Text>
        <Text className="text-gray-500 text-xs font-normal">
          {item.dose || "Standard Dose"}
        </Text>
        <Text className="text-black text-sm font-normal mt-1">
          Unit Price: ৳{item.price.toFixed(2)}
        </Text>

        <View className="flex flex-row items-center gap-2 mt-3">
          <TouchableOpacity onPress={onDecrease}>
            <EvilIcons name="minus" size={34} color="black" />
          </TouchableOpacity>

          <TextInput
            className="text-black border border-black rounded-xl px-4 py-1 text-center min-w-[40px]"
            value={String(item.quantity)}
            editable={false}
          />

          <TouchableOpacity onPress={onIncrease}>
            <EvilIcons name="plus" size={34} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      <View className="flex justify-between items-end ml-2">
        <Text className="text-black text-lg font-bold">
          ৳{subtotal.toFixed(2)}
        </Text>
        <TouchableOpacity onPress={onDelete} className="mb-2">
          <Feather name="trash-2" size={24} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
