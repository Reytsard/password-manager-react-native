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
    getDarkModeSettings(setIsDarkMode);
  }, []);
  return (
    <View style={!isDarkMode ? styles.container : styles.darkContainer}>
      <BackButton isDarkMode={isDarkMode} />
      <TouchableOpacity
        style={!isDarkMode ? styles.option : styles.darkOption}
        onPress={() => router.navigate("/settings/changeMasterKey")}
      >
        <Text style={!isDarkMode ? styles.font : styles.darkFont}>
          Change Master Password
        </Text>
      </TouchableOpacity>
      {/* <TouchableOpacity
        style={!isDarkMode ? styles.option : styles.darkOption}
        onPress={() => {
          changeDarkModeSetting(isDarkMode, setIsDarkMode);
        }}
      >
        <Text style={!isDarkMode ? styles.font : styles.darkFont}>
          Dark Mode: {isDarkMode ? "ON" : "OFF"}
        </Text>
      </TouchableOpacity> */}
    </View>
  );
}

export async function getDarkModeSettings(func) {
  try {
    const result = await AsyncStorage.getItem("isDarkMode");
    if (result !== null) {
      func(result === "true");
      return result === "true";
    }
    return false;
  } catch (e) {}
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
  darkContainer: {
    height: "100%",
    paddingTop: 100,
    paddingLeft: 10,
    paddingRight: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "column",
    gap: 20,
    backgroundColor: "black",
    color: "white",
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
  darkOption: {
    width: "100%",
    maxHeight: 60,
    flex: 1,
    borderWidth: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
    color: "white",
    borderColor: "white",
  },
  font: {
    color: "black",
  },
  darkFont: {
    color: "white",
  },
});
