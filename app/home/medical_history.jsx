import { ScrollView, TextInput } from "react-native";
import MedicalHistoryList from "../(component)/medical_history_list";

export default function MedicalHistory() {
  return (
    <ScrollView className="flex-1 bg-white p-5">
      <TextInput
        className="text-black border border-gray-600 rounded-xl px-4 py-5 placeholder:text-gray-600"
        placeholder="Search"
      />

      <MedicalHistoryList />
      <MedicalHistoryList />
      <MedicalHistoryList />
      <MedicalHistoryList />
      <MedicalHistoryList />
      <MedicalHistoryList />
      <MedicalHistoryList />
    </ScrollView>
  );
}
