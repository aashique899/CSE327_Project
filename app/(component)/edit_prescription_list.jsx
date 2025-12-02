import { Text, TextInput, TouchableOpacity, View } from "react-native";

export default function EditPrescriptionList({ medication, onUpdate }) {
  const hasDose = (time) => {
    return (
      Array.isArray(medication.doses_time_01) &&
      medication.doses_time_01.includes(time)
    );
  };

  const isMealSelected = (type) => {
    return medication.doses_time_02 === type;
  };

  const toggleDose = (time) => {
    let currentDoses = Array.isArray(medication.doses_time_01)
      ? [...medication.doses_time_01]
      : [];

    if (currentDoses.includes(time)) {
      currentDoses = currentDoses.filter((t) => t !== time);
    } else {
      currentDoses.push(time);
    }
    onUpdate(medication.id, "doses_time_01", currentDoses);
  };

  const setMealInstruction = (instruction) => {
    onUpdate(medication.id, "doses_time_02", instruction);
  };

  return (
    <View className="bg-white shadow-md shadow-black rounded-3xl m-4 p-4 border border-gray-100">
      <View className="flex-row items-center justify-between mb-4">
        <Text className="text-base font-medium">Med:</Text>
        <TextInput
          className="text-black border border-gray-400 w-[240px] rounded-xl px-3 py-3 font-semibold"
          placeholder="Medicine Name"
          value={medication.name}
          onChangeText={(text) => onUpdate(medication.id, "name", text)}
        />
      </View>

      <View className="gap-3">
        <Text className="text-base font-medium">Schedule:</Text>

        <View className="flex-row justify-between mb-2">
          {["morning", "noon", "night"].map((time) => (
            <TouchableOpacity
              key={time}
              onPress={() => toggleDose(time)}
              className={`px-4 py-2 rounded-lg border ${
                hasDose(time)
                  ? "bg-blue-100 border-blue-500"
                  : "bg-gray-50 border-gray-300"
              }`}
            >
              <Text
                className={`capitalize ${
                  hasDose(time) ? "text-blue-800 font-bold" : "text-gray-500"
                }`}
              >
                {time}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View className="flex-row gap-4">
          {["before meal", "after meal"].map((instruction) => (
            <TouchableOpacity
              key={instruction}
              onPress={() => setMealInstruction(instruction)}
              className={`flex-1 py-3 rounded-lg border items-center ${
                isMealSelected(instruction)
                  ? "bg-blue-100 border-blue-500"
                  : "bg-gray-50 border-gray-300"
              }`}
            >
              <Text
                className={`capitalize ${
                  isMealSelected(instruction)
                    ? "text-blue-800 font-bold"
                    : "text-gray-500"
                }`}
              >
                {instruction}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}
