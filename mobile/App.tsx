import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_900Black,
} from "@expo-google-fonts/inter";
// import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, StatusBar } from "react-native";
import { Loading } from "./src/components/Loading";
import { Home } from "./src/screens/Home";

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_900Black,
  });

  if (!fontsLoaded) {
    return <Loading />;
  }

  return (
    <>
      <Home />
      <StatusBar
        barStyle={"light-content"}
        backgroundColor={"transparent"}
        translucent
      />
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    fontFamily: "Inter_700Bold",
    color: "white",
    fontSize: 28,
    textAlign: "center",
  },
});
