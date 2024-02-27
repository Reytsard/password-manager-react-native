import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

export default function Page() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const PASSWORD = "123";
  const router = useRouter();

  const verifyPassword = () => {
    if (passwordInput === PASSWORD) {
      setIsLoggedIn(true);
      router.replace("/passwords");
    }
  };
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.main}>
          <Text style={styles.title}>Password Manager</Text>
          <Text style={styles.subtitle}>Password:</Text>
          <TextInput
            secureTextEntry={true}
            style={styles.passwordInput}
            onChangeText={(e) => setPasswordInput(e)}
          />
          <TouchableOpacity
            onPress={verifyPassword}
            style={styles.buttonContainer}
          >
            <Text style={styles.loginButton}>Log In</Text>
          </TouchableOpacity>
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
  loginButton: {
    height: "36px",
  },
  buttonContainer: {
    marginTop: 20,
    maxWidth: 960,
    maxHeight: 80,
    height: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "cyan",
  },
});
