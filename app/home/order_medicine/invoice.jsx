import { Feather } from "@expo/vector-icons";
import * as Print from "expo-print";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as Sharing from "expo-sharing";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function Invoice() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const orderItems = params.orderData ? JSON.parse(params.orderData) : [];
  const totalAmount = params.total ? parseFloat(params.total) : 0;
  const date = new Date().toLocaleDateString();
  const invoiceId = Math.floor(100000 + Math.random() * 900000);

  const generatePdf = async () => {
    const htmlContent = `
      <html>
        <head>
          <style>
            body { font-family: 'Helvetica', sans-serif; padding: 20px; }
            .header { text-align: center; margin-bottom: 30px; }
            .title { font-size: 24px; font-weight: bold; color: #3D6DB4; }
            .details { margin-bottom: 20px; border-bottom: 1px solid #ccc; padding-bottom: 10px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
            .total { margin-top: 20px; text-align: right; font-size: 18px; font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="title">Medical Invoice</div>
            <p>Thank you for your order!</p>
          </div>
          
          <div class="details">
            <p><strong>Invoice ID:</strong> #${invoiceId}</p>
            <p><strong>Date:</strong> ${date}</p>
            <p><strong>Status:</strong> Paid (Demo)</p>
          </div>

          <table>
            <tr>
              <th>Medicine</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
            ${orderItems
              .map(
                (item) => `
              <tr>
                <td>${item.name}</td>
                <td>${item.quantity}</td>
                <td>৳${item.price.toFixed(2)}</td>
                <td>৳${(item.price * item.quantity).toFixed(2)}</td>
              </tr>
            `
              )
              .join("")}
          </table>

          <div class="total">
            Grand Total: ৳${totalAmount.toFixed(2)}
          </div>
        </body>
      </html>
    `;

    try {
      const { uri } = await Print.printToFileAsync({ html: htmlContent });
      await Sharing.shareAsync(uri);
    } catch (error) {
      Alert.alert("Error", "Could not generate or share PDF.");
      console.error(error);
    }
  };

  return (
    <View className="flex-1 bg-white p-5">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Success Header */}
        <View className="items-center py-10">
          <Feather name="check-circle" size={64} color="#4CAF50" />
          <Text className="text-2xl font-bold text-black mt-4">
            Order Placed!
          </Text>
          <Text className="text-gray-500 text-center mt-2">
            Your order has been successfully placed. No payment was required
            (Demo).
          </Text>
        </View>

        {/* Invoice Preview */}
        <View className="bg-gray-50 p-4 rounded-2xl border border-gray-200">
          <View className="flex-row justify-between mb-2">
            <Text className="font-bold">Invoice ID:</Text>
            <Text>#{invoiceId}</Text>
          </View>
          <View className="flex-row justify-between mb-4 border-b border-gray-300 pb-2">
            <Text className="font-bold">Date:</Text>
            <Text>{date}</Text>
          </View>

          {orderItems.map((item, index) => (
            <View key={index} className="flex-row justify-between mb-2">
              <Text className="w-[60%] text-gray-700">
                {item.name} (x{item.quantity})
              </Text>
              <Text className="font-semibold">
                ৳{(item.price * item.quantity).toFixed(2)}
              </Text>
            </View>
          ))}

          <View className="flex-row justify-between mt-4 pt-2 border-t border-black">
            <Text className="text-lg font-bold">Total Paid:</Text>
            <Text className="text-lg font-bold text-[#3D6DB4]">
              ৳{totalAmount.toFixed(2)}
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Action Buttons */}
      <View className="gap-3 mb-5">
        <TouchableOpacity
          className="bg-[#3D6DB4] rounded-3xl py-4 flex-row justify-center items-center gap-2"
          onPress={generatePdf}
        >
          <Feather name="download" size={20} color="white" />
          <Text className="text-white text-lg font-bold">Download Invoice</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-gray-200 rounded-3xl py-4"
          onPress={() => router.replace("/home")}
        >
          <Text className="text-black text-lg font-bold text-center">
            Back to Home
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
