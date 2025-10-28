import { CameraView, useCameraPermissions } from "expo-camera";
import { useRouter } from "expo-router";
import { useRef } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function Camera() {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);
  const router = useRouter();

  async function takePicture() {
    if (cameraRef.current) {
      const photoData = await cameraRef.current.takePictureAsync();

      router.push({
        pathname: "/home/camera/confirm_prescription",
        params: {
          photoUri: photoData.uri,
        },
      });
    }
  }

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View className="flex-1 justify-center items-center gap-4 bg-white">
        <Text className="text-black text-lg font-normal">
          We need your permission to show the camera
        </Text>

        <TouchableOpacity
          className="bg-[#3D6DB4] rounded-3xl w-[200px] py-6"
          onPress={requestPermission}
        >
          <Text className="text-white text-lg font-bold text-center">
            Grant Permission
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1 justify-center items-center gap-10 bg-white">
      <CameraView
        style={{
          width: 340,
          height: 500,
          borderRadius: 24,
        }}
        facing={"back"}
        ref={cameraRef}
      ></CameraView>

      <TouchableOpacity
        className="bg-[#3D6DB4] rounded-3xl w-[120px] py-6"
        onPress={takePicture}
      >
        <Text className="text-white text-lg font-bold text-center">Take</Text>
      </TouchableOpacity>
    </View>
  );
}
