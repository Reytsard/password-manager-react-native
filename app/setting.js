import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import BackButton from "../components/BackButton";
import * as SystemUI from "expo-system-ui";
import AsyncStorage from "@react-native-async-storage/async-storage";

function Page() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  useEffect(() => {
    async function getAndSetIsDarkMode() {
      const color = await SystemUI.getBackgroundColorAsync();
      color == "#141414" ? setIsDarkMode(true) : setIsDarkMode(false);
    }
    getAndSetIsDarkMode();
  }, [isDarkMode]);
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
      <TouchableOpacity
        style={!isDarkMode ? styles.option : styles.darkOption}
        onPress={() => checkAndChangeSystemUIColor(setIsDarkMode)}
      >
        <Text style={!isDarkMode ? styles.font : styles.darkFont}>
          Dark Mode: {isDarkMode ? "ON" : "OFF"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export async function checkAndChangeSystemUIColor(setIsDarkMode) {
  const color = await SystemUI.getBackgroundColorAsync();
  console.log(color);
  if (color == "#141414") {
    await SystemUI.setBackgroundColorAsync("white");
    await AsyncStorage.setItem("isDarkMode", "false");
    setIsDarkMode(false);
  } else {
    await SystemUI.setBackgroundColorAsync("#141414");
    await AsyncStorage.setItem("isDarkMode", "true");
    setIsDarkMode(true);
  }
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
    backgroundColor: "#141414",
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
    backgroundColor: "#141414",
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
