import Checkbox from "expo-checkbox";
import { Text, TouchableOpacity, View } from "react-native";

export default function DashboardList({
  medicineName,
  doctorName,
  timeSlot,
  instruction,
  status,
  onComplete,
  onSkip,
}) {
  const isCompleted = status === "completed";
  const isSkipped = status === "skipped";

  return (
    <View className="flex-row justify-between mb-4 border-b border-gray-100 pb-2">
      <View className="flex-1">
        <Text className="text-black text-lg font-medium mb-1">
          {medicineName}
        </Text>
        <Text className="text-black/70 text-sm font-medium">{doctorName}</Text>
        <Text className="text-blue-600 text-sm font-semibold capitalize mt-1">
          {timeSlot} • {instruction}
        </Text>
      </View>

      <View className="flex justify-between items-end gap-2">
        <View className="flex-row items-center gap-2">
          {isSkipped ? (
            <Text className="text-red-500 font-bold text-xs">Skipped</Text>
          ) : (
            <Checkbox
              value={isCompleted}
              onValueChange={(val) => onComplete(val)}
              color={isCompleted ? "#3D6DB4" : undefined}
              disabled={isSkipped}
            />
          )}
        </View>

        {!isCompleted && !isSkipped && (
          <TouchableOpacity onPress={onSkip}>
            <Text className="text-[#5892E8] text-sm font-bold">Skip</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
