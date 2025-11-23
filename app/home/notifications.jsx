import { ScrollView, Text } from "react-native";
import NotificationsList from "../(component)/notifications_list";

export default function Notifications() {
  return (
    <ScrollView className="flex-1 bg-white p-5">
      <Text>Today</Text>
      <NotificationsList />
      <NotificationsList />
      <NotificationsList />

      <Text className="mt-10">Yesterday</Text>
      <NotificationsList />
      <NotificationsList />
      <NotificationsList />
      <NotificationsList />
    </ScrollView>
  );
}
