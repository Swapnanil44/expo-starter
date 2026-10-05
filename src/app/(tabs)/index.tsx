
import { Text, View, StyleSheet } from "react-native";
import "../../../global.css";
import { Link } from "expo-router";

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center bg-background">
      <Text className="text-xl font-bold text-success">
        Welcome to Nativewind!
      </Text>
    </View>
  );
}
