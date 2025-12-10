import { Stack } from "expo-router";

export default function OrderMedicineStackLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="invoice"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
