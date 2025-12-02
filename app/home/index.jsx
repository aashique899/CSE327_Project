import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Query } from "appwrite";
import { useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Calendar } from "react-native-calendars";

import DashboardList from "../(component)/dashboard_list";
import { useAuth } from "../../context/AuthContext";
import { appwriteConfig, databases } from "../../lib/appwrite/config";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [selected, setSelected] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);

  const [allDoses, setAllDoses] = useState([]);
  const [doseStatus, setDoseStatus] = useState({});
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const timeOrder = { morning: 1, noon: 2, night: 3 };

  const loadDailyStatus = async () => {
    try {
      const todayStr = new Date().toDateString();
      const storedDate = await AsyncStorage.getItem("lastActiveDate");
      const storedStatus = await AsyncStorage.getItem("dailyDoseStatus");

      if (storedDate !== todayStr) {
        await AsyncStorage.multiSet([
          ["lastActiveDate", todayStr],
          ["dailyDoseStatus", JSON.stringify({})],
        ]);
        setDoseStatus({});
      } else if (storedStatus) {
        setDoseStatus(JSON.parse(storedStatus));
      }
    } catch (e) {
      console.error("Error loading status:", e);
    }
  };

  const fetchPrescriptions = async () => {
    if (!user) return;
    try {
      const response = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.collectionId,
        [Query.equal("user_id", user.$id)]
      );

      const flattenedDoses = [];

      response.documents.forEach((doc) => {
        let meds = [];
        try {
          meds =
            typeof doc.medications === "string"
              ? JSON.parse(doc.medications)
              : doc.medications;
        } catch (e) {
          console.error("JSON Parse error for doc", doc.$id, e);
          return;
        }

        meds.forEach((med) => {
          if (Array.isArray(med.doses_time_01)) {
            med.doses_time_01.forEach((time) => {
              const uniqueId = `${doc.$id}_${med.name.replace(
                /\s/g,
                ""
              )}_${time}`;

              flattenedDoses.push({
                uniqueId: uniqueId,
                medicineName: med.name,
                doctorName: doc.doctor_name,
                timeSlot: time,
                instruction: med.doses_time_02,
                sortOrder: timeOrder[time.toLowerCase()] || 4,
              });
            });
          }
        });
      });

      flattenedDoses.sort((a, b) => a.sortOrder - b.sortOrder);
      setAllDoses(flattenedDoses);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadDailyStatus();
    fetchPrescriptions();
  }, [user]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchPrescriptions();
  }, []);

  const updateStatus = async (id, status) => {
    const newStatus = { ...doseStatus, [id]: status };

    if (status === null) {
      delete newStatus[id];
    }

    setDoseStatus(newStatus);
    await AsyncStorage.setItem("dailyDoseStatus", JSON.stringify(newStatus));
  };

  const onLogout = async () => {
    await logout();
    router.replace("/auth/login");
  };

  const upcomingDoses = allDoses.filter((d) => !doseStatus[d.uniqueId]);
  const completedDoses = allDoses.filter(
    (d) => doseStatus[d.uniqueId] === "completed"
  );
  const missedDoses = allDoses.filter(
    (d) => doseStatus[d.uniqueId] === "skipped"
  );

  const renderDoseList = (doses, listType) => {
    if (doses.length === 0) {
      return (
        <Text className="text-gray-400 italic py-2">
          No doses in this list.
        </Text>
      );
    }
    return doses.map((dose) => (
      <DashboardList
        key={dose.uniqueId}
        medicineName={dose.medicineName}
        doctorName={dose.doctorName}
        timeSlot={dose.timeSlot}
        instruction={dose.instruction}
        status={doseStatus[dose.uniqueId]}
        onComplete={(isChecked) =>
          updateStatus(dose.uniqueId, isChecked ? "completed" : null)
        }
        onSkip={() => updateStatus(dose.uniqueId, "skipped")}
      />
    ));
  };

  return (
    <ScrollView
      className="flex-1 bg-white p-5"
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/* Header */}
      <View className="flex-row items-center gap-6 mb-6 mt-10">
        <Image
          className="size-16 rounded-full"
          source={{
            uri:
              "https://cloud.appwrite.io/v1/avatars/initials?name=" +
              (user?.name || "User") +
              "&project=" +
              appwriteConfig.projectId,
          }}
        />
        <View>
          <Text className="text-black text-xl font-semibold">Welcome,</Text>
          <Text className="text-[#3D6DB4] text-xl font-bold">
            {user ? user.name : "Guest"}
          </Text>
        </View>

        <TouchableOpacity className="ml-auto" onPress={onLogout}>
          <Text className="text-red-500 font-medium">Logout</Text>
        </TouchableOpacity>
      </View>

      {/* Date & Calendar */}
      <View className="gap-2 mb-6">
        <TouchableOpacity
          className="flex-row gap-2 items-center"
          onPress={() => setShowCalendar((p) => !p)}
        >
          <Text className="text-black text-base font-medium">
            {new Date().toLocaleDateString("en-GB", {
              weekday: "long",
              day: "numeric",
              month: "long",
            })}
          </Text>
          <FontAwesome5 name="arrow-alt-circle-down" size={16} color="black" />
        </TouchableOpacity>

        {showCalendar && (
          <View className="bg-white shadow rounded-3xl mb-4">
            <Calendar
              onDayPress={(day) => setSelected(day.dateString)}
              markedDates={{
                [selected]: { selected: true, selectedDotColor: "orange" },
              }}
            />
          </View>
        )}
      </View>

      {/* Loading State */}
      {loading ? (
        <ActivityIndicator size="large" color="#3D6DB4" />
      ) : (
        <View className="gap-6 mb-20">
          {/* Upcoming Doses Card */}
          <View className="bg-white shadow-md shadow-gray-300 rounded-3xl p-5 border border-gray-100">
            <Text className="text-black text-xl font-bold mb-4 border-l-4 border-[#3D6DB4] pl-3">
              Upcoming Doses
            </Text>
            <View>{renderDoseList(upcomingDoses, "upcoming")}</View>
          </View>

          {/* Completed Doses Card */}
          <View className="bg-white shadow-md shadow-gray-300 rounded-3xl p-5 border border-gray-100">
            <Text className="text-green-600 text-xl font-bold mb-4 border-l-4 border-green-500 pl-3">
              Completed Doses
            </Text>
            <View>{renderDoseList(completedDoses, "completed")}</View>
          </View>

          {/* Missed Doses Card */}
          <View className="bg-white shadow-md shadow-gray-300 rounded-3xl p-5 border border-gray-100">
            <Text className="text-red-500 text-xl font-bold mb-4 border-l-4 border-red-500 pl-3">
              Missed / Skipped
            </Text>
            <View>{renderDoseList(missedDoses, "missed")}</View>
          </View>
        </View>
      )}
    </ScrollView>
  );
}
