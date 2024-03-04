import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableWithoutFeedback } from "react-native";

function BackButton() {
  return (
    <TouchableWithoutFeedback onPress={() => router.navigate("/passwords")}>
      <Text style={styles.backButton}>{"<"}</Text>
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
});
