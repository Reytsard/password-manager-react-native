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
import Card from "../components/Card";

const db = SQLite.openDatabase("Credentials.db");

export default function Page() {
  const [passwords, setPasswords] = useState([]);
  const [isAddingCredential, setIsAddingCredential] = useState(false);
  const [hasKeyword, setHasKeyword] = useState(false);
  const [searchList, setSearchList] = useState([]);
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
  const removeCreds = (card) => {
    const cards = passwords.filter((item) => item.id != card.id);
    setPasswords(cards);
  };

  const addModal = () => {
    setIsAddingCredential(!isAddingCredential);
  };
  const passwordCards = useMemo(() => {
    return passwords.map((card) => (
      <Card card={card} removeCreds={() => removeCreds(card)} key={card.id} />
    ));
  }, [passwords]);

  const searchHandler = (keyword, passwords) => {
    if (!keyword) {
      setHasKeyword(false);
      setSearchList([]);
    } else {
      setHasKeyword(true);
      const newList = passwords.filter((item) =>
        item.name.toLowerCase().includes(keyword.toLowerCase())
      );
      setSearchList(newList);
    }
  };
  const searchListCards = useMemo(() => {
    return searchList.map((card) => (
      <Card card={card} removeCreds={() => removeCreds(card)} key={card.id} />
    ));
  }, [searchList]);
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchbar}
        placeholder="search"
        onChangeText={(e) => {
          searchHandler(e, passwords);
        }}
      />
      <TouchableHighlight style={styles.addPasswordButton} onPress={addModal}>
        <Text>Add Credentials</Text>
      </TouchableHighlight>
      <Text style={styles.header}>Credentials</Text>

      <ScrollView style={styles.scrollView}>
        {!hasKeyword ? passwordCards : searchListCards}
      </ScrollView>

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
  header: {
    fontSize: 32,
    fontWeight: "800",
  },
  searchbar: {
    borderWidth: 1,
    borderRadius: 12,
    width: "100%",
    minHeight: 32,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 5,
  },

  creds: {
    // design remove button and edit to be in one column
  },
  scrollView: {
    width: "100%",
    paddingLeft: 10,
    paddingRight: 10,
  },
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: "auto",
    width: "auto",
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
