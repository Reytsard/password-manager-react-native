import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("credentials.db");

export default function AddCredential(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const addCredential = () => {
    const credential = {
      id: props.passwords[props.passwords.length - 1].id + 1,
      name: name,
      email: email,
      password: password,
    };
    props.setPasswords([...props.passwords, credential]);
    handleAddCredentials();
    props.setIsAddingCredential(false);
  };
  const handleAddCredentials = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
        [name, email, password],
        (_, result) => {
          console.log(`Todo added with ID: ${result.insertId}`);
          setName("");
          setEmail("");
          setPassword("");
          props.fetchCredentials();
        },
        (_, error) => console.error("Error adding todo", error)
      );
    });
  };
  return (
    <View style={styles.modal}>
      <Text>Add Credentials</Text>
      <TextInput
        placeholder="Name"
        onChangeText={(e) => setName(e)}
        value={name}
      />
      <TextInput
        placeholder="Username"
        onChangeText={(e) => setEmail(e)}
        value={email}
      />
      <TextInput
        secureTextEntry
        placeholder="Password"
        onChangeText={(e) => setPassword(e)}
        value={password}
      />
      <View>
        <TouchableOpacity onPress={addCredential}>
          <Text>Add</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  modal: {
    maxHeight: 320,
    maxWidth: 920,
    height: 300,
    width: "100%",
  },
});
