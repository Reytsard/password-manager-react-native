import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function AddCredential(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const addCredential = () => {
    props.handleAddCredentials(name, email, password);
    setName("");
    setEmail("");
    setPassword("");
    props.setIsAddingCredential(false);
  };
  const cancelHandler = () => {
    setName("");
    setEmail("");
    setPassword("");
    props.setIsAddingCredential(false);
  };
  return (
    <View style={!props.isDarkMode ? styles.modal : styles.darkModal}>
      <Text style={!props.isDarkMode ? styles.header : styles.darkHeader}>
        Add Credentials
      </Text>
      <TextInput
        placeholder="Name"
        placeholderTextColor={!props.isDarkMode ? "black" : "white"}
        onChangeText={(e) => setName(e)}
        value={name}
        style={!props.isDarkMode ? styles.input : styles.darkInput}
      />
      <TextInput
        placeholder="Username"
        placeholderTextColor={!props.isDarkMode ? "black" : "white"}
        onChangeText={(e) => setEmail(e)}
        value={email}
        style={!props.isDarkMode ? styles.input : styles.darkInput}
      />
      <TextInput
        secureTextEntry
        placeholder="Password"
        placeholderTextColor={!props.isDarkMode ? "black" : "white"}
        onChangeText={(e) => setPassword(e)}
        value={password}
        style={!props.isDarkMode ? styles.input : styles.darkInput}
      />
      <View style={styles.options}>
        <TouchableOpacity
          onPress={addCredential}
          style={!props.isDarkMode ? styles.button : styles.darkButton}
        >
          <Text
            style={!props.isDarkMode ? { color: "black" } : { color: "white" }}
          >
            Add
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={cancelHandler}
          style={!props.isDarkMode ? styles.button : styles.darkButton}
        >
          <Text
            style={!props.isDarkMode ? { color: "black" } : { color: "white" }}
          >
            Cancel
          </Text>
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
  darkModal: {
    maxHeight: 320,
    maxWidth: 920,
    height: 300,
    width: "100%",
    backgroundColor: "black",
    color: "white",
  },
  header: {
    textAlign: "center",
    fontSize: 26,
  },
  darkHeader: {
    textAlign: "center",
    fontSize: 26,
    color: "white",
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 5,
    height: 50,
    paddingLeft: 10,
    paddingRight: 10,
  },
  darkInput: {
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 5,
    height: 50,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: "black",
    color: "white",
    borderColor: "white",
  },
  options: {
    marginTop: 10,
    height: 50,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  button: {
    height: 50,
    width: 80,
    borderWidth: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 40,
  },
  darkButton: {
    height: 50,
    width: 80,
    borderWidth: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 40,
    backgroundColor: "black",
    color: "white",
    borderColor: "white",
  },
});
