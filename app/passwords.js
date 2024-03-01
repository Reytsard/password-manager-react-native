import { useEffect, useMemo, useState } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
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
        () => {},
        (_, error) => {
          ToastAndroid.show("Error locating save file", ToastAndroid.SHORT);
        }
      );
    });
    fetchCredentials();
  }, []);

  const handleAddCredentials = (name, email, password) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO Credentials ( name, email, password) VALUES ( ?, ?, ?)",
        [name, email, password],
        (_, result) => {
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
