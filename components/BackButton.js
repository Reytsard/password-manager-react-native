import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableWithoutFeedback } from "react-native";

function BackButton({ isDarkMode }) {
  return (
    <TouchableWithoutFeedback onPress={() => router.navigate("/passwords")}>
      <Text style={isDarkMode ? styles.DarkBackButton : styles.backButton}>
        {"<"}
      </Text>
    </TouchableWithoutFeedback>
  );
}

export default BackButton;

const styles = StyleSheet.create({
  backButton: {
    position: "absolute",
    top: 0,
    left: 0,
    paddingLeft: 15,
    fontSize: 42,
  },
  DarkBackButton: {
    position: "absolute",
    top: 0,
    left: 0,
    paddingLeft: 15,
    fontSize: 42,
    color: "white",
  },
});
