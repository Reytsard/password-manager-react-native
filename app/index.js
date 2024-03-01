import { router } from "expo-router";
import { openDatabase } from "expo-sqlite";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const db = openDatabase("masterKey.db"); //creates a file named masterKey.db

export default function Page() {
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS masterKey (password TEXT NOT NULL)",
        [],
        () => console.log("Table masterKey created successfully"),
        (_, error) => console.error("Error creating table", error)
      );
    });
  }, []);
  const addMasterPassword = () => {
    if (
      retypePassword === password &&
      retypePassword.length != 0 &&
      password != 0
    ) {
      addMasterKey(password);
      console.log("password Added");
    }
    router.replace("/");
  };
  const addMasterKey = () => {
    //try to see if table is not more than length of 1;
    /**
     * const updateMainPassword = (newPassword) => {
  db.transaction((tx) => {
    tx.executeSql(
      'UPDATE masterKey SET password = ? WHERE id = 1',
      [newPassword],
      (_, result) => {
        if (result.rowsAffected > 0) {
          console.log('Password updated successfully');
          // You can perform additional actions here if needed
        } else {
          console.warn('No rows updated. Password may not have been found.');
        }
      },
      (_, error) => console.error('Error updating password', error)
    );
  });
};
     */
    db.transaction((tx) =>
      tx.executeSql(
        "INSERT INTO masterKey (password) VALUES (?)",
        [password],
        (_, result) => {
          console.log(`MainPassword Added: ${result.insertId}`);
        },
        (_, error) => console.error("Error adding creds", error)
      )
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>Welcome to your own localized Password Manager</Text>
      </View>
      <View>
        <Text>Input Password</Text>
        <View>
          <TextInput
            placeholder="password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <TouchableHighlight>
            <Text>show Password</Text>
          </TouchableHighlight>
        </View>
        <View>
          <Text>Repeat Password</Text>
          <TextInput
            placeholder="Repeat Password"
            secureTextEntry
            value={retypePassword}
            onChangeText={setRetypePassword}
          />
          <TouchableHighlight>
            <Text>show Password</Text>
          </TouchableHighlight>
        </View>
      </View>
      <View>
        <TouchableOpacity onPress={addMasterPassword}>
          <Text>Set Master Password</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
  },
});
