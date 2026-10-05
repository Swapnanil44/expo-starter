import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function SubscriptionDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <View className="flex-1 items-center justify-center bg-background">
      <Text className="text-xl font-bold">Subscription {id}</Text>
    </View>
  );
}
