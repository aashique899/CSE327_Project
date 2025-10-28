import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Tabs } from "expo-router";

export default function HomeLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#3D6DB4",
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          paddingTop: 20,
        },
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "#AAAAAA",
        headerShown: true,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Dashboard",
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome6 name="list-check" size={24} color={color} />
          ),
          headerStyle: {
            backgroundColor: "#3D6DB4",
          },
          headerTintColor: "#fff",
        }}
      />

      <Tabs.Screen
        name="manage_prescriptions"
        options={{
          title: "Manage Prescriptions",
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome6 name="photo-film" size={24} color={color} />
          ),
          headerStyle: {
            backgroundColor: "#3D6DB4",
          },
          headerTintColor: "#fff",
        }}
      />

      <Tabs.Screen
        name="camera"
        options={{
          title: "Camera",
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome6 name="camera-retro" size={24} color={color} />
          ),
          headerStyle: {
            backgroundColor: "#3D6DB4",
          },
          headerTintColor: "#fff",
        }}
      />

      <Tabs.Screen
        name="medical_history"
        options={{
          title: "Medical History",
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="work-history" size={24} color={color} />
          ),
          headerStyle: {
            backgroundColor: "#3D6DB4",
          },
          headerTintColor: "#fff",
        }}
      />

      <Tabs.Screen
        name="notifications"
        options={{
          title: "Notifications",
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => (
            <Ionicons name="notifications" size={24} color={color} />
          ),
          headerStyle: {
            backgroundColor: "#3D6DB4",
          },
          headerTintColor: "#fff",
        }}
      />
    </Tabs>
  );
}
