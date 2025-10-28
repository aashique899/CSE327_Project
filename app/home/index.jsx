import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Calendar } from "react-native-calendars";
import DashboardList from "../(component)/dashboard_list";

export default function Dashboard() {
  const [selected, setSelected] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);

  return (
    <ScrollView className="flex-1 bg-white p-5">
      <View className="flex-row items-center gap-6 mb-6">
        <Image
          className="size-16 rounded-full"
          source={require("@/assets/images/Ashik.jpeg")}
        />
        <Text className="text-black text-xl font-semibold">Welcome Ashik</Text>
      </View>

      <View className="gap-2 mb-6">
        <TouchableOpacity
          className="flex-row gap-2 items-center"
          onPress={() => setShowCalendar((p) => !p)}
        >
          <Text className="text-black text-base font-medium">
            Monday, 15 October
          </Text>
          <FontAwesome5 name="arrow-alt-circle-down" size={16} color="black" />
        </TouchableOpacity>

        <View className="bg-white shadow rounded-3xl">
          {showCalendar && (
            <Calendar
              onDayPress={(day) => {
                console.log("selected day", day);
              }}
              markedDates={{
                [selected]: {
                  selected: true,
                  disableTouchEvent: true,
                  selectedDotColor: "orange",
                },
              }}
            />
          )}
        </View>
      </View>

      <View className="gap-6">
        {/* Upcoming Doses Card */}
        <View className="bg-white shadow rounded-3xl max-h-[240px] p-4">
          <Text className="text-black text-xl font-bold mb-4">
            Upcoming Doses
          </Text>

          <ScrollView>
            <DashboardList />
            <DashboardList />
            <DashboardList />
            <DashboardList />
            <DashboardList />
          </ScrollView>
        </View>

        {/* Completed Doses Card */}
        <View className="bg-white shadow rounded-3xl max-h-[150px] p-4">
          <Text className="text-black text-xl font-bold mb-4">
            Completed Doses
          </Text>

          <ScrollView>
            <DashboardList />
            <DashboardList />
            <DashboardList />
            <DashboardList />
            <DashboardList />
          </ScrollView>
        </View>

        {/* Missed Doses Card */}
        <View className="bg-white shadow rounded-3xl max-h-[150px] p-4">
          <Text className="text-black text-xl font-bold mb-4">
            Missed Doses
          </Text>

          <ScrollView>
            <DashboardList />
            <DashboardList />
            <DashboardList />
            <DashboardList />
            <DashboardList />
          </ScrollView>
        </View>
      </View>
    </ScrollView>
  );
}
