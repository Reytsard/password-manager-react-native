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
import { openDatabase } from "expo-sqlite";
const db = openDatabase("masterKey.db");

export default function Page() {
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
  }, []);

  const fetchPass = () => {
    db.transaction((tx) =>
      tx.executeSql(
        "SELECT * FROM masterKey",
        [],
        (_, result) => {
          if (result.rows.length > 0) {
            sethasMasterKey(true);
          }
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
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.main}>
          <Text style={styles.title}>Password Manager</Text>
          {hasMasterKey ? (
            <View>
              <Text style={styles.subtitle}>Password:</Text>
              <TextInput
                secureTextEntry={true}
                style={styles.passwordInput}
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
              <Text style={styles.subtitle}>Create Master Key:</Text>
              <TextInput
                secureTextEntry={true}
                style={styles.passwordInput}
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
