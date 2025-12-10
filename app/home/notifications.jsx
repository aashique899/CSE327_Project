import AsyncStorage from "@react-native-async-storage/async-storage";
import { Query } from "appwrite";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Image,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from "react-native";

import NotificationsList from "../(component)/notifications_list";
import { useAuth } from "../../context/AuthContext";
import { appwriteConfig, databases } from "../../lib/appwrite/config";

export default function Notifications() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeNotifications, setActiveNotifications] = useState([]);

  const getCurrentTimeSlot = () => {
    const hour = new Date().getHours();

    if (hour >= 8 && hour < 11) return "morning";
    if (hour >= 12 && hour < 15) return "noon";
    if (hour >= 20 && hour < 23) return "night";

    return null;
  };

  const fetchData = async () => {
    if (!user) return;
    try {
      const currentSlot = getCurrentTimeSlot();

      if (!currentSlot) {
        setActiveNotifications([]);
        setLoading(false);
        setRefreshing(false);
        return;
      }

      const storedStatus = await AsyncStorage.getItem("dailyDoseStatus");
      const doseStatus = storedStatus ? JSON.parse(storedStatus) : {};

      const response = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.collectionId,
        [Query.equal("user_id", user.$id)]
      );

      const notifications = [];

      response.documents.forEach((doc) => {
        let meds = [];
        try {
          meds =
            typeof doc.medications === "string"
              ? JSON.parse(doc.medications)
              : doc.medications;
        } catch (e) {
          console.error("Error parsing meds", e);
          return;
        }

        meds.forEach((med) => {
          if (
            Array.isArray(med.doses_time_01) &&
            med.doses_time_01.includes(currentSlot)
          ) {
            const uniqueId = `${doc.$id}_${med.name.replace(
              /\s/g,
              ""
            )}_${currentSlot}`;

            if (!doseStatus[uniqueId]) {
              notifications.push({
                uniqueId: uniqueId,
                medicineName: med.name,
                instruction: med.doses_time_02,
                timeSlot: currentSlot,
              });
            }
          }
        });
      });

      setActiveNotifications(notifications);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      fetchData();
    }, [user])
  );

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  const markAsDone = async (uniqueId) => {
    setActiveNotifications((prev) =>
      prev.filter((n) => n.uniqueId !== uniqueId)
    );

    try {
      const storedStatus = await AsyncStorage.getItem("dailyDoseStatus");
      const currentStatus = storedStatus ? JSON.parse(storedStatus) : {};

      const newStatus = { ...currentStatus, [uniqueId]: "completed" };
      await AsyncStorage.setItem("dailyDoseStatus", JSON.stringify(newStatus));
    } catch (e) {
      console.error("Error saving status", e);
    }
  };

  const currentSlot = getCurrentTimeSlot();
  const getSlotDisplayName = () => {
    if (currentSlot === "morning") return "Morning Reminder (8 AM - 11 AM)";
    if (currentSlot === "noon") return "Noon Reminder (12 PM - 3 PM)";
    if (currentSlot === "night") return "Night Reminder (8 PM - 11 PM)";
    return "No Active Reminders";
  };

  return (
    <ScrollView
      className="flex-1 bg-white p-5"
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Text className="text-2xl font-bold text-black mb-2 mt-5">
        Notifications
      </Text>
      <Text className="text-gray-500 mb-6">
        {new Date().toLocaleDateString("en-GB", {
          weekday: "long",
          day: "numeric",
          month: "long",
        })}
      </Text>

      <View
        className={`p-4 rounded-xl mb-6 ${
          currentSlot ? "bg-[#3D6DB4]" : "bg-gray-100"
        }`}
      >
        <Text
          className={`font-bold text-lg ${
            currentSlot ? "text-white" : "text-gray-400"
          }`}
        >
          {getSlotDisplayName()}
        </Text>
        {!currentSlot && (
          <Text className="text-gray-400 text-sm mt-1">
            Reminders only appear during dose windows.
          </Text>
        )}
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#3D6DB4" className="mt-10" />
      ) : (
        <View>
          {activeNotifications.length > 0 ? (
            activeNotifications.map((notif) => (
              <NotificationsList
                key={notif.uniqueId}
                medicineName={notif.medicineName}
                instruction={notif.instruction}
                timeSlot={notif.timeSlot}
                onDone={() => markAsDone(notif.uniqueId)}
              />
            ))
          ) : (
            <View className="items-center justify-center mt-10">
              <Image
                source={require("@/assets/images/Medicine.jpg")}
                className="w-24 h-24 opacity-20 mb-4"
                resizeMode="contain"
              />
              <Text className="text-gray-400 text-center font-medium">
                {currentSlot
                  ? "You're all caught up for this slot!"
                  : "Relax! No medicines scheduled right now."}
              </Text>
            </View>
          )}
        </View>
      )}
    </ScrollView>
  );
}
