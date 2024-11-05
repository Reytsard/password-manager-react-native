import { openDatabase } from "expo-sqlite";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import BackButton from "../../components/BackButton";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const db = openDatabase("masterKey.db");

export default function Page() {
  const [password, setPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [retypeNewPassword, setRetypeNewPassword] = useState("");
  const [hasError, setHasError] = useState(false);
  const [isDoneChanging, setIsDoneChanging] = useState(false);
  const [disabledInputs, setDisabledInputs] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  useEffect(() => {
    async function getAndSetIsDarkMode() {
      try {
        const value = await AsyncStorage.getItem("isDarkMode");
        value == "true" ? setIsDarkMode(true) : setIsDarkMode(false);
      } catch (e) {}
    }
    getAndSetIsDarkMode();
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM masterKey",
        [],
        (_, result) => {
          const dbResult = result.rows._array[0];
          setPassword(dbResult.password);
        },
        (_, error) => {
          console.log(error.message);
        }
      );
    });
  }, [isDarkMode]);
  const updateMasterKey = (newPassword) => {
    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE masterKey SET password = ?",
        [newPassword],
        (_, result) => {
          if (result.rowsAffected > 0) {
            console.log("Master key password updated successfully");
            // You can perform additional actions here if needed
          } else {
            console.warn("No rows updated. Tuple may not have been found.");
          }
        },
        (_, error) => console.error("Error updating master key password", error)
      );
    });
  };
  const showToast = () => {
    ToastAndroid.show("Master Key successfully changed.", ToastAndroid.SHORT);
  };

  const changePasswordHandler = () => {
    if (verifyCreds(retypeNewPassword, newPassword)) {
      if (verifyCreds(password, oldPassword)) {
        setDisabledInputs(true);
        updateMasterKey(newPassword);
        setIsDoneChanging(true);
        showToast();
      } else {
        setHasError(true);
      }
    } else {
      setHasError(true);
    }
  };
  const verifyCreds = (password, oldPassword) => {
    return password === oldPassword;
  };
  return (
    <View style={isDarkMode ? styles.darkContainer : styles.container}>
      <BackButton isDarkMode={isDarkMode} />
      <Text style={isDarkMode ? styles.darkHeader : styles.header}>
        Change Master Key
      </Text>
      <View style={isDarkMode ? styles.darkLabel : styles.label}>
        <Text style={isDarkMode ? styles.darkText : styles.text}>
          Input Current Master Key
        </Text>
        <TextInput
          secureTextEntry
          style={isDarkMode ? styles.darkInput : styles.inputs}
          value={oldPassword}
          onChangeText={(e) => setOldPassword(e)}
          editable={!disabledInputs}
        />
      </View>
      <View style={isDarkMode ? styles.darkLabel : styles.label}>
        <Text style={isDarkMode ? styles.darkText : styles.text}>
          Input New Master Key
        </Text>
        <TextInput
          secureTextEntry
          style={isDarkMode ? styles.darkInput : styles.inputs}
          value={newPassword}
          onChangeText={(e) => setNewPassword(e)}
          editable={!disabledInputs}
        />
      </View>
      <View style={isDarkMode ? styles.darkLabel : styles.label}>
        <Text style={isDarkMode ? styles.darkText : styles.text}>
          Confirm New Master Key
        </Text>
        <TextInput
          secureTextEntry
          style={isDarkMode ? styles.darkInput : styles.inputs}
          value={retypeNewPassword}
          onChangeText={(e) => setRetypeNewPassword(e)}
          editable={!disabledInputs}
        />
      </View>
      {hasError ? (
        <Text style={isDarkMode ? styles.darkContainer : styles.description}>
          Password/Retype Password Incorrect
        </Text>
      ) : (
        <></>
      )}
      {!isDoneChanging ? (
        <TouchableOpacity
          style={isDarkMode ? styles.darkButton : styles.button}
          onPress={changePasswordHandler}
        >
          <Text style={isDarkMode ? styles.darkButtonText : styles.buttonText}>
            Change Master Key
          </Text>
        </TouchableOpacity>
      ) : (
        <View
          style={
            isDarkMode ? styles.darkPasswordChanged : styles.passwordChanged
          }
        >
          <Text
            style={
              isDarkMode
                ? styles.darkPasswordChangedText
                : styles.passwordChangedText
            }
          >
            Master Key Changed
          </Text>
          <TouchableOpacity
            style={
              isDarkMode
                ? styles.darkPasswordChangedButton
                : styles.passwordChangedButton
            }
            onPress={() => router.navigate("/passwords")}
          >
            <Text style={isDarkMode ? { color: "white" } : { color: "black" }}>
              Return to Main menu
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  description: {
    alignSelf: "center",
    fontSize: 20,
    color: "red",
    textAlign: "center",
    marginBottom: 10,
  },
  header: {
    alignSelf: "center",
    fontSize: 28,
    marginBottom: 30,
  },
  darkHeader: {
    alignSelf: "center",
    fontSize: 28,
    marginBottom: 30,
    color: "white",
  },
  label: {
    alignSelf: "center",
    padding: 20,
    width: "100%",
  },
  darkLabel: {
    alignSelf: "center",
    padding: 20,
    width: "100%",
    color: "white",
  },
  text: {
    display: "flex",
  },
  darkText: {
    display: "flex",
    color: "white",
  },
  container: {
    paddingTop: 80,
    height: "100%",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  darkContainer: {
    paddingTop: 80,
    height: "100%",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    color: "white",
  },
  inputs: {
    width: "100%",
    height: 42,
    borderWidth: 1,
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 24,
  },
  darkInput: {
    width: "100%",
    height: 42,
    borderWidth: 1,
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 24,
    color: "white",
    borderColor: "white",
  },
  button: {
    alignSelf: "center",
    maxHeight: 80,
    height: 60,
    width: 200,
    borderWidth: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 40,
  },
  darkButton: {
    alignSelf: "center",
    maxHeight: 80,
    height: 60,
    width: 200,
    borderWidth: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 40,
    color: "white",
    borderColor: "white",
  },
  buttonText: {
    fontSize: 16,
    textAlign: "center",
  },
  darkButtonText: {
    fontSize: 16,
    textAlign: "center",
    color: "white",
    borderColor: "white",
  },
  passwordChanged: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  darkPasswordChanged: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    gap: 10,
    color: "white",
  },
  passwordChangedText: {
    fontSize: 20,
  },
  darkPasswordChangedText: {
    fontSize: 20,
    color: "white",
  },
  passwordChangedButton: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 2,
  },
  darkPasswordChangedButton: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 2,
    color: "white",
  },
});
