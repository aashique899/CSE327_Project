import Feather from "@expo/vector-icons/Feather";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";

export default function EditPrescriptionList() {
  const [numberOfDoses, setNumberOfDoses] = useState(2);

  return (
    <View className="bg-white shadow shadow-black rounded-3xl m-4 p-4">
      <View className="flex-row items-center justify-between mb-2">
        <Text className="text-balance text-lg font-medium">Medicine:</Text>
        <TextInput
          className="text-black border border-gray-600 w-[250px] rounded-xl px-4 py-5 placeholder:text-gray-600"
          placeholder="Medicine"
          value="Losectil 20 mg"
        />
      </View>

      <View className="flex-row items-center justify-between">
        <Text className="text-balance text-lg font-medium">Doses:</Text>
        <TouchableOpacity onPress={() => setNumberOfDoses((p) => p + 1)}>
          <Feather name="plus" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {Array.from({ length: numberOfDoses }).map((_, index) => (
        <DosesList key={index} />
      ))}
    </View>
  );
}

function DosesList() {
  return (
    <View className="flex-row items-center justify-between">
      <RNPickerSelect
        onValueChange={(value) => console.log(value)}
        items={[
          { label: "Breakfast", value: "breakfast" },
          { label: "Lunch", value: "lunch" },
          { label: "Dinner", value: "dinner" },
        ]}
        value={"lunch"}
        style={pickerSelectStyles}
      />
      <RNPickerSelect
        onValueChange={(value) => console.log(value)}
        items={[
          { label: "After Meal", value: "after_meal" },
          { label: "Before Meal", value: "before_meal" },
        ]}
        value={"after_meal"}
        style={pickerSelectStyles}
      />
    </View>
  );
}

const pickerSelectStyles = StyleSheet.create({
  viewContainer: {
    width: "50%",
  },
});
