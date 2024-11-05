import { router } from "expo-router";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, TouchableWithoutFeedback } from "react-native";

function BackButton({ isDarkMode }) {
  return (
    <TouchableWithoutFeedback onPress={() => router.replace("passwords")}>
      <Ionicons
        name="arrow-back-outline"
        size={38}
        color={isDarkMode ? "white" : "black"}
        style={{ alignSelf: "flex-start", marginLeft: 40, marginBottom: 20 }}
      />
    </TouchableWithoutFeedback>
  );
}

export default BackButton;

const styles = StyleSheet.create({
  backButton: {
    position: "absolute",
    top: 0,
    left: 10,
    paddingLeft: 15,
    fontSize: 42,
    // height: 200,
  },
  DarkBackButton: {
    position: "absolute",
    top: 0,
    left: 10,
    paddingLeft: 15,
    fontSize: 42,
    color: "white",
  },
});
