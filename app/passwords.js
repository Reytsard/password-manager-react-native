import { useEffect, useMemo, useState } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from "react-native";
import AddCredential from "../components/AddCredential";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("credentials.db");

export default function Page() {
  const [passwords, setPasswords] = useState([]);
  const [isAddingCredential, setIsAddingCredential] = useState(false);
  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS credentials (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, email TEXT NOT NULL, password TEXT NOT NULL)",
        [],
        () => console.log("Table created successfully"),
        (_, error) => console.error("Error creating table", error)
      );
    });
    fetchCredentials();
  }, []);

  const fetchCredentials = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM credentials",
        [],
        (_, result) => {
          setPasswords(result.rows._array);
        },
        (_, error) => console.error("Error fetching todos", error)
      );
    });
  };

  const passwordCards = useMemo(() => {
    return passwords.map((card) => (
      <View key={card.id}>
        <Text>{card.name}</Text>
        <Text>Email: {card.email}</Text>
        <Text>Password: {card.password}</Text>
      </View>
    ));
  }, [passwords]);
  const addModal = () => {
    // document.querySelector("#passwordsView").setAttribute("display", "none");
    setIsAddingCredential(!isAddingCredential);
  };
  return (
    <View style={styles.container}>
      <TextInput placeholder="search" />
      <TouchableHighlight style={styles.addPasswordButton} onPress={addModal}>
        <Text>Add Credentials</Text>
      </TouchableHighlight>
      <Text>Passwords</Text>
      <ScrollView>{passwordCards}</ScrollView>
      {isAddingCredential && (
        <AddCredential
          passwords={passwords}
          setPasswords={setPasswords}
          setIsAddingCredential={setIsAddingCredential}
          fetchCredentials={fetchCredentials}
        />
      )}
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
  addPasswordButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    maxWidth: 960,
    height: 40,
    width: "100%",
    backgroundColor: "gray",
    borderRadius: 10,
  },
});

const sample = [
  {
    id: 4,
    name: "Valorant 1",
    email: "myppsmollikeurs",
    password: "AsdfhjlkZxcvbnm0001",
  },
  {
    id: 5,
    name: "Valorant 1",
    email: "myppsmollikeurs",
    password: "AsdfhjlkZxcvbnm0001",
  },
  {
    id: 1,
    name: "Valorant 1",
    email: "myppsmollikeurs",
    password: "AsdfhjlkZxcvbnm0001",
  },
  {
    id: 3,
    name: "Valorant 1",
    email: "myppsmollikeurs",
    password: "AsdfhjlkZxcvbnm0001",
  },
  {
    id: 2,
    name: "Valorant 1",
    email: "myppsmollikeurs",
    password: "AsdfhjlkZxcvbnm0001",
  },
  {
    id: 6,
    name: "Valorant 1",
    email: "myppsmollikeurs",
    password: "AsdfhjlkZxcvbnm0001",
  },
  {
    id: 7,
    name: "Valorant 1",
    email: "myppsmollikeurs",
    password: "AsdfhjlkZxcvbnm0001",
  },
  {
    id: 8,
    name: "Valorant 1",
    email: "myppsmollikeurs",
    password: "AsdfhjlkZxcvbnm0001",
  },
  {
    id: 9,
    name: "Valorant 1",
    email: "myppsmollikeurs",
    password: "AsdfhjlkZxcvbnm0001",
  },
  {
    id: 10,
    name: "Valorant 1",
    email: "myppsmollikeurs",
    password: "AsdfhjlkZxcvbnm0001",
  },
  {
    id: 11,
    name: "Valorant 1",
    email: "myppsmollikeurs",
    password: "AsdfhjlkZxcvbnm0001",
  },
  {
    id: 12,
    name: "Valorant 1",
    email: "myppsmollikeurs",
    password: "AsdfhjlkZxcvbnm0001",
  },
  {
    id: 13,
    name: "Valorant 1",
    email: "myppsmollikeurs",
    password: "AsdfhjlkZxcvbnm0001",
  },
  {
    id: 14,
    name: "Valorant 1",
    email: "myppsmollikeurs",
    password: "AsdfhjlkZxcvbnm0001",
  },
  {
    id: 15,
    name: "Valorant 1",
    email: "myppsmollikeurs",
    password: "AsdfhjlkZxcvbnm0001",
  },
  {
    id: 16,
    name: "Valorant 1",
    email: "myppsmollikeurs",
    password: "AsdfhjlkZxcvbnm0001",
  },
  {
    id: 17,
    name: "Valorant 1",
    email: "myppsmollikeurs",
    password: "AsdfhjlkZxcvbnm0001",
  },
  {
    id: 18,
    name: "Valorant 1",
    email: "myppsmollikeurs",
    password: "AsdfhjlkZxcvbnm0001",
  },
  {
    id: 19,
    name: "Valorant 1",
    email: "myppsmollikeurs",
    password: "AsdfhjlkZxcvbnm0001",
  },
  {
    id: 20,
    name: "Valorant 1",
    email: "myppsmollikeurs",
    password: "AsdfhjlkZxcvbnm0001",
  },
];
