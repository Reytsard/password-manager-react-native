import { useState } from "react";
import {
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";

export default function Page() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const PASSWORD = "123";
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.main}>
          <Text style={styles.title}>Password Manager</Text>
          <Text style={styles.subtitle}>Password:</Text>
          <TextInput secureTextEntry={true} style={styles.passwordInput} />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    textAlign: "center",

    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
    textAlign: "center",
  },
  passwordInput: {
    textAlign: "center",
    fontSize: 24,
    height: 36,
    color: "#FFFFFF",
    backgroundColor: "#7F7F7F",
  },
});
