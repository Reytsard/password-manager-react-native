import { router, useLocalSearchParams } from "expo-router";
import { openDatabase } from "expo-sqlite";
import React, { useEffect, useState } from "react";
import {
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import BackButton from "../../components/BackButton";

const db = openDatabase("Credentials.db");

function Page() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { id } = useLocalSearchParams();
  //todo: create a verification that they will change it

  useEffect(() => {
    db.transaction((tx) =>
      tx.executeSql(
        "SELECT * FROM Credentials WHERE id = (?)",
        [id],
        (_, result) => {
          const data = result.rows._array[0];
          setName(data.name);
          setUsername(data.email);
          setPassword(data.password);
        }
      )
    );
  }, []);
  const updateCreds = () => {
    db.transaction((tx) =>
      tx.executeSql(
        "UPDATE Credentials SET name = ?, email = ?, password = ? WHERE id = ?",
        [name, username, password, id],
        (_, result) => {
          if (result.rowsAffected > 0) {
            console.log("Tuple updated successfully");
            router.navigate("/passwords");
            // You can perform additional actions here if needed
          } else {
            console.warn("No rows updated. Tuple may not have been found.");
          }
        },
        (_, error) => {
          console.warn("No rows updated. Tuple may not have been found.");
        }
      )
    );
  };
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View>
        <BackButton />
        <View style={styles.container}>
          <TextInput
            value={name}
            onChangeText={(e) => setName(e)}
            style={styles.name}
          />
          <View style={styles.infos}>
            <Text>Email/Username:</Text>
            <TextInput
              value={username}
              onChangeText={(e) => setUsername(e)}
              style={styles.info}
            />
            <Text>Password:</Text>
            <TextInput
              value={password}
              onChangeText={(e) => setPassword(e)}
              style={styles.info}
            />
            <View style={styles.options}>
              <TouchableHighlight style={styles.saveButton}>
                <Text onPress={updateCreds} style={{ fontSize: 18 }}>
                  Save
                </Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );

  //!!!!!!!!!!!!!!!!!!!!!!!! TODO !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  //create a function that will show a modal that will ask if they want to change
}
const styles = StyleSheet.create({
  saveButton: {
    minWidth: 120,
    minHeight: 58,
    borderWidth: 1,
    borderRadius: 100,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  infos: {
    width: "100%",
    padding: 50,
  },
  info: {
    height: 50,
    width: "100%",
    borderWidth: 1,
    marginBottom: 20,
    fontSize: 24,
    paddingLeft: 10,
    paddingRight: 10,
  },
  options: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  container: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  name: {
    width: "100%",
    textAlign: "center",
    height: 86,
    fontSize: 72,
    marginBottom: 30,
  },
  backButton: {
    position: "absolute",
    top: 0,
    left: 0,
    paddingLeft: 15,
    fontSize: 42,
  },
});
export default Page;
