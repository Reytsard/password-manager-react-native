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

const db = SQLite.openDatabase("Credentials.db");

export default function Page() {
  const [passwords, setPasswords] = useState([]);
  const [isAddingCredential, setIsAddingCredential] = useState(false);
  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS Credentials (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, email TEXT NOT NULL, password TEXT NOT NULL)",
        [],
        () => console.log("Table credentials created successfully"),
        (_, error) => console.error("Error creating table", error)
      );
    });
    fetchCredentials();
  }, []);
  const addCredential = () => {
    const credential = {
      id: listLength == 0 ? 1 : list[listLength].id + 1,
      name: name,
      email: email,
      password: password,
    };
    props.setPasswords([...props.passwords, credential]);
    props.handleAddCredentials();
    props.setIsAddingCredential(false);
  };
  const handleAddCredentials = (name, email, password) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO Credentials ( name, email, password) VALUES ( ?, ?, ?)",
        [name, email, password],
        (_, result) => {
          console.log(`Todo added with ID: ${result.insertId}`);
          fetchCredentials();
        },
        (_, error) => console.error("Error adding creds", error)
      );
    });
  };
  const fetchCredentials = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM credentials",
        [],
        (_, result) => {
          setPasswords(result.rows._array);
        },
        (_, error) => console.error("Error fetching credentials", error)
      );
    });
  };

  const passwordCards = useMemo(() => {
    return passwords.map((card) => (
      <View key={card.id} style={styles.card}>
        <View style={styles.creds}>
          <Text>{card.name}</Text>
          <Text>Email: {card.email}</Text>
          <Text>Password: {card.password}</Text>
        </View>
        <View style={styles.cardOptions}>
          <TouchableHighlight style={styles.cardOption}>
            <Text>Edit</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.cardOption}>
            <Text>Remove</Text>
          </TouchableHighlight>
        </View>
      </View>
    ));
  }, [passwords]);
  const addModal = () => {
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
          handleAddCredentials={handleAddCredentials}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  creds: {
    // design remove button and edit to be in one column
  },

  card: {
    display: "flex",
    maxWidth: 920,
    flexDirection: "row",
  },
  cardOptions: {
    display: "flex",
    flexDirection: "row",
  },
  cardOption: {},
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
