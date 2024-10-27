import { useRouter } from "expo-router";
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { openDatabase } from "expo-sqlite";
const db = openDatabase("masterKey.db");

export default function Page() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mainPassword, setMainPassword] = useState(""); //to set UP !!!!!!!!!!!!!!!!!!!!!!!!!
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [hasMasterKey, sethasMasterKey] = useState(false); //change this if has already a masterkey
  const [toSetKey, setToSetKey] = useState("");
  const router = useRouter();
  useEffect(() => {
    //add method to check if file of masterkey is infile, if not redirect to setupMainPassword
    db.transaction((tx) =>
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS masterKey (password TEXT NOT NULL)",
        [],
        () => console.log("Table masterKey created successfully"),
        (_, error) => console.error("Error creating table", error)
      )
    );
    fetchPass();
    getIsDarkModeFromPersistentStorage();
  }, []);

  const getIsDarkModeFromPersistentStorage = async () => {
    try {
      const result = await AsyncStorage.getItem("isDarkMode");
      if (result == null) {
        await AsyncStorage.setItem("isDarkMode", isDarkMode);
      } else {
        setIsDarkMode(result);
      }
    } catch (e) {}
  };

  const fetchPass = () => {
    db.transaction((tx) =>
      tx.executeSql(
        "SELECT * FROM masterKey",
        [],
        (_, result) => {
          if (result.rows.length > 0) {
            sethasMasterKey(true);
            const pass = result.rows._array[0];
            setMainPassword(pass.password);
          }
        },
        (_, error) => console.error("Error fetching credentials", error)
      )
    );
  };

  const verifyPassword = () => {
    if (passwordInput == mainPassword) {
      setIsLoggedIn(true);
      router.replace("/passwords");
    }
  };

  const setMasterKey = () => {
    db.transaction((tx) =>
      tx.executeSql(
        "INSERT INTO masterKey(password) VALUES (?)",
        [toSetKey],
        (_, result) => {
          fetchPass();
        },
        (_, error) => console.log(error)
      )
    );
    sethasMasterKey(true);
  };

  return (
    <View style={isDarkMode ? styles.container : styles.darkContainer}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={isDarkMode ? styles.main : styles.darkMain}>
          <Text style={isDarkMode ? styles.title : styles.darkTitle}>
            Password Manager
          </Text>
          {hasMasterKey ? (
            <View>
              <Text style={isDarkMode ? styles.subtitle : styles.darkSubTitle}>
                Password:
              </Text>
              <TextInput
                secureTextEntry={true}
                style={
                  isDarkMode ? styles.passwordInput : styles.darkPasswordInput
                }
                onChangeText={(e) => setPasswordInput(e)}
                value={passwordInput}
              />
              <TouchableOpacity
                onPress={verifyPassword}
                style={styles.buttonContainer}
              >
                <Text style={styles.loginButton}>Log In</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View>
              <Text style={isDarkMode ? styles.subtitle : styles.darkSubTitle}>
                Create Master Key:
              </Text>
              <TextInput
                secureTextEntry={true}
                style={
                  isDarkMode ? styles.passwordInput : styles.darkPasswordInput
                }
                onChangeText={(e) => setToSetKey(e)}
                value={toSetKey}
              />
              <TouchableOpacity
                onPress={setMasterKey}
                style={styles.buttonContainer}
              >
                <Text style={styles.loginButton}>Set Master Key</Text>
              </TouchableOpacity>
            </View>
          )}
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
  darkContainer: {
    flex: 1,
    alignItems: "center",
    padding: 24,
    backgroundColor: "black",
    color: "white",
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  darkMain: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
    backgroundColor: "black",
  },
  title: {
    textAlign: "center",
    fontSize: 64,
    fontWeight: "bold",
  },
  darkTitle: {
    textAlign: "center",
    fontSize: 64,
    fontWeight: "bold",
    color: "white",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
    textAlign: "center",
  },
  darkSubTitle: {
    fontSize: 36,
    color: "#38434D",
    textAlign: "center",
    color: "white",
  },
  passwordInput: {
    textAlign: "center",
    fontSize: 24,
    height: 36,
    color: "#FFFFFF",
    backgroundColor: "#7F7F7F",
  },
  darkPasswordInput: {
    textAlign: "center",
    fontSize: 24,
    height: 36,
    color: "black",
    backgroundColor: "white",
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
