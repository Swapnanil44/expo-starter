import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function SignIn() {
  return (
    <View className="flex-1 items-center justify-center bg-background">
      <Text className="text-xl font-bold">Sign In</Text>
      <Link href={'/'}>Home</Link>
    </View>
  );
}
