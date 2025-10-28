import { Stack } from "expo-router";

export default function CameraStackLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="confirm_prescription"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="edit_prescription"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
