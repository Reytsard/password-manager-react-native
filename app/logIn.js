import { Redirect, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { openDatabase } from "expo-sqlite";

export default function Page() {
  const db = openDatabase("masterKey.db");

  const [mainPassword, setMainPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const router = useRouter();
  useEffect(() => {
    //add method to check if file of masterkey is infile, if not redirect to setupMainPassword
    checkMasterKeyTable();
  }, []);
  const checkMasterKeyTable = () => {
    db.transaction((tx) =>
      tx.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='masterKey'",
        [],
        (_, result) => {
          const tableExists = result.rows.length > 0;
          if (tableExists) {
            fetchPass(); // Table exists, proceed with fetching password
          } else {
            // Table doesn't exist, navigate to the firstTimeUser screen
            router.replace("//");
          }
        },
        (_, error) => console.error("Error checking masterKey table", error)
      )
    );
  };

  const fetchPass = () => {
    db.transaction((tx) =>
      tx.executeSql(
        "SELECT * FROM masterKey LIMIT 1",
        [],
        (_, result) => {
          setMainPassword(result.rows._array);
        },
        (_, error) => console.error("Error fetching credentials", error)
      )
    );
  };

  const verifyPassword = () => {
    if (passwordInput == mainPassword) {
      console.log("passwordInput ", passwordInput);
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
