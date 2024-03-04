import { router } from "expo-router";
import React from "react";
import {
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import BackButton from "../components/BackButton";

function Page() {
  return (
    <View style={styles.container}>
      <BackButton />
      <TouchableOpacity
        style={styles.option}
        onPress={() => router.navigate("/settings/changeMasterKey")}
      >
        <Text>Change Master Password</Text>
      </TouchableOpacity>
    </View>
  );
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
