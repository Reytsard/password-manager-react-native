import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import BackButton from "../components/BackButton";
import AsyncStorage from "@react-native-async-storage/async-storage";

function Page() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  useEffect(() => {
    getDarkModeSettings();
  }, []);
  return (
    <View style={styles.container}>
      <BackButton />
      <TouchableOpacity
        style={styles.option}
        onPress={() => router.navigate("/settings/changeMasterKey")}
      >
        <Text>Change Master Password</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.option}
        onPress={() => {
          setIsDarkMode(changeDarkModeSetting());
        }}
      >
        <Text>Dark Mode: {isDarkMode ? "ON" : "OFF"}</Text>
      </TouchableOpacity>
    </View>
  );
}

async function getDarkModeSettings() {
  const result = await AsyncStorage.getItem("isDarkMode");
  if (result !== null) {
    return result;
  }
  return false;
}
async function changeDarkModeSetting() {
  await AsyncStorage.setItem("isDarkMode", !result);
}

export default Page;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    paddingTop: 100,
    paddingLeft: 10,
    paddingRight: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "column",
    gap: 20,
  },
  option: {
    width: "100%",
    maxHeight: 60,
    flex: 1,
    borderWidth: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
