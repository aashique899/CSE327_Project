import EvilIcons from "@expo/vector-icons/EvilIcons";
import Feather from "@expo/vector-icons/Feather";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function OrderMedicineList() {
  return (
    <View className="flex-1 flex-row bg-white shadow rounded-3xl max-h-[240px] p-4 mb-4">
      <Image
        className="w-20 h-20 rounded-xl mr-2"
        source={require("@/assets/images/Napa.webp")}
      />

      <View>
        <Text className="text-black text-xl font-bold">Napa 500mg</Text>
        <Text className="text-black text-sm font-normal">
          12 Tablets (1 Strip) - ৳25.00
        </Text>

        <View className="flex flex-row items-center gap-2 mt-5">
          <TouchableOpacity>
            <EvilIcons name="minus" size={34} color="black" />
          </TouchableOpacity>
          <TextInput
            className="text-black border border-black rounded-xl px-5 py-1 placeholder:text-black"
            placeholder="2"
          />
          <TouchableOpacity>
            <EvilIcons name="plus" size={34} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      <View className="flex justify-start items-end ml-auto">
        <Text className="text-black text-lg font-bold">৳50.00</Text>
        <TouchableOpacity className="mt-auto">
          <Feather name="trash-2" size={24} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
