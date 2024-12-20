import { useEffect, useMemo, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableHighlight,
  View,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AddCredential from "../components/AddCredential";
import * as SQLite from "expo-sqlite";
import Card from "../components/Card";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const db = SQLite.openDatabase("Credentials.db");

export default function Page() {
  const [passwords, setPasswords] = useState([]);
  const [isAddingCredential, setIsAddingCredential] = useState(false);
  const [hasKeyword, setHasKeyword] = useState(false);
  const [searchList, setSearchList] = useState([]);
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
        "CREATE TABLE IF NOT EXISTS Credentials (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, email TEXT NOT NULL, password TEXT NOT NULL)",
        [],
        () => {},
        (_, error) => {
          ToastAndroid.show("Error locating save file", ToastAndroid.SHORT);
        }
      );
    });
    fetchCredentials();
  }, [isDarkMode]);

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
      <Card
        card={card}
        removeCreds={() => removeCreds(card)}
        key={card.id}
        isDarkMode={isDarkMode}
      />
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
      <Card
        isDarkMode={isDarkMode}
        card={card}
        removeCreds={() => removeCreds(card)}
        key={card.id}
      />
    ));
  }, [searchList]);

  return (
    <View style={!isDarkMode ? styles.container : styles.darkContainer}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <MaterialIcons
          name="search"
          size={26}
          color={isDarkMode ? "white" : "black"}
          style={{ height: 23, width: 25 }}
        />
        <TextInput
          style={!isDarkMode ? styles.searchbar : styles.darkSearchbar}
          placeholder="search"
          placeholderTextColor={!isDarkMode ? "black" : "white"}
          onChangeText={(e) => {
            searchHandler(e, passwords);
          }}
        />
      </View>
      <Text style={!isDarkMode ? styles.header : styles.darkHeader}>
        Credentials
      </Text>
      <ScrollView
        style={!isDarkMode ? styles.scrollView : styles.darkScrollView}
      >
        {!hasKeyword ? passwordCards : searchListCards}
      </ScrollView>
      {isAddingCredential && (
        <AddCredential
          passwords={passwords}
          setPasswords={setPasswords}
          setIsAddingCredential={setIsAddingCredential}
          fetchCredentials={fetchCredentials}
          handleAddCredentials={handleAddCredentials}
          isDarkMode={isDarkMode}
        />
      )}
      {!isAddingCredential && (
        <View
          style={!isDarkMode ? styles.optionBar : styles.darkOptionBar}
          id="bottomOptions"
        >
          <TouchableHighlight
            style={
              !isDarkMode
                ? styles.addPasswordButton
                : styles.darkAddPasswordButton
            }
            onPress={addModal}
          >
            <Text style={!isDarkMode ? styles.font : styles.darkFont}>
              Add Credentials
            </Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={
              !isDarkMode ? styles.settingButton : styles.darkSettingButton
            }
            onPress={() => router.replace("/setting")}
          >
            <Text style={!isDarkMode ? styles.font : styles.darkFont}>
              Settings
            </Text>
          </TouchableHighlight>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  font: { fontWeight: "800", color: "black" },
  darkFont: { fontWeight: "800", color: "white" },
  optionBar: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  darkOptionBar: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#141414",
    color: "white",
  },
  header: {
    fontSize: 32,
    fontWeight: "800",
  },
  darkHeader: {
    fontSize: 32,
    fontWeight: "800",
    color: "white",
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
  darkSearchbar: {
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
    backgroundColor: "#141414",
    color: "white",
    borderColor: "white",
  },
  scrollView: {
    width: "100%",
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 50,
  },
  darkScrollView: {
    paddingBottom: 50,
    width: "100%",
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: "#141414",
    color: "white",
  },
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 24,
    paddingLeft: 24,
    paddingRight: 24,
    paddingBottom: 50,
  },
  darkContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#141414",
    color: "white",
    paddingTop: 24,
    paddingLeft: 24,
    paddingRight: 24,
    paddingBottom: 50,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: "auto",
    width: "auto",
  },
  darkMain: {
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
    height: 45,
    width: "50%",
    borderWidth: 1,
    borderTopLeftRadius: 10,
  },
  darkAddPasswordButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    maxWidth: 960,
    height: 45,
    width: "50%",
    borderWidth: 1,
    borderTopLeftRadius: 10,
    backgroundColor: "#141414",
    color: "white",
    borderColor: "white",
  },
  settingButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    maxWidth: 960,
    height: 45,
    width: "50%",
    borderWidth: 1,
    borderTopRightRadius: 10,
  },
  darkSettingButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    maxWidth: 960,
    height: 45,
    width: "50%",
    borderWidth: 1,
    borderTopRightRadius: 10,
    backgroundColor: "#141414",
    color: "white",
    borderColor: "white",
  },
});
