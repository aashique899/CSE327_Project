import { Stack } from "expo-router";

export default function MedicalHistoryStackLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="prescription_details"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
