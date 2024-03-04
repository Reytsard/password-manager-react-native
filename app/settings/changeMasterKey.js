import { openDatabase } from "expo-sqlite";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const db = openDatabase("masterKey.db");

export default function Page() {
  const [password, setPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [retypeNewPassword, setRetypeNewPassword] = useState("");
  const [hasError, setHasError] = useState(false);
  useEffect(() => {
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
  }, []);
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
  const changePasswordHandler = () => {
    if (verifyCreds(retypeNewPassword, newPassword)) {
      if (verifyCreds(password, oldPassword)) {
        updateMasterKey(newPassword);
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
    <View style={styles.container}>
      <Text style={styles.header}>Change Master Key</Text>
      <View style={styles.label}>
        <Text style={styles.text}>Input Current Master Key</Text>
        <TextInput
          secureTextEntry
          style={styles.inputs}
          value={oldPassword}
          onChangeText={(e) => setOldPassword(e)}
        />
      </View>
      <View style={styles.label}>
        <Text style={styles.text}>Input New Master Key</Text>
        <TextInput
          secureTextEntry
          style={styles.inputs}
          value={newPassword}
          onChangeText={(e) => setNewPassword(e)}
        />
      </View>
      <View style={styles.label}>
        <Text style={styles.text}>Confirm New Master Key</Text>
        <TextInput
          secureTextEntry
          style={styles.inputs}
          value={retypeNewPassword}
          onChangeText={(e) => setRetypeNewPassword(e)}
        />
      </View>
      {hasError ? (
        <Text style={styles.description}>
          Password/Retype Password Incorrect
        </Text>
      ) : (
        <></>
      )}
      <TouchableOpacity style={styles.button} onPress={changePasswordHandler}>
        <Text style={styles.buttonText}>Change Master Key</Text>
      </TouchableOpacity>
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
  label: {
    alignSelf: "center",
    padding: 20,
    width: "100%",
  },
  text: {
    display: "flex",
  },
  container: {
    paddingTop: 80,
    height: "100%",
    width: "100%",
    display: "flex",
    alignitems: "center",
    justifyContent: "flex-start",
  },
  inputs: {
    width: "100%",
    height: 42,
    borderWidth: 1,
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 24,
  },
  button: {
    alignSelf: "center",
    maxHeight: 80,
    height: 60,
    width: 200,
    borderWidth: 1,
    display: "flex",
    alignitems: "center",
    justifyContent: "center",
    borderRadius: 40,
  },
  buttonText: {
    fontSize: 16,
    textAlign: "center",
  },
});
